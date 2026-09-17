/**
 * Centralized site / SEO configuration.
 *
 * The production domain can be supplied at build/run time via the
 * NEXT_PUBLIC_SITE_URL environment variable. It falls back to the project's
 * own domain (https://arfanahmed.tech/) — the same domain the portfolio already uses
 * as its live demo URL and brand ("Arfan.dev"). Change the env var to deploy
 * under a different domain without touching source.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://arfanahmed.tech"
).replace(/\/$/, "");

/** Build an absolute URL from a root-relative path. */
export const abs = (path = "/"): string =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** Genuine, verified social / contact profiles for Arfan Ahmed. */
export const social = {
  github: "https://github.com/arfan-ahmed-shohag",
  linkedin: "https://www.linkedin.com/in/arfan-ahmed-shohag",
  facebook: "https://www.facebook.com/arfan.arfanahmed.73",
  whatsapp: "https://wa.me/8801615391684",
  email: "arfan18@cse.pstu.ac.bd",
} as const;

export const person = {
  name: "Arfan Ahmed",
  firstName: "Arfan",
  lastName: "Ahmed",
  jobTitle: "Full Stack Web Developer",
  image: abs("/arfan-ahmed.jpg"),
  worksFor: "Exprovia",
  alumniOf: "Patuakhali Science and Technology University",
  addressLocality: "Dhaka",
  addressCountry: "BD",
} as const;

export const siteName = "Arfan Ahmed — Full Stack Web Developer";

export const defaultTitle = "Arfan Ahmed | Full Stack Web Developer";
export const titleTemplate = "%s | Arfan Ahmed";

export const defaultDescription =
  "Arfan Ahmed is a Full Stack Web Developer specializing in the MERN stack, Next.js, React, TypeScript and Node.js — building fast, accessible, production-grade web applications.";

/**
 * Topics Arfan genuinely works with (all reflected in the site's content).
 * Used for JSON-LD `knowsABout` and the metadata `keywords` field.
 */
export const knowsAbout = [
  "Full Stack Web Development",
  "Web Development",
  "MERN Stack",
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "REST APIs",
  "GraphQL",
  "Tailwind CSS",
  "Frontend Development",
  "Backend Development",
  "WordPress Development",
  "WooCommerce",
] as const;

export const keywords = [
  "Arfan Ahmed",
  "Arfan Ahmed Developer",
  "Arfan Ahmed Full Stack Developer",
  "Arfan Ahmed Web Developer",
  "Full Stack Web Developer",
  "MERN Stack Developer",
  "Next.js Developer",
  "React Developer",
  "TypeScript Developer",
  "Node.js Developer",
  "Frontend Developer",
  "Backend Developer",
  "WordPress Developer",
] as const;

const personId = abs("/#person");
const websiteId = abs("/#website");

/** Schema.org Person node describing Arfan Ahmed (the site's central entity). */
export const personSchema = {
  "@type": "Person",
  "@id": personId,
  name: person.name,
  givenName: person.firstName,
  familyName: person.lastName,
  url: SITE_URL,
  image: person.image,
  jobTitle: person.jobTitle,
  description:
    "Arfan Ahmed is a Full Stack Web Developer and MERN stack engineer specializing in React, Next.js, TypeScript, Node.js, Express, MongoDB and PostgreSQL, with additional expertise in custom WordPress development.",
  email: `mailto:${social.email}`,
  worksFor: { "@type": "Organization", name: person.worksFor },
  alumniOf: { "@type": "CollegeOrUniversity", name: person.alumniOf },
  address: {
    "@type": "PostalAddress",
    addressLocality: person.addressLocality,
    addressCountry: person.addressCountry,
  },
  knowsAbout: [...knowsAbout],
  sameAs: [social.github, social.linkedin, social.facebook],
};

/** Schema.org WebSite node. */
export const websiteSchema = {
  "@type": "WebSite",
  "@id": websiteId,
  url: SITE_URL,
  name: siteName,
  description: defaultDescription,
  inLanguage: "en-US",
  publisher: { "@id": personId },
};

/** Global @graph injected once in the root layout. */
export const globalGraph = {
  "@context": "https://schema.org",
  "@graph": [personSchema, websiteSchema],
};

type Crumb = { name: string; path: string };

/** Build a BreadcrumbList node from an ordered list of crumbs. */
export function breadcrumbSchema(crumbs: Crumb[], pageUrl: string) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

type PageSchemaOptions = {
  /** WebPage subtype, e.g. "ProfilePage", "AboutPage", "CollectionPage", "ContactPage". */
  type?: string;
  path: string;
  name: string;
  description: string;
  /** When true, links the page's primary entity to the Person node. */
  aboutPerson?: boolean;
  crumbs?: Crumb[];
};

/**
 * Build a page-level @graph (WebPage subtype + optional BreadcrumbList),
 * cross-linked by @id to the global Person/WebSite nodes.
 */
export function pageGraph({
  type = "WebPage",
  path,
  name,
  description,
  aboutPerson = false,
  crumbs,
}: PageSchemaOptions) {
  const pageUrl = abs(path);
  const webPage: Record<string, unknown> = {
    "@type": type,
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name,
    description,
    isPartOf: { "@id": websiteId },
    inLanguage: "en-US",
    primaryImageOfPage: person.image,
  };

  if (aboutPerson) {
    webPage.about = { "@id": personId };
    webPage.mainEntity = { "@id": personId };
  }

  const graph: object[] = [webPage];
  if (crumbs && crumbs.length > 0) {
    webPage.breadcrumb = { "@id": `${pageUrl}#breadcrumb` };
    graph.push(breadcrumbSchema(crumbs, pageUrl));
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
