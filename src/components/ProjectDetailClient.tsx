"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Code2,
  Cpu,
  Database,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Layers,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Project } from "@/components/ProjectCard";
import ProjectCard from "@/components/ProjectCard";

interface ProjectDetailClientProps {
  project: Project;
  relatedProjects: Project[];
}

export default function ProjectDetailClient({
  project,
  relatedProjects,
}: ProjectDetailClientProps) {
  // Gallery images array (authentic project media)
  const defaultImages = [
    project.image || `/images/projects/${project.id}.webp`,
  ];
  const galleryImages =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : defaultImages;

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const deliverables = project.archDetails?.detailsList || [];

  return (
    <article className="space-y-12 max-w-7xl mx-auto py-4">

      {/* 2. SPLIT HERO SHOWCASE (LEFT: SCREENSHOT & GALLERY | RIGHT: TITLE, DESC, DELIVERABLES & CTAS) */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* LEFT COLUMN: MEDIA GALLERY SHOWCASE */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Screenshot Preview Container */}
          <div className="relative w-full aspect-[4/3] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl group">
            {/* Top Category Badge Overlay */}
            <div className="absolute top-3 left-3 z-20 bg-[#023644]/90 backdrop-blur-md text-cyan-400 border border-[#126972]/60 font-bold text-[10px] sm:text-xs uppercase tracking-wider px-3 py-1 rounded-md shadow-md capitalize">
              {project.category}
            </div>

            {/* Main Active Image */}
            <Image
              src={galleryImages[activeImageIndex] || galleryImages[0]}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover card-img-hover-scroll modal-img-hover transition-all duration-300"
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-40 pointer-events-none" />
          </div>

          {/* Thumbnails Row (if multiple gallery images exist) */}
          {galleryImages.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border transition-all cursor-pointer ${activeImageIndex === idx
                    ? "border-[#22a0ad] ring-2 ring-[#22a0ad]/40 opacity-100 scale-[1.02]"
                    : "border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600"
                    }`}
                >
                  <Image
                    src={imgUrl}
                    alt={`${project.title} View ${idx + 1}`}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: PROJECT METADATA, DELIVERABLES & CTAS */}
        <div className="lg:col-span-6 space-y-5">
          {/* Title and Category */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#22a0ad] uppercase tracking-widest block">
              {project.category} Case Study
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
              {project.title}
            </h1>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {project.desc}
          </p>

          {/* Real Deliverables / Key Features List */}
          {deliverables.length > 0 && (
            <div className="border-t border-slate-800/80 pt-4 space-y-2.5">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Key Features & Deliverables
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#22a0ad] shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Badges */}
          {project.tags && project.tags.length > 0 && (
            <div className="border-t border-slate-800/80 pt-3 space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Technologies Used
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium px-2.5 py-1 bg-slate-900/80 border border-slate-800 text-slate-300 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800/80">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[160px] py-3 px-5 bg-gradient-to-r from-[#126972] to-[#22a0ad] hover:from-[#18838f] hover:to-[#2bc0d0] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(18,105,114,0.4)] flex items-center justify-center gap-2"
              >
                <span>View Live Site</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.gitUrl && (
              <a
                href={project.gitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-5 bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <FaGithub className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}

            <Link
              href="/contact"
              className="py-3 px-5 bg-slate-900/60 border border-slate-800 hover:border-[#126972]/60 text-slate-300 hover:text-cyan-400 font-semibold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Contact Developer</span>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 3. CASE STUDY DEEP DIVE (PROBLEM, SOLUTION, RESULT & ARCHITECTURE) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-t border-slate-800/80 pt-10">
        {/* LEFT COLUMN: Problem / Solution / Result Breakdown */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-[#1e293b]/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>Case Study Overview</span>
            </h2>

            {(project.problem || project.solution || project.result) && (
              <div className="space-y-4">
                {project.problem && (
                  <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-xl space-y-1.5">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                      01. The Challenge & Problem Statement
                    </span>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                )}

                {project.solution && (
                  <div className="bg-[#023644]/40 border border-[#126972]/40 p-5 rounded-xl space-y-1.5">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                      02. Technical Architecture & Solution
                    </span>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                )}

                {project.result && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-xl space-y-1.5">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                      03. Measurable Impact & Business Outcome
                    </span>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {project.result}
                    </p>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>

        {/* RIGHT COLUMN: Full-Stack Architecture Specs & CTA */}
        <div className="space-y-6">
          <div className="bg-[#1e293b]/80 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-3">
              Technical Stack Breakdown
            </h3>

            <div className="space-y-3.5">
              {project.archDetails?.frontend && (
                <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Code2 className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Frontend Engine</span>
                  </div>
                  <p className="text-xs text-slate-300">{project.archDetails.frontend}</p>
                </div>
              )}

              {project.archDetails?.backend && (
                <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Cpu className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Backend Service</span>
                  </div>
                  <p className="text-xs text-slate-300">{project.archDetails.backend}</p>
                </div>
              )}

              {project.archDetails?.database && (
                <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Database className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Database & Storage</span>
                  </div>
                  <p className="text-xs text-slate-300">{project.archDetails.database}</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Box CTA */}
          <div className="bg-gradient-to-br from-[#023644] to-[#1e293b] border border-[#126972]/60 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-100">
              Need a custom full-stack system?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              I build custom production-grade web applications, Next.js frontends, and REST APIs.
            </p>
            <Link
              href="/contact"
              className="w-full py-3 bg-[#126972] hover:bg-[#18838f] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* 4. RELATED PROJECTS SECTION */}
      {relatedProjects && relatedProjects.length > 0 && (
        <section className="space-y-6 border-t border-slate-800/80 pt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-slate-100">
              Explore More Projects
            </h2>
            <Link
              href="/projects"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              View All Archive <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
