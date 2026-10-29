import type { Metadata } from "next";
import ProjectsClient from "@/components/ProjectsClient";
import JsonLd from "@/components/JsonLd";
import { pageGraph } from "@/lib/siteConfig";
import { getProjectCategories, getProjects } from "@/lib/projects";

const title = "Projects — Arfan Ahmed, Full Stack Web Developer";
const description =
  "A showcase of web development projects by Arfan Ahmed: full-stack MERN applications, Next.js and React front-ends, backend APIs, and custom WordPress builds.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title,
    description,
    url: "/projects",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Projects by Arfan Ahmed — Full Stack Web Developer",
      },
    ],
  },
  twitter: { title, description },
};

const graph = pageGraph({
  type: "CollectionPage",
  path: "/projects",
  name: title,
  description,
  aboutPerson: true,
  crumbs: [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
  ],
});

export default function ProjectsPage() {
  const categories = getProjectCategories();
  const projects = getProjects();

  return (
    <>
      <JsonLd data={graph} />
      <ProjectsClient initialCategories={categories} initialProjects={projects} />
    </>
  );
}

