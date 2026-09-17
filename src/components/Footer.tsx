"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaFacebookF, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#0b1329] py-12 z-20 mt-auto">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        {/* Top 3-Column Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Column 1: Brand & Tagline (md:col-span-6) */}
          <div className="md:col-span-6 space-y-4">
            <Link href="/" className="inline-block group">
              <span className="text-xl font-black text-slate-100 tracking-tight flex items-center gap-1.5">
                <span className="text-[#22a0ad] font-mono text-lg">&lt;/&gt;</span>
                <span>Arfan<span className="text-[#22a0ad]">.dev</span></span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans max-w-md">
              Full Stack Web Developer &amp; MERN specialist passionate about creating high-performance web applications with Next.js, React and Node.js — plus custom WordPress solutions. Let&apos;s build something extraordinary together.
            </p>

            {/* Social Pill Links */}
            <div className="flex items-center space-x-2.5 pt-2">
              <a
                href="https://github.com/arfan-ahmed-shohag"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#1e293b] border border-slate-800 hover:border-[#126972] flex items-center justify-center text-slate-300 hover:text-[#22a0ad] transition-all hover:scale-105"
                title="GitHub Profile"
                aria-label="Arfan Ahmed on GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/arfan-ahmed-shohag"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#1e293b] border border-slate-800 hover:border-[#126972] flex items-center justify-center text-slate-300 hover:text-[#22a0ad] transition-all hover:scale-105"
                title="LinkedIn Profile"
                aria-label="Arfan Ahmed on LinkedIn"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/arfan.arfanahmed.73"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#1e293b] border border-slate-800 hover:border-[#126972] flex items-center justify-center text-slate-300 hover:text-[#22a0ad] transition-all hover:scale-105"
                title="Facebook Profile"
                aria-label="Arfan Ahmed on Facebook"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/8801615391684"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#1e293b] border border-slate-800 hover:border-[#126972] flex items-center justify-center text-slate-300 hover:text-[#22a0ad] transition-all hover:scale-105"
                title="WhatsApp Chat"
                aria-label="Chat with Arfan Ahmed on WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
              <a
                href="mailto:arfan18@cse.pstu.ac.bd"
                className="w-9 h-9 rounded-xl bg-[#1e293b] border border-slate-800 hover:border-[#126972] flex items-center justify-center text-slate-300 hover:text-[#22a0ad] transition-all hover:scale-105"
                title="Send Email"
                aria-label="Email Arfan Ahmed"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (md:col-span-3) */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider border-l-2 border-[#126972] pl-2.5">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <Link href="/" className="hover:text-[#22a0ad] transition-colors inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#22a0ad] transition-colors inline-block">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#22a0ad] transition-colors inline-block">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#22a0ad] transition-colors inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services (md:col-span-3) */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider border-l-2 border-[#126972] pl-2.5">
              Services
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li className="hover:text-slate-200 transition-colors">
                Full-Stack Web Development
              </li>
              <li className="hover:text-slate-200 transition-colors">
                WordPress Custom Themes &amp; Plugins
              </li>
              <li className="hover:text-slate-200 transition-colors">
                Webflow &amp; Headless CMS
              </li>
              <li className="hover:text-slate-200 transition-colors">
                Database &amp; API Architecture
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            Made with <span className="text-red-500">❤️</span> by <strong className="text-slate-200 font-bold">Arfan Ahmed</strong> — © {new Date().getFullYear()} All rights reserved.
          </div>

          <div className="inline-flex items-center space-x-2 bg-[#023644]/50 border border-[#126972]/40 text-[#22a0ad] px-3 py-1 rounded-full text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#126972] animate-pulse" />
            <span>AVAILABLE FOR HIRE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
