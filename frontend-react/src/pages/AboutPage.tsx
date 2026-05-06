import { useEffect, useState } from "react";
import { fetchAbout, resolveAsset } from "../services/portfolioApi";
import type { AboutData } from "../types/portfolio";

export default function AboutPage() {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAbout()
      .then((d) => setData(d))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="container">
        <p className="muted">Loading profile…</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="container">
        <p className="muted">Could not load profile data.</p>
      </main>
    );
  }

  return (
    <>
      <main className="container">
        <div className="about-bio-wrap fade-section visible">
          <section className="about-bio-section material-about-card">
            <h2>About Me</h2>
            <div className="about-bio-bio" id="bio">
              {data.bio?.avatar && <img src={resolveAsset(data.bio.avatar)} alt="" />}
              <div>
                <h3>{data.bio?.headline}</h3>
                {data.bio?.subline && <div>{data.bio.subline}</div>}
                {data.bio?.body && <p dangerouslySetInnerHTML={{ __html: data.bio.body }} />}
              </div>
            </div>
          </section>
        </div>
        <div className="skills-wrap fade-section visible">
          <section className="skills-section material-about-card">
            <h2>Skills</h2>
            <div id="skills">
              {(data.skills?.categories ?? []).map((cat, i) => (
                <div key={`${cat.title ?? cat.name ?? "category"}-${i}`}>
                  <div className="skills-category-title">{cat.title || cat.name || "Skills"}</div>
                  <div className="skills-grid">
                    {(cat.items ?? []).map((it) => (
                      <div className="skills-skill" key={it.label}>
                        <div>{it.label}</div>
                        <div>{it.value}/3</div>
                        <div className="skills-bar">
                          <div
                            className="skills-fill"
                            style={{ width: `${(Number(it.value || 0) / 3) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <footer className="container site-footer">© 2025 Jessica Lecker</footer>
    </>
  );
}
