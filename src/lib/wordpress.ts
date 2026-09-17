import { Project } from "@/components/ProjectCard";

export interface CategoryOption {
  label: string;
  value: string;
}

export const WP_CATEGORIES_URL = "https://dev.arfanahmed.tech/wp-json/wp/v2/project_category";
export const WP_PROJECTS_URL = "https://dev.arfanahmed.tech/wp-json/wp/v2/projects?_embed&per_page=100";

export function cleanHtmlText(html: string | undefined): string {
  if (!html) return "";

  // Strip HTML tags
  let text = html.replace(/<[^>]*>/g, "");

  const decodeEntities = (str: string): string => {
    return str
      // Decode decimal numeric HTML entities (e.g., &#038; -> &, &#8217; -> ')
      .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
      // Decode hex numeric HTML entities (e.g., &#x26; -> &)
      .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
      // Common named entities
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/&nbsp;/g, " ")
      .replace(/&ndash;/g, "–")
      .replace(/&mdash;/g, "—")
      .replace(/&lsquo;/g, "‘")
      .replace(/&rsquo;/g, "’")
      .replace(/&ldquo;/g, "“")
      .replace(/&rdquo;/g, "”")
      .replace(/&hellip;/g, "…");
  };

  // Run decoding twice to handle double-encoded entities (e.g., &amp;#038;)
  text = decodeEntities(text);
  if (text.includes("&")) {
    text = decodeEntities(text);
  }

  return text.trim();
}

function formatTagSlug(slug: string): string {
  const customMap: Record<string, string> = {
    "seo": "SEO",
    "b2b": "B2B",
    "crm-integration": "CRM Integration",
    "gohighlevel": "GoHighLevel",
    "go-high-level": "GoHighLevel",
    "woocommerce": "WooCommerce",
    "woo-commerce": "WooCommerce",
    "wordpress": "WordPress",
    "next-js": "Next.js",
    "nextjs": "Next.js",
    "react-js": "React",
    "reactjs": "React",
    "node-js": "Node.js",
    "nodejs": "Node.js",
    "elementor-pro": "Elementor Pro",
  };
  const lower = slug.toLowerCase();
  if (customMap[lower]) return customMap[lower];
  return slug
    .split("-")
    .map((word) => {
      const wLower = word.toLowerCase();
      if (wLower === "seo") return "SEO";
      if (wLower === "b2b") return "B2B";
      if (wLower === "crm") return "CRM";
      if (wLower === "api") return "API";
      if (wLower === "pro") return "Pro";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export async function fetchWordPressCategories(): Promise<CategoryOption[]> {
  try {
    const res = await fetch(WP_CATEGORIES_URL, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }
    const data = await res.json();
    const categories: CategoryOption[] = [
      { label: "All Projects", value: "all" },
    ];

    if (Array.isArray(data)) {
      data.forEach((cat: any) => {
        if (cat.name && cat.slug) {
          categories.push({
            label: cleanHtmlText(cat.name),
            value: cat.slug,
          });
        }
      });
    }

    return categories;
  } catch (error) {
    console.error("Error fetching WordPress categories:", error);
    return [
      { label: "All Projects", value: "all" },
      { label: "Full-Stack", value: "fullstack" },
      { label: "Frontend", value: "frontend" },
      { label: "WordPress", value: "wordpress" },
    ];
  }
}

export async function fetchWordPressProjects(): Promise<Project[]> {
  try {
    const res = await fetch(WP_PROJECTS_URL, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.status}`);
    }
    const data = await res.json();

    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((post: any): Project => {
      const acf = post.acf || {};
      const embedded = post._embedded || {};

      // Primary category from embedded terms
      const categoryTerm = embedded["wp:term"]?.[0]?.[0];
      const categorySlug = categoryTerm?.slug || "wordpress";

      // Featured image from embedded media or ACF
      const featuredMedia = embedded["wp:featuredmedia"]?.[0];
      const imageUrl = featuredMedia?.source_url || acf.featured_image || `/images/projects/${post.slug || post.id}.webp`;

      // Extract tags
      let tags: string[] = [];
      if (Array.isArray(acf.tags) && acf.tags.length > 0) {
        tags = acf.tags.map((t: any) => cleanHtmlText(typeof t === "string" ? t : t.name || t.slug));
      } else if (Array.isArray(post.class_list)) {
        const rawTags = post.class_list
          .filter((cls: string) => cls.startsWith("tags-"))
          .map((cls: string) => formatTagSlug(cls.replace("tags-", "")));
        if (rawTags.length > 0) {
          tags = rawTags;
        }
      }
      if (tags.length === 0) {
        tags = ["WordPress", "Responsive Design"];
      }

      // Architecture details
      const arch = acf.architecture_details || {};
      let detailsList: string[] = [];
      if (Array.isArray(arch.details_list)) {
        detailsList = arch.details_list
          .map((item: any) => {
            if (typeof item === "string") return cleanHtmlText(item);
            if (item && typeof item === "object" && item.detail) return cleanHtmlText(item.detail);
            return "";
          })
          .filter(Boolean);
      }

      // Gallery images from embedded attachments or ACF
      let gallery: string[] = [];

      if (Array.isArray(embedded["acf:attachment"])) {
        gallery = embedded["acf:attachment"]
          .map((att: any) => att.source_url || att.media_details?.sizes?.large?.source_url || att.media_details?.sizes?.full?.source_url)
          .filter(Boolean);
      }

      if (gallery.length === 0 && Array.isArray(acf.project_gallery)) {
        gallery = acf.project_gallery
          .map((img: any) => (typeof img === "string" ? img : img.url || img.source_url))
          .filter(Boolean);
      }

      if (gallery.length === 0 && Array.isArray(acf.gallery)) {
        gallery = acf.gallery
          .map((img: any) => (typeof img === "string" ? img : img.url || img.source_url))
          .filter(Boolean);
      }

      if (imageUrl && !gallery.includes(imageUrl)) {
        gallery.unshift(imageUrl);
      }

      if (gallery.length === 0 && imageUrl) {
        gallery = [imageUrl];
      }

      return {
        id: String(post.id),
        slug: post.slug || String(post.id),
        isFeatured: Boolean(acf.is_featured),
        title: cleanHtmlText(post.title?.rendered || "Untitled Project"),
        category: categorySlug,
        image: imageUrl,
        gallery,
        tags,
        desc: cleanHtmlText(acf.short_description || post.excerpt?.rendered || ""),
        demoUrl: acf.demo_url || "",
        gitUrl: acf.github_url || acf.github_frontend_url || acf.github_backend_url || "",
        problem: cleanHtmlText(acf.problem),
        solution: cleanHtmlText(acf.solution),
        result: cleanHtmlText(acf.result),
        archDetails: {
          frontend: cleanHtmlText(arch.frontend || "Elementor Pro / React"),
          backend: cleanHtmlText(arch.backend || "WordPress REST API"),
          database: cleanHtmlText(arch.database || "MySQL"),
          detailsList,
        },
      };
    });
  } catch (error) {
    console.error("Error fetching WordPress projects:", error);
    return [];
  }
}

export async function fetchWordPressProjectBySlug(slugOrId: string): Promise<Project | null> {
  try {
    const projects = await fetchWordPressProjects();
    const target = slugOrId.toLowerCase();
    const match = projects.find(
      (p) => (p.slug && p.slug.toLowerCase() === target) || p.id === slugOrId
    );
    return match || null;
  } catch (error) {
    console.error(`Error fetching WordPress project for slug ${slugOrId}:`, error);
    return null;
  }
}

