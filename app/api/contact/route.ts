import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const attempts = new Map<string, number>();
const WINDOW_MS = 60_000;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getMailTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "465");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !Number.isInteger(port) || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });
}

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientKey = forwardedFor?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const previous = attempts.get(clientKey);

  let payload: Record<string, unknown>;
  try {
    payload = await request.json() as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (typeof payload.website === "string" && payload.website.trim()) {
    return NextResponse.json({ error: "Unable to process this request." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const subject = typeof payload.subject === "string" ? payload.subject.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  if (!name || name.length > 100 || !isValidEmail(email) || email.length > 254 || !subject || subject.length > 160 || !message || message.length > 4000) {
    return NextResponse.json({ error: "Please provide valid contact details and a message." }, { status: 400 });
  }

  if (previous && now - previous < WINDOW_MS) {
    return NextResponse.json({ error: "Please wait before sending another message." }, { status: 429 });
  }

  const transport = getMailTransport();
  const recipient = process.env.CONTACT_TO_EMAIL;
  if (!transport || !recipient) {
    return NextResponse.json({ error: "Contact email delivery is not configured yet." }, { status: 503 });
  }

  attempts.set(clientKey, now);
  attempts.forEach((timestamp, key) => {
    if (now - timestamp >= WINDOW_MS) attempts.delete(key);
  });

  try {
    await transport.sendMail({
      from: process.env.SMTP_USER,
      to: recipient,
      replyTo: email,
      subject: `Portfolio contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    });
  } catch {
    return NextResponse.json({ error: "Contact delivery failed. Please try again later." }, { status: 502 });
  }

  try {
    await transport.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Thank you for contacting Yash Mishra",
      text: "Thank you for contacting Yash Mishra. I have received your message and will get back to you soon."
    });
  } catch {
    return NextResponse.json({
      ok: true,
      message: "Your message was delivered, but the acknowledgement email could not be sent."
    });
  }

  return NextResponse.json({
    ok: true,
    message: "Your message was delivered. An acknowledgement email has been sent."
  });
}
