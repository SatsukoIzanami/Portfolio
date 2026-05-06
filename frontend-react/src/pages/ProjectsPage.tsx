import ProjectsGrid from "../components/ProjectsGrid";

export default function ProjectsPage() {
  return (
    <>
      <main className="container">
        <div className="page-header">
          <div>
            <h1>Projects</h1>
            <p className="page-sub">Selected work from courses and personal builds.</p>
          </div>
        </div>
        <ProjectsGrid />
      </main>
      <footer className="container site-footer">© 2025 Jessica Lecker — React portfolio</footer>
    </>
  );
}
