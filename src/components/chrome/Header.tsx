"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { profile } from "@/data/portfolio";
import { motionTransition } from "@/lib/motion-config";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Process", href: "#process" },
  { label: profile.resume.label, href: profile.resume.href, external: true },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <motion.header
      initial={{ y: -36, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={motionTransition.base}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5"
    >
      <nav
        aria-label="Primary"
        className="pointer-events-auto flex w-full max-w-7xl items-center justify-between rounded-full border border-white/[10%] bg-black/[45%] px-3 py-2 backdrop-blur-xl"
      >
        <Link
          href="#home"
          data-cursor="magnetic"
          className="rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/[90%] transition-colors hover:text-white"
        >
          {profile.name}
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                download={profile.resume.downloadName}
                target="_blank"
                rel="noreferrer"
                data-cursor="magnetic"
                className="rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-white/[65%] transition-all hover:bg-white/[10%] hover:text-white"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                data-cursor="magnetic"
                className="rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-white/[65%] transition-all hover:bg-white/[10%] hover:text-white"
              >
                {link.label}
              </Link>
            )
          ))}
        </div>
        <Link
          href={profile.socials[0].href}
          target="_blank"
          rel="noreferrer"
          data-cursor="magnetic"
          className="rounded-full border border-white/[20%] bg-white/[5%] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
        >
          LinkedIn
        </Link>
      </nav>
    </motion.header>
  );
}

