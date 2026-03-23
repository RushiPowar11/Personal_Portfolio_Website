"use client";

import { FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ContactTotemScene from "@/components/three/ContactTotemScene";
import { profile } from "@/data/portfolio";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useIntersectionReveal } from "@/hooks/useIntersectionReveal";

function buildMailto(name: string, email: string, message: string) {
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`);
  return `mailto:${profile.email}?subject=${subject}&body=${body}`;
}

export default function ContactSection() {
  const headingRef = useIntersectionReveal<HTMLDivElement>();
  const magnetic = useMagnetic({ x: 0.22, y: 0.22 });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    const form = new FormData(target);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    if (!name || !email || !message) return;
    window.location.href = buildMailto(name, email, message);
    target.reset();
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/[10%] bg-black py-28">
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
        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-3xl border border-white/[14%] bg-black/[45%] p-6 backdrop-blur-xl md:p-8"
        >
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.22em] text-white/[55%]">Name</span>
            <input
              name="name"
              required
              className="mt-3 w-full rounded-2xl border border-white/[16%] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-white/[35%]"
            />
          </label>
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.22em] text-white/[55%]">Email</span>
            <input
              name="email"
              type="email"
              required
              className="mt-3 w-full rounded-2xl border border-white/[16%] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-white/[35%]"
            />
          </label>
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.22em] text-white/[55%]">Project brief</span>
            <textarea
              name="message"
              required
              rows={5}
              className="mt-3 w-full resize-none rounded-2xl border border-white/[16%] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-white/[35%]"
            />
          </label>

          <motion.button
            type="submit"
            ref={(node) => {
              magnetic.ref.current = node;
            }}
            onMouseMove={(event) => magnetic.onMove(event)}
            onMouseLeave={magnetic.onLeave}
            style={{ x: magnetic.x, y: magnetic.y }}
            data-cursor="magnetic"
            className="group inline-flex items-center rounded-full border border-white/[20%] bg-white px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-black"
          >
            Send message
            <span className="ml-3 inline-block h-1.5 w-1.5 rounded-full bg-black transition-transform duration-300 group-hover:scale-150" />
          </motion.button>
        </form>

        <aside className="space-y-4 rounded-3xl border border-white/[14%] bg-black/[45%] p-6 backdrop-blur-xl md:p-8">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/[55%]">Direct</p>
          <a
            href={`mailto:${profile.email}`}
            data-cursor="magnetic"
            className="block text-xl font-semibold tracking-tight text-white md:text-2xl"
          >
            {profile.email}
          </a>
          <p className="text-sm text-white/[72%]">{profile.phone}</p>
          <p className="text-sm text-white/[65%]">{profile.location}</p>

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
                  className="rounded-full border border-white/[20%] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/[78%] transition-colors hover:bg-white hover:text-black"
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

