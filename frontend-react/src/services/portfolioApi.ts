import type { AboutData, Project } from "../types/portfolio";

const RENDER_ORIGIN = "https://portfolio-awnu.onrender.com";
const RENDER_API_BASE = `${RENDER_ORIGIN}/api`;

export const getPortfolioApiBase = (): string => {
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1") return "/api";
  if (host.endsWith("github.io")) return RENDER_API_BASE;
  return "/api";
};

export const resolveAsset = (assetPath?: string): string =>
  (assetPath ?? "").trim().replace(/^\.\//, "").replace(/^\/+/, "");

export const fetchProjects = async (): Promise<Project[]> => {
  const res = await fetch(`${getPortfolioApiBase()}/projects`);
  if (!res.ok) throw new Error("Failed to load projects.");
  const data = await res.json();
  return Array.isArray(data) ? data : data?.projects ?? [];
};

export const fetchAbout = async (): Promise<AboutData | null> => {
  const res = await fetch(`${getPortfolioApiBase()}/about`);
  if (!res.ok) return null;
  return (await res.json()) as AboutData;
};
