import { useEffect, useState } from "react";
import { fetchProjects, resolveAsset } from "../services/portfolioApi";
import type { Project } from "../types/portfolio";

export default function ProjectsGrid() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjects()
      .then((list) => setItems(list))
      .catch((err: Error) => setError(`Could not load projects: ${err.message}`))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="projects-grid-status">Loading projects...</div>;
  if (error) return <div className="projects-grid-status">{error}</div>;

  return (
    <section className="projects-grid-grid">
      {items.length === 0 && <p className="projects-grid-desc">No projects found.</p>}
      {items.map((p, idx) => (
        <article className="projects-grid-card" key={`${p.name ?? "project"}-${idx}`}>
          {p.img && <img className="projects-grid-media" src={resolveAsset(p.img)} alt={`${p.name ?? "Project"} thumbnail`} />}
          <div className="projects-grid-body">
            <div className="projects-grid-meta">
              <span className="projects-grid-chip">{p.year}</span>
            </div>
            <h3 className="projects-grid-title">{p.name ?? "Untitled Project"}</h3>
            <p className="projects-grid-desc">{p.desc}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
