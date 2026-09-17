"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard, { Project } from "@/components/ProjectCard";
import { FolderGit2 } from "lucide-react";
import {
  CategoryOption,
  fetchWordPressCategories,
  fetchWordPressProjects,
} from "@/lib/wordpress";

interface ProjectsClientProps {
  initialCategories?: CategoryOption[];
  initialProjects?: Project[];
}

const DEFAULT_CATEGORIES: CategoryOption[] = [
  { label: "All Projects", value: "all" },
  { label: "Full-Stack", value: "fullstack" },
  { label: "Frontend", value: "frontend" },
  { label: "WordPress", value: "wordpress" },
];

export default function ProjectsClient({
  initialCategories,
  initialProjects,
}: ProjectsClientProps) {
  const [filter, setFilter] = useState<string>("all");

  const [categories, setCategories] = useState<CategoryOption[]>(
    initialCategories && initialCategories.length > 0
      ? initialCategories
      : DEFAULT_CATEGORIES
  );

  const [projects, setProjects] = useState<Project[]>(
    initialProjects || []
  );

  const [isLoading, setIsLoading] = useState<boolean>(!initialProjects || initialProjects.length === 0);

  const loadData = async () => {
    try {
      const [fetchedCats, fetchedProjs] = await Promise.all([
        fetchWordPressCategories(),
        fetchWordPressProjects(),
      ]);

      if (fetchedCats && fetchedCats.length > 0) {
        setCategories(fetchedCats);
      }
      if (fetchedProjs) {
        setProjects(fetchedProjs);
      }
    } catch (err) {
      console.error("Failed to load WordPress project data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!initialProjects || initialProjects.length === 0) {
      loadData();
    }
  }, [initialProjects]);

  const handleFilterChange = (cat: string) => {
    setFilter(cat);
  };

  const normalizeCategory = (cat: string) =>
    cat.toLowerCase().replace(/[^a-z0-9]/g, "");

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => {
          const projCat = normalizeCategory(p.category);
          const targetCat = normalizeCategory(filter);
          return (
            projCat === targetCat ||
            projCat.includes(targetCat) ||
            targetCat.includes(projCat)
          );
        });

  return (
    <article className="space-y-10">
      {/* Page Header */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-3"
      >
        <div>
          <div className="inline-flex items-center space-x-2 bg-[#023644]/70 border border-[#126972]/60 text-cyan-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#126972] animate-pulse" />
            <span>Portfolio Archive</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-100">
          Projects & Case Studies
        </h1>
        <p className="text-slate-300 font-sans text-sm sm:text-base max-w-xl leading-relaxed">
          Explore client builds and production full-stack systems fetched dynamically from WordPress REST API. Filter by category to inspect architecture breakdowns and live demos.
        </p>
      </motion.section>

      {/* Filter Menu Bar */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-wrap gap-2 border-b border-slate-800 pb-5"
      >
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleFilterChange(cat.value)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all uppercase tracking-wide cursor-pointer ${
              filter === cat.value
                ? "border-[#126972]/80 text-cyan-400 bg-[#023644]/70 font-bold"
                : "border-slate-800 text-slate-300 hover:text-slate-100 hover:bg-slate-800"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </motion.section>

      {/* Projects Grid or Loading Skeleton */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="bg-[#1e293b] border border-slate-800 rounded-2xl overflow-hidden p-5 space-y-4 animate-pulse"
            >
              <div className="w-full aspect-video bg-slate-800 rounded-xl" />
              <div className="h-4 bg-slate-800 rounded w-1/3" />
              <div className="h-6 bg-slate-800 rounded w-3/4" />
              <div className="h-12 bg-slate-800 rounded w-full" />
            </div>
          ))}
        </div>
      ) : (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.section>
      )}

      {/* Empty State */}
      {!isLoading && filteredProjects.length === 0 && (
        <section className="text-center py-20 border border-dashed border-slate-800 rounded-2xl">
          <FolderGit2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-400">
            No projects found in this category.
          </p>
        </section>
      )}
    </article>
  );
}
