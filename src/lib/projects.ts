import type { Project } from "@/components/ProjectCard";
import projectData from "../../public/project.json";

export interface CategoryOption {
  label: string;
  value: string;
}

const projects: Project[] = projectData;

export function getProjects(): Project[] {
  return projects;
}

export function getProjectCategories(): CategoryOption[] {
  const labels: Record<string, string> = {
    fullstack: "Full-Stack",
    "full-stack": "Full-Stack",
    frontend: "Frontend",
    wordpress: "WordPress",
  };

  return [
    { label: "All Projects", value: "all" },
    ...Array.from(new Set(projects.map((project) => project.category))).map(
      (category) => ({
        label:
          labels[category] ||
          category
            .split(/[-_\s]+/)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
        value: category,
      })
    ),
  ];
}

export function getProjectBySlug(slugOrId: string): Project | null {
  const target = slugOrId.toLowerCase();

  return (
    projects.find(
      (project) => project.slug?.toLowerCase() === target || project.id === slugOrId
    ) || null
  );
}
