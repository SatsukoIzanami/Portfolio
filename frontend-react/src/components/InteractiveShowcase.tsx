import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAbout, fetchProjects } from "../services/portfolioApi";
import type { AboutData, Project } from "../types/portfolio";

const navItems = [
  { id: "projects", title: "Projects", desc: "View my work" },
  { id: "skills", title: "Skills", desc: "Technical abilities" },
  { id: "about", title: "About", desc: "Learn about me" },
  { id: "stats", title: "Stats", desc: "By the numbers" },
  { id: "endorsement", title: "Testimonials", desc: "What others say" },
];

export default function InteractiveShowcase() {
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [about, setAbout] = useState<AboutData | null>(null);
  const [previewProjects, setPreviewProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchAbout().then(setAbout);
  }, []);

  useEffect(() => {
    if (currentSection === "projects") {
      fetchProjects().then((list) => setPreviewProjects(list.slice(0, 3)));
    }
  }, [currentSection]);

  return (
    <div className="interactive-showcase-container">
      <div className="interactive-showcase-nav-list">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`interactive-showcase-nav-item ${currentSection === item.id ? "active" : ""}`}
            onMouseEnter={() => setCurrentSection(item.id)}
            onClick={() => setCurrentSection(item.id)}
          >
            <div className="interactive-showcase-nav-item-title">{item.title}</div>
            <div className="interactive-showcase-nav-item-desc">{item.desc}</div>
          </div>
        ))}
      </div>

      <div className="interactive-showcase-content-panel visible">
        {!currentSection && (
          <div className="interactive-showcase-default-message">
            <h3>👋 Welcome</h3>
            <p>Hover over an item on the left to explore</p>
          </div>
        )}

        {currentSection === "projects" && (
          <>
            <h2 className="interactive-showcase-content-item">Featured Projects</h2>
            <div className="interactive-showcase-projects-grid interactive-showcase-content-item">
              {previewProjects.map((p, idx) => (
                <article key={`${p.name ?? "p"}-${idx}`} className="interactive-showcase-project-card">
                  <h3 className="interactive-showcase-project-title">{p.name}</h3>
                  <p className="interactive-showcase-project-desc">{p.desc}</p>
                </article>
              ))}
            </div>
            <div className="interactive-showcase-cta-container interactive-showcase-content-item">
              <Link className="interactive-showcase-cta-link" to="/projects">
                View All Projects →
              </Link>
            </div>
          </>
        )}

        {currentSection === "about" && (
          <>
            <h2 className="interactive-showcase-content-item">About Me</h2>
            <div className="interactive-showcase-about-content interactive-showcase-content-item">
              <div className="interactive-showcase-about-text">
                {about?.bio?.headline ?? "Full-stack student developer passionate about clean code and accessible design."}
              </div>
            </div>
            <div className="interactive-showcase-cta-container interactive-showcase-content-item">
              <Link className="interactive-showcase-cta-link" to="/about">
                Learn More →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
