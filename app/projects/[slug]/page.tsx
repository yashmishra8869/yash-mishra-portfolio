import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { notFound } from "next/navigation";
import { projects } from "@/data/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project ? { title: `${project.title} — Yash Mishra`, description: project.description } : {};
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <main className={`project-detail artwork-${project.artwork}`}>
      <header className="detail-header">
        <Link href="/#projects" className="detail-back"><ArrowLeft size={15} /> Back to portfolio</Link>
        <span className="mono">PROJECT {project.number}</span>
      </header>
      <section className="detail-hero">
        <div>
          <span className="eyebrow mono">{project.shortTitle}</span>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <div className="detail-actions"><a className="button" href={project.live} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight size={15} /></a><a className="detail-source" href={project.github} target="_blank" rel="noopener noreferrer"><Github size={15} /> Source code</a></div>
        </div>
        <div className="detail-art" aria-label={`${project.title} abstract artwork`}><div className="art-shape" /><span className="visual-label mono">{project.shortTitle}</span></div>
      </section>
      <section className="detail-content">
        <div><span className="mono detail-label">OVERVIEW</span><p>{project.details}</p></div>
        <div><span className="mono detail-label">VERIFIED TECHNOLOGIES</span><div className="detail-tags">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></div>
        <div><span className="mono detail-label">FEATURES</span><ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
      </section>
      <p className="detail-note mono">Project visuals are abstract studies. Visit the live demo or source repository for the actual product interface.</p>
    </main>
  );
}
