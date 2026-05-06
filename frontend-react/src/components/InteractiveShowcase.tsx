import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAbout, fetchProjects, resolveAsset } from "../services/portfolioApi";
import type { AboutData, Project } from "../types/portfolio";

const navItems = [
  { id: "projects", title: "Projects", desc: "View my work" },
  { id: "skills", title: "Skills", desc: "Technical abilities" },
  { id: "about", title: "About", desc: "Learn about me" },
  { id: "stats", title: "Stats", desc: "By the numbers" },
  { id: "endorsement", title: "Testimonials", desc: "What others say" },
];

function bioPreview(data: AboutData | null): string {
  const body = data?.bio?.body ?? "";
  const textOnly = body.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const parts = textOnly.split(".").filter(Boolean);
  const preview = parts.slice(0, 2).join(". ") + (parts.length > 2 ? "..." : "");
  return preview || "Full-stack student developer passionate about clean code and accessible design.";
}

function topSkills(data: AboutData | null): { name: string; value: number; category: string }[] {
  if (!data?.skills?.categories) return [];
  const all: { name: string; value: number; category: string }[] = [];
  for (const cat of data.skills.categories) {
    for (const item of cat.items ?? []) {
      all.push({
        name: item.label,
        value: Number(item.value || 0),
        category: cat.title || cat.name || "",
      });
    }
  }
  return all.filter((s) => s.value >= 2).sort((a, b) => b.value - a.value).slice(0, 6);
}

