"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";
import * as analytics from "@/utils/analytics";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

interface FormFields {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactClient() {
  const [form, setForm] = useState<FormFields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tempErrors: FormErrors = {};
    if (!form.name.trim()) tempErrors.name = "Full name is required.";
    if (!form.email.trim()) {
      tempErrors.email = "Email address is required.";
    } else if (!validateEmail(form.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) tempErrors.message = "Message content is required.";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Message delivery failed.");
      }

      analytics.trackContactSubmission();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (error: unknown) {
      console.error("Transmission error:", error);
      setStatus("error");
      const message =
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try emailing directly.";
      setErrorMessage(message);
    }
  };

  const handleResetForm = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <article className="space-y-10">
      {/* Page Title Header */}
      <motion.section
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-3"
      >
        <div className="inline-flex items-center space-x-2 bg-[#023644]/50 border border-[#126972]/40 text-[#22a0ad] px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
          <span className="w-2 h-2 rounded-full bg-[#126972] animate-pulse" />
          <span>Get In Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-100">
          Let&apos;s Build Something Together
        </h1>
        <p className="text-slate-400 font-sans text-sm sm:text-base max-w-xl leading-relaxed">
          Have a project in mind, need a full-stack developer, or want to discuss WordPress architecture? Reach out via the form below or contact me directly.
        </p>
      </motion.section>

      {/* Split Layout */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-[#1e293b] p-6 sm:p-8 border border-slate-800 rounded-2xl shadow-sm">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-4 mb-6">
              <Send className="w-4 h-4 text-[#22a0ad]" />
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                Send a Message
              </h2>
            </div>

            {status === "success" ? (
              <div className="py-8 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-[#22a0ad] mx-auto" />
                <h3 className="text-lg font-bold text-slate-100">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. I have received your message and will respond within 24 hours.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleResetForm}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#126972] to-[#22a0ad] hover:from-[#18838f] hover:to-[#2bc0d0] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleInputChange}
                    disabled={status === "submitting"}
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className={`w-full bg-slate-900 border px-4 py-2.5 rounded-lg text-xs text-slate-100 outline-none transition-all ${errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-800 focus:border-[#126972]"
                      }`}
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleInputChange}
                    disabled={status === "submitting"}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className={`w-full bg-slate-900 border px-4 py-2.5 rounded-lg text-xs text-slate-100 outline-none transition-all ${errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-800 focus:border-[#126972]"
                      }`}
                    placeholder="name@company.com"
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Project Details / Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleInputChange}
                    disabled={status === "submitting"}
                    rows={5}
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    className={`w-full bg-slate-900 border px-4 py-2.5 rounded-lg text-xs text-slate-100 outline-none resize-none transition-all ${errors.message
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-800 focus:border-[#126972]"
                      }`}
                    placeholder="Describe your project, timeframe, and goals..."
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Error feedback */}
                {status === "error" && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-400 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Delivery Error</span>
                      {errorMessage}
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-3.5 bg-gradient-to-r from-[#126972] to-[#22a0ad] hover:from-[#18838f] hover:to-[#2bc0d0] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {status === "submitting" ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Side: Direct Contact Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#1e293b] p-6 border border-slate-800 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-3">
              Direct Contact Channels
            </h3>

            <div className="space-y-3">
              {/* Email */}
              <a
                href="mailto:arfan18@cse.pstu.ac.bd"
                className="flex items-center gap-3.5 p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-[#126972]/50 transition-all group"
              >
                <div className="p-2.5 bg-slate-800 rounded-lg text-[#22a0ad]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase block">Email Address</span>
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-[#22a0ad] transition-colors">
                    arfan18@cse.pstu.ac.bd
                  </span>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/arfan-ahmed-shohag"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-[#126972]/50 transition-all group"
              >
                <div className="p-2.5 bg-slate-800 rounded-lg text-[#22a0ad]">
                  <FaLinkedinIn className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase block">LinkedIn Profile</span>
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-[#22a0ad] transition-colors">
                    linkedin.com/in/arfan-ahmed40
                  </span>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/arfan-ahmed-shohag"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-[#126972]/50 transition-all group"
              >
                <div className="p-2.5 bg-slate-800 rounded-lg text-[#22a0ad]">
                  <FaGithub className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase block">GitHub Repository</span>
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-[#22a0ad] transition-colors">
                    github.com/asuselessbrain
                  </span>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/8801615391684"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-[#126972]/50 transition-all group"
              >
                <div className="p-2.5 bg-slate-800 rounded-lg text-[#22a0ad]">
                  <FaWhatsapp className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase block">WhatsApp / Phone</span>
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-[#22a0ad] transition-colors">
                    +880 1615-391684
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </article>
  );
}

