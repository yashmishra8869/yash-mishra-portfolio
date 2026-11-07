"use client";

import { ArrowDownRight, ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { FormEvent, PointerEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journey, projects, skillGroups } from "@/data/content";
import OrbitalScene from "@/components/OrbitalScene";

const navItems = [
  ["About", "about"],
  ["Projects", "projects"],
  ["Expertise", "expertise"],
  ["Journey", "journey"],
  ["Contact", "contact"]
];

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState("");
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (!reducedMotion) {
        gsap.from(".hero-content > *", { y: 28, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.15 });
        gsap.utils.toArray<HTMLElement>(".section-heading, .about-copy, .principle, .project-card, .skill-group, .journey-item, .contact-layout").forEach((element) => {
          gsap.from(element, {
            y: 32,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 84%", once: true }
          });
        });
      }
    });

    const sections = ["top", ...navItems.map(([, id]) => id)];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-25% 0px -60% 0px", threshold: [0.1, 0.35, 0.7] });
    sections.forEach((id) => document.getElementById(id) && observer.observe(document.getElementById(id)!));

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  function magnetic(event: PointerEvent<HTMLAnchorElement | HTMLButtonElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth < 800) return;
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.12;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.12;
    target.style.transform = `translate(${x}px, ${y}px)`;
  }

  function releaseMagnetic(event: PointerEvent<HTMLAnchorElement | HTMLButtonElement>) {
    event.currentTarget.style.transform = "";
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setFormState("Sending…");
    fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      .then(async (response) => {
        const result = await response.json() as { ok?: boolean; error?: string };
        if (!response.ok) throw new Error(result.error ?? "Unable to send your message.");
        form.reset();
        setFormState("Message sent successfully.");
      })
      .catch((error: Error) => setFormState(error.message));
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Yash Mishra home">YM<span>/</span></a>
        <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
          {navItems.map(([label, id]) => (
            <a className={activeSection === id ? "active" : ""} key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>
        <button className="menu-button" aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      <section id="top" className="hero">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="eyebrow mono">Developer / creative technologist</div>
          <h1><span>Designing ideas.</span><br /><em>Building the future.</em></h1>
          <p className="hero-intro">I&apos;m Yash Mishra — a versatile developer exploring the intersection of technology, creativity, and innovation.</p>
          <div className="hero-actions">
            <a className="button magnetic" href="#projects" onPointerMove={magnetic} onPointerLeave={releaseMagnetic}>Explore my work <ArrowDownRight size={16} /></a>
            <span className="availability"><i className="status-dot" /> Open to creating</span>
          </div>
        </div>
        <div className="scene-position"><OrbitalScene /></div>
        <div className="scroll-cue mono">Scroll to explore</div>
      </section>

      <section id="about" className="section">
        <div className="section-heading"><h2>More than<br />just code.</h2><span className="section-number mono">01 / About</span></div>
        <div className="about-layout">
          <p className="about-copy">I&apos;m a technology enthusiast and versatile developer who enjoys exploring new ideas, solving problems, and <strong>creating things that have a purpose.</strong></p>
          <div className="principles">
            {[
              ["01", "Curiosity", "Always exploring new technologies and ideas."],
              ["02", "Creativity", "Combining logic, design, and experimentation."],
              ["03", "Growth", "Learning through real-world projects and continuous improvement."]
            ].map(([num, title, copy]) => <div className="principle" key={num}><span className="num mono">{num}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}
          </div>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="section-heading"><h2>Selected<br />signal.</h2><span className="section-number mono">02 / Projects</span></div>
        {projects.map((project) => <article className="project-card" key={project.number}>
          <div>
            <span className="project-index mono">PROJECT {project.number}</span>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="tag-list">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
            <div className="project-features">{project.features.map((feature, index) => <div className="feature" key={feature}><span>{feature}</span><span className="mono">0{index + 1}</span></div>)}</div>
            <a className="button ghost magnetic" href={project.github} target="_blank" rel="noreferrer" onPointerMove={magnetic} onPointerLeave={releaseMagnetic}>View on GitHub <ArrowUpRight size={15} /></a>
            <a className="button ghost magnetic" href={project.live} target="_blank" rel="noreferrer" style={{ marginLeft: 10 }} onPointerMove={magnetic} onPointerLeave={releaseMagnetic}>Live demo <ArrowUpRight size={15} /></a>
          </div>
          <div className="project-visual" aria-label="Abstract network visualization"><span className="visual-label mono">Threat / signal / intelligence</span></div>
        </article>)}
        <p className="mono" style={{ color: "var(--muted)", fontSize: 11, marginTop: 32 }}>More experiments are in progress. This space will grow with the work.</p>
      </section>

      <section id="expertise" className="section">
        <div className="section-heading"><h2>Tools for<br />the curious.</h2><span className="section-number mono">03 / Expertise</span></div>
        <div className="skills-grid">{skillGroups.map(([title, skills]) => <div className="skill-group" key={title}><h3 className="mono">{title}</h3><ul>{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></div>)}</div>
      </section>

      <section id="journey" className="section">
        <div className="section-heading"><h2>The ongoing<br />journey.</h2><span className="section-number mono">04 / Journey</span></div>
        <div className="journey">{journey.map(([number, title, copy]) => <div className="journey-item" key={number}><span className="mono">{number}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div>
      </section>

      <section className="section philosophy"><div><div className="eyebrow mono">A working philosophy</div><h2>The best way to predict the future is to build it.</h2></div></section>

      <section id="contact" className="section">
        <div className="section-heading"><h2>Have an idea?<br />Let&apos;s create.</h2><span className="section-number mono">05 / Contact</span></div>
        <div className="contact-layout">
          <div className="contact-info"><p className="contact-title">Let&apos;s turn a spark into something real.</p><div className="socials">
            {process.env.NEXT_PUBLIC_CONTACT_EMAIL && <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}>Email</a>}
            {process.env.NEXT_PUBLIC_GITHUB_URL && <a href={process.env.NEXT_PUBLIC_GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>}
            {process.env.NEXT_PUBLIC_LINKEDIN_URL && <a href={process.env.NEXT_PUBLIC_LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
            {process.env.NEXT_PUBLIC_DEV_URL && <a href={process.env.NEXT_PUBLIC_DEV_URL} target="_blank" rel="noopener noreferrer">DEV</a>}
          </div></div>
          <form className="contact-form" onSubmit={submitForm}>
            <div className="form-row"><div className="field"><label htmlFor="name">Name</label><input id="name" name="name" required /></div><div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required /></div></div>
            <div className="field"><label htmlFor="subject">Subject</label><input id="subject" name="subject" required /></div>
            <div className="field"><label htmlFor="message">Message</label><textarea id="message" name="message" rows={5} required /></div>
            <input className="honey-field" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <button className="button magnetic" type="submit" onPointerMove={magnetic} onPointerLeave={releaseMagnetic}>Prepare message <ArrowUpRight size={15} /></button>
            {formState && <p className="form-status" role="status">{formState}</p>}
          </form>
        </div>
      </section>

      <footer className="footer"><span className="brand">YASH<span>/</span>MISHRA</span><span>© {new Date().getFullYear()} — Built with curiosity.</span><a className="back-top mono" href="#top">Back to top ↑</a></footer>
    </main>
  );
}
