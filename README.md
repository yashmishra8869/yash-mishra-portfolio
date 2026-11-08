# Yash Mishra — Creative Technologist

> An immersive, futuristic personal portfolio showcasing development projects, technical skills, and creative digital experiences.

## Overview

This is the personal portfolio of Yash Mishra. It combines editorial typography, acid-green visual language, a responsive 3D orbital sculpture, purposeful motion, project storytelling, and a deployment-ready contact endpoint.

## Screenshots

Screenshots will be added after the first production deployment:

- `docs/screenshots/home-desktop.png`
- `docs/screenshots/home-mobile.png`

## Features

- Responsive App Router portfolio experience
- Interactive React Three Fiber orbital sculpture
- GSAP section reveals and magnetic interactions
- About, project, expertise, journey, philosophy, and contact sections
- Real cybersecurity project GitHub and live-demo links
- Mobile navigation and reduced-motion support
- Server-side contact validation, honeypot protection, and basic rate limiting
- Configurable metadata, canonical URL, sitemap, and robots.txt
- Production security headers and Content Security Policy

## Technology stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- GSAP
- Three.js, React Three Fiber, and Drei
- Lucide React
- Vercel-ready Node.js deployment

## Project structure

```text
app/
  api/contact/       Contact endpoint
  globals.css        Global visual system
  layout.tsx         Metadata and root layout
  page.tsx           Homepage entry point
  robots.ts          Environment-aware robots metadata
  sitemap.ts         Environment-aware sitemap metadata
components/
  OrbitalScene.tsx   3D hero sculpture
  Portfolio.tsx      Portfolio presentation and interactions
data/
  content.ts         Projects, skills, and journey content
```

## Requirements

- Node.js 20.9 or newer
- npm 10 or newer

## Installation

```bash
npm install
```

## Local development

Create a local environment file from the example:

```bash
Copy-Item .env.example .env.local
```

Then start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment configuration

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL, sitemap, and robots URL |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional | Public email link |
| `NEXT_PUBLIC_GITHUB_URL` | Optional | Public GitHub link |
| `NEXT_PUBLIC_LINKEDIN_URL` | Optional | Public LinkedIn link |
| `NEXT_PUBLIC_DEV_URL` | Optional | Public DEV Community link |
| `SMTP_HOST` | Required for delivery | Server-only SMTP host, typically `smtp.gmail.com` |
| `SMTP_PORT` | Required for delivery | Server-only SMTP port, typically `465` |
| `SMTP_USER` | Required for delivery | Gmail address used by the server |
| `SMTP_PASS` | Required for delivery | Gmail App Password; never use the account password |
| `CONTACT_TO_EMAIL` | Required for delivery | Recipient address for portfolio messages |

Only values prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never put credentials, private keys, or provider tokens in public variables or committed files.

The site builds and deploys without SMTP configuration; the contact form reports that delivery is not configured instead of claiming a message was sent. After the original message is accepted, the server sends the visitor an acknowledgement email. If that secondary message fails, the UI reports that the original was delivered but the acknowledgement was not sent.

## Quality checks

```bash
npm run lint
npx tsc --noEmit
npm run build
npm audit
```

## GitHub publication

The suggested repository name is `yash-mishra-portfolio`. The suggested GitHub description is:

> An immersive, futuristic personal portfolio showcasing development projects, technical skills, and creative digital experiences.

Create a new empty repository on GitHub without initializing a README, then review the current branch and changes before pushing:

```bash
git status
git branch --show-current
git remote add origin https://github.com/<your-account>/yash-mishra-portfolio.git
git add .
git commit -m "chore: prepare portfolio for production"
git push -u origin phase-3-production-hardening
```

Open a pull request into `main` after reviewing the diff. Do not push credentials or `.env.local`.

## Vercel deployment

1. Push the reviewed branch to the GitHub repository.
2. In Vercel, choose **Add New Project** and import `yash-mishra-portfolio`.
3. Keep the detected **Next.js** framework, install command, and build command. No `vercel.json` is required.
4. Add the environment variables from the table above in the Vercel project settings. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS URL after the project URL is known.
5. Deploy the project.
6. Verify the homepage, `/sitemap.xml`, `/robots.txt`, project links, mobile navigation, and contact validation.
7. If a custom domain is added later, configure it in Vercel and update `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS domain, then redeploy.

Vercel automatically uses the `engines.node` requirement in `package.json`; no custom runtime configuration is needed.

## Author

Yash Mishra — versatile developer, creative technologist, and technology enthusiast.

## License

No license has been selected for this repository yet. Until a `LICENSE` file is added, all rights are reserved by the author.