export default function InteractiveShowcase() {
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [about, setAbout] = useState<AboutData | null>(null);
  const [previewProjects, setPreviewProjects] = useState<Project[]>([]);
  const [projectsError, setProjectsError] = useState(false);
  const [stats, setStats] = useState({ projects: 0, skills: 0, years: 0, grad: 2025 });

  useEffect(() => {
    fetchAbout().then(setAbout);
  }, []);

  useEffect(() => {
    if (currentSection !== "projects") return;
    setProjectsError(false);
    fetchProjects()
      .then((list) => setPreviewProjects(list.slice(0, 3)))
      .catch(() => {
        setPreviewProjects([]);
        setProjectsError(true);
      });
  }, [currentSection]);

  useEffect(() => {
    if (currentSection !== "stats") return;
    const ab = about;
    let skillsCount = 0;
    if (ab?.skills?.categories) {
      for (const cat of ab.skills.categories) {
        skillsCount += (cat.items ?? []).length;
      }
    }
    let yearsExperience = 0;
    if (ab?.timeline?.length) {
      const currentYear = new Date().getFullYear();
      const years = ab.timeline.map((t) => parseInt(String(t.start), 10)).filter((n) => !Number.isNaN(n));
      if (years.length) yearsExperience = currentYear - Math.min(...years);
    }
    fetchProjects()
      .then((list) =>
        setStats({
          projects: list.length,
          skills: skillsCount,
          years: yearsExperience,
          grad: 2025,
        })
      )
      .catch(() =>
        setStats({
          projects: 0,
          skills: skillsCount,
          years: yearsExperience,
          grad: 2025,
        })
      );
  }, [currentSection, about]);

  const skillsPreview = useMemo(() => topSkills(about), [about]);
  const endorsement = about?.endorsements?.length ? about.endorsements[0] : null;

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
            {projectsError ? (
              <p className="interactive-showcase-empty interactive-showcase-content-item">Unable to load projects.</p>
            ) : (
              <>
                <div className="interactive-showcase-projects-grid interactive-showcase-content-item">
                  {previewProjects.map((p, idx) => (
                    <article key={`${p.name ?? "p"}-${idx}`} className="interactive-showcase-project-card">
                      {p.img && (
                        <img
                          className="interactive-showcase-project-media"
                          src={resolveAsset(p.img)}
                          alt={`${p.name ?? "Project"} thumbnail`}
                        />
                      )}
                      <div className="interactive-showcase-project-body">
                        <div className="interactive-showcase-project-meta">
                          <span className="interactive-showcase-project-chip">{p.year}</span>
                        </div>
                        <h3 className="interactive-showcase-project-title">{p.name ?? "Untitled"}</h3>
                        <p className="interactive-showcase-project-desc">{p.desc}</p>
                      </div>
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
          </>
        )}

        {currentSection === "skills" && (
          <>
            <h2 className="interactive-showcase-content-item">Skills</h2>
            {skillsPreview.length === 0 ? (
              <p className="interactive-showcase-empty interactive-showcase-content-item">No skills data.</p>
            ) : (
              <>
                <div className="interactive-showcase-skills-grid interactive-showcase-content-item">
                  {skillsPreview.map((skill) => (
                    <div key={skill.name} className="interactive-showcase-skill-item">
                      <div className="interactive-showcase-skill-name">{skill.name}</div>
                      <div className="interactive-showcase-skill-level">{skill.value}/3</div>
                      <div className="interactive-showcase-skill-bar">
                        <div
                          className="interactive-showcase-skill-fill"
                          style={{ width: `${(skill.value / 3) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="interactive-showcase-cta-container interactive-showcase-content-item">
                  <Link className="interactive-showcase-cta-link" to="/about">
                    View All Skills →
                  </Link>
                </div>
              </>
            )}
          </>
        )}

        {currentSection === "about" && (
          <>
            <h2 className="interactive-showcase-content-item">About Me</h2>
            <div className="interactive-showcase-about-content interactive-showcase-content-item">
              {about?.bio?.avatar && (
                <img className="interactive-showcase-about-avatar" src={resolveAsset(about.bio.avatar)} alt="" />
              )}
              <div className="interactive-showcase-about-text">{bioPreview(about)}</div>
            </div>
            <div className="interactive-showcase-cta-container interactive-showcase-content-item">
              <Link className="interactive-showcase-cta-link" to="/about">
                Learn More →
              </Link>
            </div>
          </>
        )}

        {currentSection === "stats" && (
          <>
            <h2 className="interactive-showcase-content-item">By The Numbers</h2>
            <div className="interactive-showcase-stats-grid interactive-showcase-content-item">
              <div className="interactive-showcase-stat-item">
                <div className="interactive-showcase-stat-number">{stats.projects}</div>
                <p className="interactive-showcase-stat-label">Projects</p>
              </div>
              <div className="interactive-showcase-stat-item">
                <div className="interactive-showcase-stat-number">{stats.skills}</div>
                <p className="interactive-showcase-stat-label">Skills</p>
              </div>
              <div className="interactive-showcase-stat-item">
                <div className="interactive-showcase-stat-number">{stats.years}</div>
                <p className="interactive-showcase-stat-label">Years Experience</p>
              </div>
              <div className="interactive-showcase-stat-item">
                <div className="interactive-showcase-stat-number">{stats.grad}</div>
                <p className="interactive-showcase-stat-label">Graduation Year</p>
              </div>
            </div>
            <div className="interactive-showcase-cta-container interactive-showcase-content-item">
              <Link className="interactive-showcase-cta-link" to="/about">
                View Full Profile →
              </Link>
            </div>
          </>
        )}

        {currentSection === "endorsement" && (
          <>
            <h2 className="interactive-showcase-content-item">What Others Say</h2>
            {endorsement ? (
              <>
                <article className="interactive-showcase-endorsement-content interactive-showcase-content-item">
                  <blockquote>{endorsement.quote}</blockquote>
                  <div className="interactive-showcase-endorser">
                    — {endorsement.name || "Anonymous"}
                    {endorsement.role ? `, ${endorsement.role}` : ""}
                  </div>
                </article>
                <div className="interactive-showcase-cta-container interactive-showcase-content-item">
                  <Link className="interactive-showcase-cta-link" to="/about">
                    View All Endorsements →
                  </Link>
                </div>
              </>
            ) : (
              <p className="interactive-showcase-empty interactive-showcase-content-item">No endorsements available.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
