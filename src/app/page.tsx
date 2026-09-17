import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import JsonLd from "@/components/JsonLd";
import { pageGraph } from "@/lib/siteConfig";
import { fetchWordPressProjects } from "@/lib/wordpress";

const title = "Arfan Ahmed | Full Stack Web Developer";
const description =
  "Arfan Ahmed is a Full Stack Web Developer building fast, accessible web apps with the MERN stack, Next.js, React, TypeScript and Node.js. Explore projects, skills and services.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    type: "profile",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arfan Ahmed — Full Stack Web Developer",
      },
    ],
  },
  twitter: { title, description },
};

const graph = pageGraph({
  type: "ProfilePage",
  path: "/",
  name: title,
  description,
  aboutPerson: true,
  crumbs: [{ name: "Home", path: "/" }],
});

export default async function Home() {
  const projects = await fetchWordPressProjects();

  return (
    <>
      <JsonLd data={graph} />
      <HomeClient initialProjects={projects} />
    </>
  );
}
