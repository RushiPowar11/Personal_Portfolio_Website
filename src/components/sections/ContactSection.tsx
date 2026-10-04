"use client";

import { FormEvent, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { profile } from "@/data/portfolio";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useIntersectionReveal } from "@/hooks/useIntersectionReveal";

const ContactTotemScene = dynamic(() => import("@/components/three/ContactTotemScene"), {
  ssr: false,
});

type SubmitState = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const headingRef = useIntersectionReveal<HTMLDivElement>();
  const magnetic = useMagnetic({ x: 0.22, y: 0.22 });
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    const form = new FormData(target);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    setError("");

    if (!name || !email || !message) {
      setSubmitState("error");
      setError("Please complete all fields before sending.");
      return;
    }

    setSubmitState("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Could not send your message.");
      }

      setSubmitState("success");
      target.reset();
    } catch (sendError) {
      setSubmitState("error");
      setError(
        sendError instanceof Error
          ? sendError.message
          : "Could not send your message. Please try again.",
      );
    }
  };

  return (
    <section id="contact" className="cv-auto relative overflow-hidden border-t border-white/[10%] bg-black py-28">
      <ContactTotemScene />

      <div ref={headingRef} className="reveal-up relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <p className="text-[10px] uppercase tracking-[0.24em] text-white/[55%]">Contact</p>
        <h2 className="mt-4 font-display text-5xl uppercase tracking-[-0.03em] text-white md:text-7xl">
          Build the
          <br />
          next system
        </h2>
      </div>

      <div className="relative z-10 mx-auto mt-12 grid max-w-7xl gap-6 px-6 md:grid-cols-[1fr_1fr] md:px-12">
        {submitState === "success" ? (
          <div
            role="status"
            aria-live="polite"
            className="rounded-3xl border border-white/[14%] bg-black/[45%] p-6 backdrop-blur-xl md:p-8"
          >
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/[55%]">Message sent</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">
              Thanks. I will reply soon.
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/[70%]">
              Your message reached my inbox. For anything urgent, you can still email me directly.
            </p>
            <a
              href={`mailto:${profile.email}`}
              data-cursor="magnetic"
              className="mt-8 inline-flex rounded-full border border-white/[20%] bg-white/[5%] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Email directly
            </a>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            className="space-y-4 rounded-3xl border border-white/[14%] bg-black/[45%] p-6 backdrop-blur-xl md:p-8"
          >
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.22em] text-white/[55%]">Name</span>
              <input
                name="name"
                autoComplete="name"
                aria-invalid={submitState === "error" && Boolean(error)}
                className="mt-3 w-full rounded-2xl border border-white/[16%] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-white/[35%] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              />
            </label>
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.22em] text-white/[55%]">Email</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={submitState === "error" && Boolean(error)}
                className="mt-3 w-full rounded-2xl border border-white/[16%] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-white/[35%] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              />
            </label>
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.22em] text-white/[55%]">Project brief</span>
              <textarea
                name="message"
                rows={5}
                aria-invalid={submitState === "error" && Boolean(error)}
                className="mt-3 w-full resize-none rounded-2xl border border-white/[16%] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-white/[35%] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              />
            </label>

            {error ? (
              <p role="alert" className="text-sm leading-relaxed text-red-200">
                {error}
              </p>
            ) : null}

            <motion.button
              type="submit"
              disabled={submitState === "loading"}
              ref={(node) => {
                magnetic.ref.current = node;
              }}
              onMouseMove={(event) => magnetic.onMove(event)}
              onMouseLeave={magnetic.onLeave}
              style={{ x: magnetic.x, y: magnetic.y }}
              data-cursor="magnetic"
              className="group inline-flex items-center rounded-full border border-white/[20%] bg-white px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-black transition-opacity disabled:cursor-not-allowed disabled:opacity-65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {submitState === "loading" ? (
                <>
                  <span className="mr-3 h-3 w-3 animate-spin rounded-full border-2 border-black/25 border-t-black" />
                  Sending
                </>
              ) : (
                <>
                  Send message
                  <span className="ml-3 inline-block h-1.5 w-1.5 rounded-full bg-black transition-transform duration-300 group-hover:scale-150" />
                </>
              )}
            </motion.button>
          </form>
        )}

        <aside className="space-y-4 rounded-3xl border border-white/[14%] bg-black/[45%] p-6 backdrop-blur-xl md:p-8">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/[55%]">Direct</p>
          <a
            href={`mailto:${profile.email}`}
            data-cursor="magnetic"
            className="block text-xl font-semibold tracking-tight text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:text-2xl"
          >
            {profile.email}
          </a>
          <p className="text-sm text-white/[72%]">{profile.phone}</p>
          <p className="text-sm text-white/[65%]">{profile.location}</p>
          <a
            href={profile.resume.href}
            download={profile.resume.downloadName}
            target="_blank"
            rel="noreferrer"
            data-cursor="magnetic"
            className="inline-flex rounded-full border border-white/[20%] bg-white/[5%] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {profile.resume.label}
          </a>

          <div className="pt-4">
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/[55%]">Elsewhere</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {profile.socials.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="magnetic"
                  className="rounded-full border border-white/[20%] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/[78%] transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
