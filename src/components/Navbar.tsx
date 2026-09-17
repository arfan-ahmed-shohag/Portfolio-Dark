"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Send, Code2 } from "lucide-react";
import * as analytics from "@/utils/analytics";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b ${
        scrolled
          ? "bg-[#0f172a]/90 backdrop-blur-md py-3.5 border-slate-800/80 shadow-md"
          : "bg-transparent py-5 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={handleNavClick}
          className="flex items-center space-x-2 font-bold tracking-tight text-lg md:text-xl group"
        >
          <Code2 className="w-5 h-5 text-[#126972]" />
          <span className="text-slate-100 font-extrabold">
            Arfan<span className="text-cyan-400">.dev</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all relative ${
                  isActive ? "text-cyan-400 font-semibold" : "text-slate-400 hover:text-slate-100"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#126972] to-cyan-400 rounded-full" />
                )}
              </Link>
            );
          })}

          {/* Connect With Me Button */}
          <div className="flex items-center border-l border-slate-800 pl-6">
            <a
              href="https://wa.me/8801615391684"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-[#126972]/60 text-cyan-400 hover:bg-[#023644]/40 hover:border-[#126972] text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Connect With Me</span>
            </a>
          </div>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div className="fixed inset-0 top-[60px] bg-[#0f172a]/95 backdrop-blur-xl z-40 border-t border-slate-800 flex flex-col p-6 md:hidden">
          <nav className="flex flex-col space-y-4 mt-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={handleNavClick}
                  className={`text-base font-semibold border-b border-slate-800/60 pb-3 transition-colors ${
                    isActive ? "text-cyan-400 font-bold" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-800">
            <a
              href="https://wa.me/8801615391684"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavClick}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#126972] to-[#22a0ad] hover:from-[#18838f] hover:to-[#2bc0d0] text-white font-bold text-xs text-center uppercase tracking-wide flex items-center justify-center gap-2 shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Connect With Me</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

