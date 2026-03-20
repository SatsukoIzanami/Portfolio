export interface Project {
  img?: string;
  name?: string;
  year?: string;
  desc?: string;
}

export interface ProjectsResponse {
  projects: Project[];
}
