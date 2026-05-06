import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FunPage from "./pages/FunPage";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";

export default function App() {
  return (
    <HashRouter>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/fun" element={<FunPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </HashRouter>
  );
}
