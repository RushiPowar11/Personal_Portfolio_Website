"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WorkEnergyScene from "@/components/three/WorkEnergyScene";
import { featuredProjects, profile } from "@/data/portfolio";
import { motionTransition } from "@/lib/motion-config";
import { useIntersectionReveal } from "@/hooks/useIntersectionReveal";

export default function WorkSection() {
  const [activeSlug, setActiveSlug] = useState<string | null>(featuredProjects[0]?.slug ?? null);
  const headingRef = useIntersectionReveal<HTMLDivElement>();
  const githubLink = profile.socials.find((item) => item.label === "GitHub");

  return (
    <section id="work" className="relative overflow-hidden border-t border-white/[10%] bg-[#07070b] py-28">
      <WorkEnergyScene />
      <div ref={headingRef} className="reveal-up mx-auto max-w-7xl px-6 md:px-12">
        <p className="text-[10px] uppercase tracking-[0.24em] text-white/[55%]">Work</p>
        <h2 className="mt-4 font-display text-5xl uppercase tracking-[-0.03em] text-white md:text-7xl">
          Systems
          <br />
          that ship
        </h2>
      </div>

      <div className="relative z-10 mx-auto mt-12 grid max-w-7xl gap-5 px-6 md:grid-cols-2 md:px-12">
        {featuredProjects.map((project) => {
          const isActive = activeSlug === project.slug;

          return (
            <motion.article
              key={project.slug}
              layout
              onMouseEnter={() => setActiveSlug(project.slug)}
              className="group relative overflow-hidden rounded-3xl border border-white/[15%] bg-black/[55%] p-6 backdrop-blur-xl"
              animate={{
                scale: isActive ? 1 : 0.97,
                borderColor: isActive ? "rgba(255,255,255,0.36)" : "rgba(255,255,255,0.14)",
              }}
              transition={motionTransition.base}
            >
              <div
                className="pointer-events-none absolute -right-14 -top-12 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_70%)] transition-opacity duration-700 group-hover:opacity-100"
                style={{ opacity: isActive ? 1 : 0.45 }}
              />

              <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/[55%]">{project.category}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/[65%]">{project.impact}</p>
                </div>
                <span className="rounded-full border border-white/[20%] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/[70%]">
                  {project.stack.length} Tech
                </span>
              </div>

              <motion.p
                layout
                className="relative z-10 mt-6 max-w-2xl text-sm leading-relaxed text-white/[74%] md:text-base"
              >
                {project.summary}
              </motion.p>

              <motion.div layout className="relative z-10 mt-6 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={`${project.slug}-${item}`}
                    className="rounded-full border border-white/[15%] bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/[70%]"
                  >
                    {item}
                  </span>
                ))}
              </motion.div>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    key="expanded"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={motionTransition.fast}
                    className="relative z-10 mt-8 overflow-hidden border-t border-white/[12%] pt-6"
                  >
                    {project.href ? (
                      <Link
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="magnetic"
                        className="inline-flex items-center rounded-full border border-white/[30%] bg-white px-5 py-2 text-xs uppercase tracking-[0.2em] text-black transition-transform duration-300 hover:scale-[1.03]"
                      >
                        View Case Repository
                      </Link>
                    ) : (
                      <p className="text-xs uppercase tracking-[0.2em] text-white/[65%]">
                        Private enterprise system
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>

      {githubLink ? (
        <div className="relative z-10 mx-auto mt-10 flex max-w-7xl justify-center px-6 md:px-12">
          <Link
            href={githubLink.href}
            target="_blank"
            rel="noreferrer"
            data-cursor="magnetic"
            className="inline-flex items-center rounded-full border border-white/[24%] bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-transform duration-300 hover:scale-[1.03]"
          >
            More Projects
          </Link>
        </div>
      ) : null}
    </section>
  );
}

