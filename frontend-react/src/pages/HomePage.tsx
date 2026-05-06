import { Link } from "react-router-dom";
import InteractiveShowcase from "../components/InteractiveShowcase";

export default function HomePage() {
  return (
    <>
      <section className="hero container">
        <h1>Jessica Lecker</h1>
        <p className="sub">Full-stack student developer. Clean patterns, accessible UIs, and maintainable code.</p>
      </section>
      <div className="container">
        <InteractiveShowcase />
      </div>
      <section className="container cta-block">
        <h2>Let's Connect</h2>
        <p className="cta-lede">Interested in collaborating or learning more about my work?</p>
        <p className="cta-actions">
          <Link className="button" to="/contact">
            Get In Touch →
          </Link>
          <Link className="button" to="/projects">
            View My Work →
          </Link>
        </p>
      </section>
      <footer className="container site-footer">© 2025 Jessica Lecker — React portfolio</footer>
    </>
  );
}
