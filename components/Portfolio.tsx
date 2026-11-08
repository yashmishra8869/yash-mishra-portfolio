"use client";

import { ArrowDownRight, ArrowUpRight, Github, Instagram, Linkedin, Mail, Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { FormEvent, PointerEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journey, projects, skillGroups, socialLinks } from "@/data/content";
import OrbitalScene from "@/components/OrbitalScene";

const navItems = [["About", "about"], ["Expertise", "expertise"], ["Projects", "projects"], ["Journey", "journey"], ["Contact", "contact"]];

function SocialLinks() {
  const icons = { GitHub: Github, LinkedIn: Linkedin, Instagram };
  return <div className="social-icons" aria-label="Social links">{socialLinks.map(([label, href]) => {
    const Icon = icons[label as keyof typeof icons];
    return <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon size={16} /></a>;
  })}</div>;
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [formState, setFormState] = useState("");
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const preloaderTimer = window.setTimeout(() => setPreloaderVisible(false), reducedMotion ? 100 : 850);
    const cursor = document.querySelector<HTMLElement>(".cursor-glow");
    const onPointerMove = (event: globalThis.PointerEvent) => {
      if (cursor) cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (!reducedMotion) {
        gsap.from(".hero-content > *", { y: 28, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.2 });
        gsap.utils.toArray<HTMLElement>(".section-heading, .about-copy, .principle, .project-card, .skill-group, .journey-item, .contact-layout").forEach((element) => {
          gsap.from(element, { y: 32, opacity: 0, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 84%", once: true } });
        });
      }
    });
    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      setHeaderVisible(currentY < 80 || currentY < lastY);
      lastY = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-25% 0px -60% 0px", threshold: [0.1, 0.35, 0.7] });
    ["top", ...navItems.map(([, id]) => id)].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => {
      window.clearTimeout(preloaderTimer);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  function magnetic(event: PointerEvent<HTMLAnchorElement | HTMLButtonElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth < 800) return;
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * 0.1}px, ${(event.clientY - rect.top - rect.height / 2) * 0.1}px)`;
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setFormState("Sending…");
    fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form).entries())) })
      .then(async (response) => {
        const result = await response.json() as { ok?: boolean; error?: string; message?: string };
        if (!response.ok) throw new Error(result.error ?? "Unable to send your message.");
        form.reset();
        setFormState(result.message ?? "Your message was delivered.");
      })
      .catch((error: Error) => setFormState(error.message));
  }

  return (
    <main className="site-shell">
      {preloaderVisible && <div className="preloader" role="status" aria-label="Loading portfolio"><div className="preloader-mark">YM<span>/</span></div><div className="preloader-line"><i /></div><span className="mono">INITIALIZING / 01</span></div>}
      <div className="cursor-glow" aria-hidden="true" />
      <header className={`site-header ${headerVisible ? "" : "header-hidden"}`}>
        <a className="brand" href="#top" aria-label="Yash Mishra home"><span className="brand-mark">YM</span><span className="brand-slash">/</span></a>
        <nav id="primary-navigation" className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
          {navItems.map(([label, id]) => <a className={activeSection === id ? "active" : ""} key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <div className="mobile-socials"><SocialLinks /></div>
        </nav>
        <SocialLinks />
        <button className="menu-button" aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </header>

      <section id="top" className="hero">
        <div className="hero-grid" /><div className="hero-glow" />
        <div className="hero-content">
          <div className="eyebrow mono">Yash Mishra / Creative Technologist</div>
          <h1><span>YASH</span><small>MISHRA</small></h1>
          <h2>Thinking beyond code.<br /><em>Creating beyond limits.</em></h2>
          <p className="hero-intro">I explore the space where AI, software, and visual thinking meet — turning curiosity into practical tools and meaningful digital experiences.</p>
          <div className="hero-actions"><a className="button magnetic" href="#projects" onPointerMove={magnetic} onPointerLeave={(event) => { event.currentTarget.style.transform = ""; }}>Explore my work <ArrowDownRight size={16} /></a><a className="text-link" href="#contact">Contact me <ArrowUpRight size={15} /></a></div>
        </div>
        <div className="scene-position"><OrbitalScene /></div>
        <div className="scroll-cue mono">Scroll to explore</div>
      </section>

      <section id="about" className="section">
        <div className="section-heading"><h2>More than<br />just code.</h2><span className="section-number mono">01 / About</span></div>
        <div className="about-layout"><div><p className="about-copy">I&apos;m a <strong>Creative Technologist</strong> drawn to the questions behind the interface — how systems work, how people experience them, and how thoughtful technology can make an idea useful.</p><p className="about-note">I combine problem-solving, experimentation, and practical implementation across software, AI, and the web.</p></div><div className="about-art" aria-hidden="true"><span>YM</span><i /><b /></div></div>
      </section>

      <section id="expertise" className="section">
        <div className="section-heading"><h2>Tools for<br />the curious.</h2><span className="section-number mono">02 / Expertise</span></div>
        <div className="skills-grid">{skillGroups.map(([title, skills]) => <div className="skill-group" key={title}><h3 className="mono">{title}</h3><ul>{skills.map((skill) => <li key={skill}><span className="skill-bullet" />{skill}</li>)}</ul></div>)}</div>
        <div className="language-note mono">LANGUAGES / English — Fluent / Hindi — Native</div>
      </section>

      <section id="projects" className="section">
        <div className="section-heading"><h2>Selected<br />signal.</h2><span className="section-number mono">03 / Projects</span></div>
        <div className="projects-grid">{projects.map((project) => <article className={`project-card artwork-${project.artwork}`} key={project.slug}><a className="project-art" href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live demo`}><span className="project-number mono">PROJECT {project.number}</span><div className="art-shape" /><span className="visual-label mono">{project.shortTitle}</span></a><div className="project-body"><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><div className="project-links"><a href={project.live} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight size={14} /></a><a href={project.github} target="_blank" rel="noopener noreferrer"><Github size={14} /> Source</a><a href={`/projects/${project.slug}`}>Project details <ArrowUpRight size={14} /></a></div></div></article>)}</div>
      </section>

      <section id="journey" className="section">
        <div className="section-heading"><h2>The ongoing<br />journey.</h2><span className="section-number mono">04 / Journey</span></div>
        <div className="journey">{journey.map(([number, title, copy]) => <div className="journey-item" key={number}><span className="mono">{number}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div>
      </section>

      <section className="section philosophy"><div><div className="eyebrow mono">A working philosophy</div><h2>The best way to predict the future is to build it.</h2></div></section>

      <section id="contact" className="section">
        <div className="section-heading"><h2>Have an idea?<br />Let&apos;s create.</h2><span className="section-number mono">05 / Contact</span></div>
        <div className="contact-layout"><div className="contact-info"><p className="contact-title">Let&apos;s turn a spark into something real.</p><div className="socials"><a href="mailto:yashmishra8869@gmail.com"><Mail size={16} /> Email</a><SocialLinks /><a href="https://wa.me/919616146702?text=Hello%20Yash%2C%20I%27d%20like%20to%20discuss%20an%20idea." target="_blank" rel="noopener noreferrer" aria-label="Contact Yash on WhatsApp"><MessageCircle size={17} /> WhatsApp</a></div></div><form className="contact-form" onSubmit={submitForm}><div className="form-row"><div className="field"><label htmlFor="name">Name</label><input id="name" name="name" required maxLength={100} /></div><div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required maxLength={254} /></div></div><div className="field"><label htmlFor="subject">Subject</label><input id="subject" name="subject" required maxLength={160} /></div><div className="field"><label htmlFor="message">Message</label><textarea id="message" name="message" rows={5} required maxLength={4000} /></div><input className="honey-field" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" /><button className="button magnetic" type="submit" onPointerMove={magnetic} onPointerLeave={(event) => { event.currentTarget.style.transform = ""; }}>Prepare message <ArrowUpRight size={15} /></button>{formState && <p className="form-status" role="status">{formState}</p>}</form></div>
      </section>
      <footer className="footer"><span className="brand"><span className="brand-mark">YM</span><span className="brand-slash">/</span> YASH MISHRA</span><span>© {new Date().getFullYear()} — Built with curiosity.</span><a className="footer-email" href="mailto:yashmishra8869@gmail.com">yashmishra8869@gmail.com</a></footer>
    </main>
  );
}
