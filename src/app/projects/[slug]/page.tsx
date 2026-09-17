import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailClient from "@/components/ProjectDetailClient";
import JsonLd from "@/components/JsonLd";
import { pageGraph } from "@/lib/siteConfig";
import {
  fetchWordPressProjects,
  fetchWordPressProjectBySlug,
} from "@/lib/wordpress";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await fetchWordPressProjects();
  return projects.map((project) => ({
    slug: project.slug || project.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchWordPressProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const title = `${project.title} — Case Study & Project Details`;
  const description = project.desc || `Technical case study and architecture breakdown for ${project.title} by Arfan Ahmed.`;
  const path = `/projects/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "article",
      images: [
        {
          url: project.image || "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${project.title} Screenshot`,
        },
      ],
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
      images: [project.image || "/og-image.png"],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await fetchWordPressProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await fetchWordPressProjects();
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  const graph = pageGraph({
    type: "CreativeWork",
    path: `/projects/${slug}`,
    name: `${project.title} — Case Study by Arfan Ahmed`,
    description: project.desc,
    aboutPerson: true,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: project.title, path: `/projects/${slug}` },
    ],
  });

  return (
    <>
      <JsonLd data={graph} />
      <ProjectDetailClient project={project} relatedProjects={relatedProjects} />
    </>
  );
}
