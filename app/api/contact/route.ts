import { NextResponse } from "next/server";

const attempts = new Map<string, number>();
const WINDOW_MS = 60_000;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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
  attempts.set(clientKey, now);
  attempts.forEach((timestamp, key) => {
    if (now - timestamp >= WINDOW_MS) attempts.delete(key);
  });

  if (!process.env.CONTACT_WEBHOOK_URL) {
    return NextResponse.json({ error: "Contact delivery is not configured yet." }, { status: 503 });
  }

  let delivery: Response;
  try {
    delivery = await fetch(process.env.CONTACT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message })
    });
  } catch {
    return NextResponse.json({ error: "Contact delivery failed. Please try again later." }, { status: 502 });
  }
  if (!delivery.ok) {
    return NextResponse.json({ error: "Contact delivery failed. Please try again later." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
