"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import TypingText from "@/components/TypingText";
import ProjectCard, { Project } from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import {
  ArrowRight,
  Download,
  Server,
  Database,
  Globe,
  Cpu,
  ShieldCheck,
  Layers,
  Code,
  TrendingUp,
  Lock,
  GraduationCap,
  CheckCircle2,
  Terminal
} from "lucide-react";
import { FaGithub, FaLinkedinIn, FaFacebookF, FaWhatsapp, FaWordpress, FaNodeJs, FaReact } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiFirebase,
  SiSupabase,
  SiWebflow,
  SiTailwindcss
} from "react-icons/si";
import { FiMail } from "react-icons/fi";

export default function HomeClient() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Full-Stack Application",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "Full-Stack Application", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      icon: <Server className="w-6 h-6 text-[#22a0ad]" />,
      title: "Full-Stack Web Applications",
      tagline: "Next.js 15, React & Node.js Enterprise Systems",
      desc: "Architecting high-performance digital systems leveraging Next.js (App Router), React, TypeScript, Node.js, and Express with type-safe REST & GraphQL endpoints.",
      techs: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "Redux Toolkit", "Zustand"],
      highlights: [
        "Server-Side Rendering (SSR), SSG & Incremental Static Regeneration (ISR)",
        "Strict Type Safety with TypeScript, Zod Schema Validation & Prisma ORM",
        "Modular Component Architecture & Global State Management Systems",
        "Top Core Web Vitals Performance (95+ Lighthouse Score)"
      ],
      codeSnippet: `// Next.js App Router & Type-Safe API Spec
export const appConfig = {
  framework: "Next.js 15 (App Router)",
  typeSafety: "Strict TypeScript + Zod",
  rendering: "Hybrid SSR / ISR / Edge",
  stateManagement: "Zustand & TanStack Query",
  styling: "Tailwind CSS & Framer Motion",
  performance: "Core Web Vitals 98/100"
};`
    },
    {
      icon: <Globe className="w-6 h-6 text-[#22a0ad]" />,
      title: "Custom CMS & WordPress Engineering",
      tagline: "Bespoke Themes, Custom Sync Plugins & Headless WP",
      desc: "Building corporate-grade WordPress architectures, custom ACF themes, bespoke sync plugins from scratch, WooCommerce setups, and Webflow client-first builds.",
      techs: ["WordPress", "WooCommerce", "Custom Plugins", "ACF Pro", "Headless WP", "Webflow", "PHP"],
      highlights: [
        "Bespoke WordPress Themes Built From Scratch (Zero Builder Bloat)",
        "Custom Plugin Engineering for Database Syncing & Legacy Systems",
        "Headless WordPress & WooCommerce Custom Post Type REST APIs",
        "Webflow Client-First System Integration & Custom JavaScript"
      ],
      codeSnippet: `// Custom WordPress Plugin Architecture
add_action( 'init', function() {
  register_post_type( 'portfolio_project', array(
    'labels'       => array( 'name' => __( 'Projects' ) ),
    'public'       => true,
    'show_in_rest' => true, // Headless WP REST API
    'supports'     => array( 'title', 'editor', 'thumbnail' )
  ) );
} );`
    },
    {
      icon: <Database className="w-6 h-6 text-[#22a0ad]" />,
      title: "Database & Backend Architecture",
      tagline: "Relational PostgreSQL, NoSQL Schema & Connection Pooling",
      desc: "Designing secure, relational, and non-relational database schemas using PostgreSQL, MongoDB, Prisma ORM, Mongoose, and connection pooling for high throughput.",
      techs: ["PostgreSQL", "MongoDB", "Prisma ORM", "Express.js", "Mongoose", "Supabase", "REST APIs"],
      highlights: [
        "Strict Normalized Schema Design & Indexed Query Optimization",
        "Type-Safe Database ORM Access using Prisma & Mongoose",
        "Decoupled REST & GraphQL Backend Microservices Architecture",
        "Automated Migrations, Security Protocols & Connection Pooling"
      ],
      codeSnippet: `// PostgreSQL + Prisma Schema Config
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  role      Role     @default(DEVELOPER)
  projects  Project[]
  createdAt DateTime @default(now())
}`
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-[#22a0ad]" />,
      title: "Performance & Technical SEO",
      tagline: "Lighthouse 95+, Hydration Speed & Schema Markup",
      desc: "Fine-tuning page load speed, reducing bundle size, optimizing Core Web Vitals (LCP, CLS, INP), and injecting JSON-LD schema markup for top search engine visibility.",
      techs: ["Core Web Vitals", "Lighthouse", "Technical SEO", "JSON-LD Schema", "Image Optimization", "Clean Code"],
      highlights: [
        "Lighthouse 95+ PageSpeed Optimization for Mobile & Desktop",
        "Hydration Latency Reduction & Smart Code-Splitting",
        "Structured Data / OpenGraph Metadata for Rich Social Previews",
        "Accessibility (a11y) Compliance & Semantic HTML5 Structure"
      ],
      codeSnippet: `// Technical SEO & Core Web Vitals Spec
export const seoConfig = {
  lighthouseTarget: "95+ All Metrics",
  coreWebVitals: { LCP: "< 1.2s", CLS: "< 0.05", INP: "< 100ms" },
  structuredData: ["LocalBusiness", "Person", "SoftwareSourceCode"],
  openGraph: "Dynamic Card Social Previews"
};`
    }
  ];

  const row1Stack = [
    { name: "React", level: "Expert", icon: <FaReact className="w-5 h-5 text-cyan-400" /> },
    { name: "Next.js", level: "Senior", icon: <SiNextdotjs className="w-5 h-5 text-slate-100" /> },
    { name: "TypeScript", level: "Expert", icon: <SiTypescript className="w-5 h-5 text-blue-400" /> },
    { name: "Node.js", level: "Advanced", icon: <FaNodeJs className="w-5 h-5 text-[#22a0ad]" /> },
    { name: "Tailwind CSS", level: "Expert", icon: <SiTailwindcss className="w-5 h-5 text-cyan-400" /> },
    { name: "PostgreSQL", level: "Advanced", icon: <SiPostgresql className="w-5 h-5 text-sky-400" /> }
  ];

  const row2Stack = [
    { name: "WordPress", level: "Expert", icon: <FaWordpress className="w-5 h-5 text-sky-400" /> },
    { name: "Webflow", level: "Intermediate", icon: <SiWebflow className="w-5 h-5 text-blue-400" /> },
    { name: "MongoDB", level: "Advanced", icon: <SiMongodb className="w-5 h-5 text-emerald-500" /> },
    { name: "Prisma", level: "Advanced", icon: <SiPrisma className="w-5 h-5 text-slate-200" /> },
    { name: "Firebase", level: "Advanced", icon: <SiFirebase className="w-5 h-5 text-amber-400" /> },
    { name: "Supabase", level: "Advanced", icon: <SiSupabase className="w-5 h-5 text-[#22a0ad]" /> }
  ];

  const featuredProjects: Project[] = [
    {
      id: "proj_07",
      image: "/images/projects/proj_07.webp",
      title: "CALM ABA Therapy — Healthcare Website Redesign",
      category: "wordpress",
      tags: ["WordPress", "Elementor Pro", "SEO", "Responsive Design", "Intake Flow"],
      desc: "A full homepage redesign and layout modernization for a Maryland-based ABA therapy center, built to feel modern, trustworthy, and healthcare-grade.",
      demoUrl: "https://calmllc.org/",
      gitUrl: "",
      problem: "The client's existing WordPress site had an outdated layout, lacked clear conversion paths for parents seeking therapy, and had no structured local SEO presence.",
      solution: "Redesigned core pages using Elementor Pro, added clear CTA sections, an insurance-aware service breakdown across 6 pages, and Google Forms intake integration.",
      result: "Delivered a fully responsive healthcare website with a clear service catalog, working lead-capture flow, and locally optimized SEO structure.",
      archDetails: {
        frontend: "Elementor Pro page builder on Hello Elementor theme with custom responsive sections.",
        backend: "WordPress core with Elementor Pro stack and Google Forms intake handling.",
        database: "Standard WordPress MySQL schema extended with Elementor template data.",
        detailsList: [
          "Full homepage redesign following a modern healthcare reference style.",
          "Six dedicated service pages with insurance guidance.",
          "Google Forms-based intake flow for lead capture.",
          "Local SEO optimization for Maryland-based ABA therapy searches."
        ]
      }
    },
    {
      id: "proj_08",
      image: "/images/projects/proj_08.webp",
      title: "OMLI Trading — Global Minerals Trading Website",
      category: "wordpress",
      tags: ["WordPress", "Elementor Pro", "B2B", "SEO", "Corporate"],
      desc: "Corporate B2B website built for a U.S.-based international minerals trading company, featuring trust statistics, product pages, and a global supply network map.",
      demoUrl: "https://omlitrading.com/",
      gitUrl: "",
      problem: "The client needed a website that communicated global scale to industrial buyers, but lacked clear company positioning, statistics, or product details.",
      solution: "Designed an 8-page corporate site on WordPress with Elementor Pro, adding key trust statistics (600k+ MT exported), product pages, and a global trade map.",
      result: "Delivered a professional corporate website positioning the client as a credible global supplier with working quote request flows.",
      archDetails: {
        frontend: "Elementor Pro on WordPress with custom sections for hero stats and trade routes map.",
        backend: "WordPress multi-page architecture structured for B2B search visibility.",
        database: "Standard WordPress MySQL schema managing page content and quote requests.",
        detailsList: [
          "Homepage rebuilt around a clear one-sentence value proposition.",
          "Key company stats (600,000+ MT exported, 15+ years experience).",
          "Product pages for Rock Salt, Rock Phosphate, and Sulfur.",
          "Global supply network map showing Egypt-to-Americas trade routes."
        ]
      }
    },
    {
      id: "proj_09",
      image: "/images/projects/proj_09.webp",
      title: "Amilli Financial — Insurance Agency Website",
      category: "wordpress",
      tags: ["WordPress", "Elementor", "GoHighLevel", "CRM Integration", "Lead Generation"],
      desc: "An 8-page independent insurance agency website built from a client reference site, with lead forms integrated directly into GoHighLevel CRM.",
      demoUrl: "https://amillifinancial.com/",
      gitUrl: "",
      problem: "The client needed a modern, fully owned website with reliable lead capture routed to their GoHighLevel CRM and an agent recruitment funnel.",
      solution: "Built an 8-page WordPress site with Elementor, integrated GoHighLevel CRM webhooks for form submissions, and added carrier showcases and reviews.",
      result: "Delivered a professional insurance agency site with working CRM lead routing and an agent recruitment section.",
      archDetails: {
        frontend: "Elementor page builder with custom lead capture forms and carrier logo carousels.",
        backend: "WordPress core with GoHighLevel CRM webhook integration.",
        database: "WordPress MySQL schema with external CRM payload forwarding.",
        detailsList: [
          "Built 8 pages covering Life Insurance, Annuities, IUL, and Final Expense.",
          "Integrated GoHighLevel CRM webhooks for form submissions.",
          "Created an agent recruiting landing section.",
          "Featured interactive carrier maps and client reviews."
        ]
      }
    }
  ];

  const workflowSteps = [
    {
      icon: <Globe className="w-5 h-5 text-[#22a0ad]" />,
      title: "1. Architecture & Strategy",
      desc: "Designing scalable system architectures, normalization of databases, and defining clear API specifications tailored to client growth goals."
    },
    {
      icon: <Code className="w-5 h-5 text-[#22a0ad]" />,
      title: "2. Type-Safe Development",
      desc: "Writing modular, self-documenting code with reusable components and strictly typed interfaces to ensure reliable runtime execution."
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-[#22a0ad]" />,
      title: "3. Optimization & SEO",
      desc: "Fine-tuning server-side rendering, Core Web Vitals, site speed, and structured SEO metadata so products rank high and load fast."
    },
    {
      icon: <Lock className="w-5 h-5 text-[#22a0ad]" />,
      title: "4. Secure Deployment",
      desc: "Deploying production-ready applications with automated CI/CD pipelines, SSL protection, security headers, and continuous server health checks."
    }
  ];

  return (
    <article className="space-y-24 md:space-y-36 relative">

      {/* 1. HERO SECTION */}
      <section className="min-h-[75vh] flex flex-col justify-center relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 z-10">
            <div className="inline-flex items-center space-x-2 bg-[#023644]/50 border border-[#126972]/40 text-[#22a0ad] px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#126972] animate-pulse" />
              <span>Available for Full-Stack & WordPress Projects</span>
            </div>

            <TypingText />

            <h2 className="text-base sm:text-lg font-medium text-slate-300 tracking-tight max-w-2xl leading-relaxed">
              Crafting scalable backend architectures and pixel-perfect frontends.
            </h2>

            <p className="text-slate-400 text-sm sm:text-base max-w-xl font-sans leading-relaxed">
              Full-Stack Engineer & WordPress Architect with a focus on type safety, performance optimization, and clean SaaS component structures.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/projects"
                className="px-6 py-3.5 bg-gradient-to-r from-[#126972] to-[#22a0ad] hover:from-[#18838f] hover:to-[#2bc0d0] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-[0_0_20px_rgba(18,105,114,0.4)] flex items-center gap-2"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="/resume.pdf"
                download="Arfan_Ahmed_Resume.pdf"
                className="px-6 py-3.5 border border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600 font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Social Links Panel */}
            <div className="flex flex-wrap items-center gap-3 pt-6">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">Connect:</span>

              {/* GitHub */}
              <a
                href="https://github.com/arfan-ahmed-shohag"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-800/80 border border-slate-700/80 rounded-lg hover:border-[#126972]/50 text-slate-400 hover:text-[#22a0ad] transition-colors"
                title="GitHub"
                aria-label="Arfan Ahmed on GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/arfan-ahmed-shohag/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-800/80 border border-slate-700/80 rounded-lg hover:border-[#126972]/50 text-slate-400 hover:text-[#22a0ad] transition-colors"
                title="LinkedIn"
                aria-label="Arfan Ahmed on LinkedIn"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>

              {/* Email */}
              <a
                href="mailto:arfan18@cse.pstu.ac.bd"
                className="p-2.5 bg-slate-800/80 border border-slate-700/80 rounded-lg hover:border-[#126972]/50 text-slate-400 hover:text-[#22a0ad] transition-colors"
                title="Email"
                aria-label="Email Arfan Ahmed"
              >
                <FiMail className="w-4 h-4" />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/arfan.arfanahmed.73"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-800/80 border border-slate-700/80 rounded-lg hover:border-[#126972]/50 text-slate-400 hover:text-[#22a0ad] transition-colors"
                title="Facebook"
                aria-label="Arfan Ahmed on Facebook"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/8801615391684"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-800/80 border border-slate-700/80 rounded-lg hover:border-[#126972]/50 text-slate-400 hover:text-[#22a0ad] transition-colors"
                title="WhatsApp"
                aria-label="Chat with Arfan Ahmed on WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: Photo + Soft Emerald Glow (Without Floating Badges) */}
          <div className="lg:col-span-5 flex justify-center items-center relative z-10 py-6 lg:py-0">
            <div className="relative flex items-center justify-center">
              {/* Soft blurred teal radial gradient glow */}
              <div className="absolute w-[380px] sm:w-[420px] h-[380px] sm:h-[420px] rounded-full bg-[radial-gradient(circle,rgba(18,105,114,0.25)_0%,rgba(18,105,114,0)_70%)] blur-[8px] pointer-events-none -z-10" />

              {/* Photo container with rounded corners (16px), no card background or border */}
              <div className="relative w-[280px] sm:w-[310px] md:w-[450px] h-[350px] sm:h-[390px] md:h-[500px] rounded-[20px] overflow-hidden shadow-2xl">
                <Image
                  src="/arfan-ahmed.jpg"
                  alt="Arfan Ahmed — Full Stack Web Developer"
                  fill
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 310px, 450px"
                  priority
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT ME & METRICS SECTION (Right below Hero) */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4 }}
        className="space-y-8 relative z-10"
      >
        {/* Section Header */}
        <div className="text-left space-y-2">
          <h2 className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
            Who I Am
          </h2>
          <p className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100">
            About <span className="text-cyan-400">Me</span>
          </p>
        </div>

        {/* Top Block: Developer Bio & Interactive Code / Terminal Box */}
        <div className="bg-[#1e293b] p-6 sm:p-8 border border-slate-800 rounded-2xl shadow-xl space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Bio & Highlights */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
                Full-Stack Engineer & <span className="text-cyan-400">WordPress Architect</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                I specialize in building scalable web applications with Next.js, React, TypeScript, Node.js, PostgreSQL, and custom WordPress architectures. Focused on type safety, high speed performance, intuitive UX, and maintainable codebase structure.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-0.5">
                  <span className="text-[11px] font-bold text-cyan-400 block uppercase tracking-wider">Frontend</span>
                  <span className="text-xs text-slate-300 font-medium block">Next.js, React, TS, Tailwind</span>
                </div>
                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-0.5">
                  <span className="text-[11px] font-bold text-cyan-400 block uppercase tracking-wider">Backend</span>
                  <span className="text-xs text-slate-300 font-medium block">Node.js, Express, REST, GraphQL</span>
                </div>
                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-0.5">
                  <span className="text-[11px] font-bold text-cyan-400 block uppercase tracking-wider">Database</span>
                  <span className="text-xs text-slate-300 font-medium block">PostgreSQL, MongoDB, Prisma</span>
                </div>
                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-0.5">
                  <span className="text-[11px] font-bold text-cyan-400 block uppercase tracking-wider">CMS Core</span>
                  <span className="text-xs text-slate-300 font-medium block">WordPress, WooCommerce, Plugins</span>
                </div>
              </div>

              {/* Education Pill Card */}
              <div className="p-3 bg-slate-900/60 border border-slate-800 hover:border-[#126972]/50 rounded-xl space-y-0.5 transition-all">
                <div className="flex items-center space-x-1.5 text-[#22a0ad]">
                  <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">Education</span>
                </div>
                <span className="text-xs font-bold text-slate-100 block">B.Sc. in Computer Science &amp; Engineering</span>
                <span className="text-[11px] text-slate-400 block font-medium">Patuakhali Science and Technology University (PSTU) • 2022 - 2026</span>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="px-5 py-2.5 bg-gradient-to-r from-[#126972] to-[#22a0ad] hover:from-[#18838f] hover:to-[#2bc0d0] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all inline-flex items-center gap-2 shadow-md"
                >
                  <span>More About Me</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: Interactive Code / Terminal Box */}
            <div className="lg:col-span-6">
              <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-xs">
                {/* Window Bar */}
                <div className="bg-slate-900/80 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#126972] inline-block" />
                  </div>
                  <div className="flex items-center space-x-1.5 text-slate-400 text-[11px] font-sans font-medium">
                    <Code className="w-3.5 h-3.5 text-[#22a0ad]" />
                    <span>arfan.config.ts</span>
                  </div>
                  <span className="text-[10px] text-[#22a0ad] font-mono">UTF-8</span>
                </div>

                {/* Code Content */}
                <div className="p-4 sm:p-5 space-y-2 text-slate-300 leading-relaxed overflow-x-auto">
                  <div>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-blue-400">developer</span> = &#123;
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">name:</span>{" "}
                    <span className="text-[#22a0ad]">&quot;Arfan Ahmed&quot;</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">title:</span>{" "}
                    <span className="text-[#22a0ad]">&quot;Full-Stack Engineer &amp; WP Architect&quot;</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">education:</span>{" "}
                    <span className="text-amber-300">&quot;B.Sc. in CSE @ PSTU (2022 - 2026)&quot;</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">experience:</span>{" "}
                    <span className="text-amber-300">&quot;Exprovia &amp; CDSR (Remote)&quot;</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">techStack:</span> [
                    <div className="pl-4 text-[#22a0ad]">
                      &quot;Next.js (App Router)&quot;, &quot;TypeScript&quot;,
                    </div>
                    <div className="pl-4 text-[#22a0ad]">
                      &quot;Node.js &amp; Express APIs&quot;, &quot;PostgreSQL&quot;,
                    </div>
                    <div className="pl-4 text-[#22a0ad]">
                      &quot;Custom WordPress &amp; WooCommerce&quot;
                    </div>
                    ],
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">architecture:</span>{" "}
                    <span className="text-[#22a0ad]">&quot;Type-Safe &amp; Scalable&quot;</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">status:</span>{" "}
                    <span className="text-[#22a0ad] font-semibold">&quot;Available for Projects 🚀&quot;</span>
                  </div>
                  <div>&#125;;</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Block: Metric Cards Grid (3 Cards like Tumit's Bento grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#1e293b] p-6 border border-slate-800 hover:border-[#126972]/50 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg group space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#023644]/50 border border-[#126972]/40 flex items-center justify-center text-[#22a0ad] group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-slate-100 group-hover:text-[#22a0ad] transition-colors">
                10+ Months
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                Corporate Experience
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans pt-1">
              Professional software engineering & WordPress architecture experience delivering commercial web applications at Exprovia & CDSR.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#1e293b] p-6 border border-slate-800 hover:border-[#126972]/50 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg group space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#023644]/50 border border-[#126972]/40 flex items-center justify-center text-[#22a0ad] group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-slate-100 group-hover:text-[#22a0ad] transition-colors">
                35+
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                Delivered Projects
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans pt-1">
              Full-stack web applications, custom WooCommerce plugins, B2B corporate platforms, and API sync engines successfully deployed.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#1e293b] p-6 border border-slate-800 hover:border-[#126972]/50 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg group space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#023644]/50 border border-[#126972]/40 flex items-center justify-center text-[#22a0ad] group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-slate-100 group-hover:text-[#22a0ad] transition-colors">
                100%
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                Type-Safe & Optimized Code
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans pt-1">
              Writing clean TypeScript, modular components, strict backend schemas, and Core Web Vitals optimized for top Lighthouse scores.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 3. CORE EXPERTISE SERVICES (TUMIT-STYLE INTERACTIVE SPLIT SHOWCASE) */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4 }}
        className="space-y-8 z-10 relative"
      >
        <div className="text-left space-y-2">
          <h2 className="text-xs font-bold text-[#22a0ad] tracking-wider uppercase">
            My Services
          </h2>
          <p className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100">
            What I <span className="text-[#22a0ad]">Offer &amp; Deliver</span>
          </p>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
            Specialized web development services focused on high-speed web apps, custom WordPress plugin architectures, database normalization, and technical SEO.
          </p>
        </div>

        {/* Tumit-Style 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive Vertical Tab List (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-3">
            {services.map((svc, idx) => {
              const isActive = activeServiceIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveServiceIndex(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group cursor-pointer ${isActive
                    ? "bg-[#1e293b] border-[#126972]/80 shadow-xl"
                    : "bg-[#131b2e]/90 border-slate-800/90 hover:border-slate-700 hover:bg-[#19233c]"
                    }`}
                >
                  {/* Left Active Indicator Bar */}
                  <div
                    className={`absolute top-0 left-0 w-1.5 h-full transition-all duration-300 ${isActive ? "bg-[#126972]" : "bg-transparent group-hover:bg-slate-700"
                      }`}
                  />

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center space-x-3.5">
                      <span
                        className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border transition-colors ${isActive
                          ? "bg-[#023644]/60 text-[#22a0ad] border-[#126972]/50"
                          : "bg-slate-900/60 text-slate-400 border-slate-800"
                          }`}
                      >
                        0{idx + 1}
                      </span>
                      <div
                        className={`p-2.5 rounded-xl border transition-colors ${isActive
                          ? "bg-[#023644]/50 border-[#126972]/40 text-[#22a0ad]"
                          : "bg-slate-900/60 border-slate-800 text-slate-400"
                          }`}
                      >
                        {svc.icon}
                      </div>
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 transition-transform duration-300 ${isActive
                        ? "text-[#22a0ad] translate-x-1"
                        : "text-slate-600 group-hover:text-slate-400"
                        }`}
                    />
                  </div>

                  <div className="mt-3.5 space-y-1 pl-1">
                    <h3
                      className={`text-base sm:text-lg font-bold transition-colors ${isActive ? "text-[#22a0ad]" : "text-slate-200 group-hover:text-slate-100"
                        }`}
                    >
                      {svc.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-sans line-clamp-2">
                      {svc.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: High-Tech Service Spec Showcase Box (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeServiceIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-[#1e293b] p-6 sm:p-8 border border-slate-800 rounded-3xl shadow-2xl space-y-6 h-full flex flex-col justify-between"
              >
                {/* Header Info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                    <div className="inline-flex items-center space-x-2 bg-[#023644]/50 border border-[#126972]/40 text-[#22a0ad] px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                      <span className="w-2 h-2 rounded-full bg-[#126972] animate-pulse" />
                      <span>Phase 0{activeServiceIndex + 1} Specification</span>
                    </div>

                    <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-md border border-slate-800">
                      Production Ready
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
                      {services[activeServiceIndex].title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#22a0ad] mt-1">
                      {services[activeServiceIndex].tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {services[activeServiceIndex].desc}
                  </p>
                </div>

                {/* Key Deliverables & Highlights */}
                <div className="space-y-2.5 pt-2">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Core Engineering Capabilities:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {services[activeServiceIndex].highlights.map((item, hIdx) => (
                      <li
                        key={hIdx}
                        className="text-xs text-slate-300 flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#22a0ad] shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Code Snippet Box */}
                <div className="bg-[#0b1329] border border-slate-800 rounded-xl overflow-hidden font-mono text-xs">
                  <div className="bg-slate-900/90 px-3.5 py-2 border-b border-slate-800 flex items-center justify-between text-slate-400 text-[11px]">
                    <div className="flex items-center space-x-2">
                      <Terminal className="w-3.5 h-3.5 text-[#22a0ad]" />
                      <span>service-spec.config.ts</span>
                    </div>
                    <span className="text-[10px] text-[#22a0ad]">TypeScript</span>
                  </div>
                  <pre className="p-3.5 text-slate-300 overflow-x-auto text-[11px] leading-relaxed">
                    <code>{services[activeServiceIndex].codeSnippet}</code>
                  </pre>
                </div>

                {/* Tech Stack Pills Footer */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800">
                  {services[activeServiceIndex].techs.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs font-medium px-3 py-1 bg-slate-900 text-slate-300 border border-slate-800 rounded-lg"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* 4. TECHNICAL SKILLS MATRIX (DUAL INFINITE MARQUEE CAROUSEL) */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4 }}
        className="space-y-6 z-10 relative overflow-hidden"
      >
        <div className="text-left space-y-2">
          <h2 className="text-xs font-bold text-[#22a0ad] tracking-wider uppercase">
            Technical Stack
          </h2>
          <p className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100">
            Skills &amp; Technologies
          </p>
        </div>

        {/* Dual Marquee Container with Gradient Edge Overlays */}
        <div className="space-y-4 py-2 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-16 sm:before:w-24 before:bg-gradient-to-r before:from-[#0f172a] before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-16 sm:after:w-24 after:bg-gradient-to-l after:from-[#0f172a] after:to-transparent after:z-10 overflow-hidden">
          {/* Row 1: Right to Left Infinite Auto-Scroll */}
          <div className="flex overflow-hidden group">
            <div className="flex space-x-4 animate-marquee-left pause-on-hover w-max">
              {[...row1Stack, ...row1Stack, ...row1Stack, ...row1Stack].map((tech, idx) => (
                <div
                  key={idx}
                  className="p-3 px-4 sm:px-5 bg-[#1e293b] border border-slate-800 hover:border-[#126972]/50 rounded-xl transition-all group flex items-center space-x-3 shadow-md shrink-0 cursor-default"
                >
                  <div className="p-2 bg-slate-900/80 rounded-lg shrink-0 group-hover:bg-[#023644]/50 transition-colors" aria-hidden="true">
                    {tech.icon}
                  </div>
                  <span className="font-bold text-slate-100 text-xs sm:text-sm group-hover:text-cyan-400 transition-colors whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Left to Right Infinite Auto-Scroll */}
          <div className="flex overflow-hidden group">
            <div className="flex space-x-4 animate-marquee-right pause-on-hover w-max">
              {[...row2Stack, ...row2Stack, ...row2Stack, ...row2Stack].map((tech, idx) => (
                <div
                  key={idx}
                  className="p-3 px-4 sm:px-5 bg-[#1e293b] border border-slate-800 hover:border-[#126972]/50 rounded-xl transition-all group flex items-center space-x-3 shadow-md shrink-0 cursor-default"
                >
                  <div className="p-2 bg-slate-900/80 rounded-lg shrink-0 group-hover:bg-[#023644]/50 transition-colors" aria-hidden="true">
                    {tech.icon}
                  </div>
                  <span className="font-bold text-slate-100 text-xs sm:text-sm group-hover:text-cyan-400 transition-colors whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 5. FEATURED CLIENT PROJECTS SHOWCASE */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4 }}
        className="space-y-8 z-10 relative"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="text-left space-y-2">
            <h2 className="text-xs font-bold text-[#22a0ad] tracking-wider uppercase">
              Portfolio Highlight
            </h2>
            <p className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100">
              Featured Client Projects
            </p>
          </div>

          <Link
            href="/projects"
            className="text-xs font-bold text-[#22a0ad] hover:text-cyan-300 flex items-center gap-1 uppercase tracking-wider"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </motion.section>

      {/* 6. DEVELOPMENT PROCESS */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4 }}
        className="space-y-8 z-10 relative"
      >
        <div className="text-left space-y-2">
          <h2 className="text-xs font-bold text-[#22a0ad] tracking-wider uppercase">
            Workflow
          </h2>
          <p className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100">
            Development Process
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 flex flex-col space-y-2.5">
            {workflowSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-4 border rounded-xl text-left transition-all flex items-center justify-between cursor-pointer ${activeStep === idx
                  ? "border-[#126972]/80 bg-[#023644]/60 text-[#22a0ad] font-semibold"
                  : "border-slate-800 bg-[#1e293b] text-slate-400 hover:text-slate-200"
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-slate-900 rounded-lg">
                    {step.icon}
                  </div>
                  <span className="font-bold text-sm">
                    {step.title.split(". ")[1]}
                  </span>
                </div>
                <span className="text-xs font-medium opacity-60">0{idx + 1}</span>
              </button>
            ))}
          </div>

          <div className="lg:col-span-7">
            <div className="bg-[#1e293b] p-6 sm:p-8 border border-slate-800 rounded-2xl h-full flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 text-[#22a0ad]">
                    {workflowSteps[activeStep].icon}
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Phase 0{activeStep + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100">
                    {workflowSteps[activeStep].title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                    {workflowSteps[activeStep].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 7. FINAL CONTACT FORM & TERMINAL (50/50 SPLIT) */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4 }}
        className="space-y-8 z-10 relative"
      >
        {/* Section Header (Outside above cards, matching all other sections) */}
        <div className="text-left space-y-2">
          <h2 className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
            Get In Touch
          </h2>
          <p className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100">
            Ready To Build Your <span className="text-cyan-400">Next Project?</span>
          </p>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
            Let&apos;s build scalable, high-speed digital solutions together. Reach out to discuss project details and technical requirements.
          </p>
        </div>

        {/* 50/50 Grid Split: Form on Left, Terminal on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Side: Contact Form Card (lg:col-span-6) */}
          <div className="lg:col-span-6 bg-[#1e293b] p-6 sm:p-8 border border-slate-800 rounded-2xl shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="home-contact-name" className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Your Name
                  </label>
                  <input
                    id="home-contact-name"
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-800 focus:border-[#126972] focus:ring-1 focus:ring-[#126972]/50 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="home-contact-email" className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Email Address
                  </label>
                  <input
                    id="home-contact-email"
                    type="email"
                    required
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-800 focus:border-[#126972] focus:ring-1 focus:ring-[#126972]/50 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Subject Dropdown */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="home-contact-category" className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Project Category
                </label>
                <select
                  id="home-contact-category"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-800 focus:border-[#126972] focus:ring-1 focus:ring-[#126972]/50 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 outline-none transition-all cursor-pointer"
                >
                  <option value="Full-Stack Application">Full-Stack Web Application (Next.js / Node.js)</option>
                  <option value="WordPress Theme or Plugin">WordPress Custom Theme or Plugin Architecture</option>
                  <option value="Webflow No-Code Project">Webflow Development &amp; Custom Code</option>
                  <option value="Database & API Engineering">Database Schema &amp; REST API Backend</option>
                  <option value="Other Consulting">Other Project / General Inquiry</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="home-contact-message" className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Project Details
                </label>
                <textarea
                  id="home-contact-message"
                  required
                  rows={4}
                  placeholder="Tell me about your project goals, required tech stack, timeline, or any questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-800 focus:border-[#126972] focus:ring-1 focus:ring-[#126972]/50 rounded-xl p-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition-all resize-none"
                />
              </div>

              {/* Submit Button & Status Alerts */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-[#126972] to-[#22a0ad] hover:from-[#18838f] hover:to-[#2bc0d0] text-white disabled:opacity-50 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Send Project Inquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {submitStatus === "success" && (
                <div className="p-3 bg-[#023644]/60 border border-[#126972]/40 rounded-xl text-[#22a0ad] text-xs font-semibold text-center">
                  ✓ Thank you! Your message has been sent successfully. I will get back to you shortly!
                </div>
              )}

              {/* Security & Response Guarantee Badges - Directly below submit button */}
              <div className="grid grid-cols-3 gap-2 pt-3.5 mt-3 border-t border-slate-800/80 text-center text-[11px] font-medium text-slate-400">
                <div className="flex items-center justify-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22a0ad] shrink-0" />
                  <span>100% Privacy</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <TrendingUp className="w-3.5 h-3.5 text-[#22a0ad] shrink-0" />
                  <span>Fast Response</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <Lock className="w-3.5 h-3.5 text-[#22a0ad] shrink-0" />
                  <span>No Spam</span>
                </div>
              </div>
            </form>
          </div>

          {/* Right Side: Interactive Contact Terminal Window Box (lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col h-full">
            <div className="bg-[#0b1329] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full font-mono text-xs text-slate-300">
              {/* Terminal Header Bar */}
              <div className="bg-[#0f172a] px-4 py-3 border-b border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#126972] inline-block" />
                </div>
                <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-[#22a0ad]" />
                  <span>contact-session.ts</span>
                </span>
                <span className="text-[10px] text-[#22a0ad] bg-[#023644]/50 px-2 py-0.5 rounded border border-[#126972]/40">
                  TypeScript
                </span>
              </div>

              {/* Terminal Code View */}
              <div className="p-4 sm:p-5 space-y-3 leading-relaxed flex-grow overflow-x-auto bg-[#070d1e]">
                <div className="text-slate-500 italic">{"// Developer Contact Config"}</div>
                <div>
                  <span className="text-purple-400">import</span> &#123; <span className="text-[#22a0ad]">Engineer</span> &#125; <span className="text-purple-400">from</span> <span className="text-amber-300">&quot;@arfan/core&quot;</span>;
                </div>
                <br />
                <div>
                  <span className="text-blue-400">export const</span> <span className="text-cyan-400">inquiryConfig</span> = &#123;
                </div>
                <div className="pl-4 space-y-1">
                  <div>
                    <span className="text-slate-400">developer:</span> <span className="text-amber-300">&quot;Arfan Ahmed&quot;</span>,
                  </div>
                  <div>
                    <span className="text-slate-400">role:</span> <span className="text-amber-300">&quot;Full-Stack Engineer &amp; WP Architect&quot;</span>,
                  </div>
                  <div>
                    <span className="text-slate-400">availability:</span> <span className="text-[#22a0ad]">&quot;Immediate / Open for Hire&quot;</span>,
                  </div>
                  <div>
                    <span className="text-slate-400">email:</span> <span className="text-sky-300">&quot;arfan18@cse.pstu.ac.bd&quot;</span>,
                  </div>
                  <div>
                    <span className="text-slate-400">whatsapp:</span> <span className="text-sky-300">&quot;+880 1615-391684&quot;</span>,
                  </div>
                  <div>
                    <span className="text-slate-400">location:</span> <span className="text-amber-300">&quot;Dhaka &amp; Patuakhali, Bangladesh&quot;</span>,
                  </div>
                  <div>
                    <span className="text-slate-400">avgResponseTime:</span> <span className="text-[#22a0ad]">&quot;&lt; 4 Hours&quot;</span>,
                  </div>
                  <div>
                    <span className="text-slate-400">preferredStack:</span> [
                  </div>
                  <div className="pl-4 text-amber-300">
                    &quot;Next.js&quot;, &quot;React&quot;, &quot;TypeScript&quot;, &quot;Node.js&quot;, &quot;WordPress&quot;, &quot;Webflow&quot;
                  </div>
                  <div>],</div>
                  <div>
                    <span className="text-slate-400">status:</span> <span className="text-[#22a0ad]">&quot;online&quot;</span>
                  </div>
                </div>
                <div>&#125;;</div>
                <br />
                <div className="text-slate-500 italic">{"// Server status: Live & Listening..."}</div>
              </div>

              {/* Terminal Footer Status Bar */}
              <div className="bg-[#0f172a] px-4 py-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#126972] animate-pulse" />
                  <span className="text-slate-300">Port 443 | SSL Secure</span>
                </div>
                <span className="text-slate-500">GMT+6 Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </article>
  );
}

