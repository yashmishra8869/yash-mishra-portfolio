export type Project = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  tags: string[];
  features: string[];
  github: string;
  live: string;
  artwork: "signal" | "identity" | "cinema";
  details: string;
};

export const projects: Project[] = [
  {
    slug: "ai-cyber-threat-detector",
    number: "01",
    title: "AI-powered cyber threat detection",
    shortTitle: "Threat detection",
    description: "A Flask application that classifies pre-existing network traffic records as normal or suspicious using a trained Random Forest pipeline.",
    tags: ["Python", "Flask", "scikit-learn", "Random Forest", "SQLite", "Bootstrap"],
    features: ["Network threat classification", "CSV batch analysis", "Prediction history", "Analytics dashboard"],
    github: "https://github.com/yashmishra8869/ai-cyber-threat-detector",
    live: "https://ai-cyber-threat-detector-is0r.onrender.com/",
    artwork: "signal",
    details: "The project analyses feature-based network records from the NSL-KDD dataset. It is an educational classifier, not a live packet sniffer, firewall, or intrusion-prevention system."
  },
  {
    slug: "smart-attendance",
    number: "02",
    title: "Smart attendance system",
    shortTitle: "Smart attendance",
    description: "A FastAPI application for face registration, recognition-based attendance marking, and a live monthly attendance dashboard.",
    tags: ["Python", "FastAPI", "OpenCV", "NumPy", "Pandas", "PostgreSQL"],
    features: ["Face registration", "Webcam scanning", "Attendance marking", "Monthly dashboard"],
    github: "https://github.com/yashmishra8869/SmartAttendance",
    live: "https://smart-attendance-r16r.onrender.com/",
    artwork: "identity",
    details: "The application supports upload and webcam registration, face recognition scans, attendance exports, and file-based or PostgreSQL-backed persistence depending on deployment configuration."
  },
  {
    slug: "movie-recommendation-site",
    number: "03",
    title: "Movie recommendation site",
    shortTitle: "Movie discovery",
    description: "A Flask movie discovery experience combining a catalogue with text-based recommendation logic and a Vercel-compatible API.",
    tags: ["Python", "Flask", "Pandas", "scikit-learn", "TMDB API"],
    features: ["Movie catalogue", "Similarity recommendations", "Search suggestions", "Vercel API"],
    github: "https://github.com/yashmishra8869/Movie-Recommendation-site",
    live: "https://movie-recommendation-site-neon.vercel.app/",
    artwork: "cinema",
    details: "The repository uses TF-IDF and cosine similarity for text-based recommendations, with optional TruncatedSVD support and a movie data source used by the Flask API."
  }
];

export const journey = [
  ["01", "Babu Banarasi Das University", "B.Tech — Computer Science and Engineering, with a CC & ML specialization. Expected graduation: 2027."],
  ["02", "Programming fundamentals", "Learning the foundations of Python, JavaScript, HTML, and CSS, then applying them to practical software."],
  ["03", "Building web applications", "Developing interfaces and server-backed applications with Flask, FastAPI, React, and Next.js."],
  ["04", "Machine learning & cybersecurity", "Applying scikit-learn, data analysis, and feature-based classification to explore resilient systems."],
  ["05", "Three projects, one practice", "Developing and deploying threat detection, smart attendance, and movie recommendation applications."]
];

export const skillGroups: [string, string[]][] = [
  ["Programming", ["Python", "JavaScript", "HTML", "CSS"]],
  ["Frameworks & Tools", ["Flask", "FastAPI", "React", "Next.js", "Bootstrap", "Git", "GitHub", "VS Code"]],
  ["AI & Data", ["Machine Learning", "scikit-learn", "Pandas", "OpenCV", "Data Analysis"]],
  ["Infrastructure", ["Cloud Computing", "Deployment", "SQLite", "PostgreSQL"]]
];

export const socialLinks = [
  ["GitHub", "https://github.com/yashmishra8869"],
  ["LinkedIn", "https://www.linkedin.com/in/yashhmishraa8869/"],
  ["Instagram", "https://www.instagram.com/mishraayashh?dlrf=Y3ZrYmhoOGxzbmc="]
];
