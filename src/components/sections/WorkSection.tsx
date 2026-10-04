"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { KeyboardEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { featuredProjects, profile, type ProjectItem } from "@/data/portfolio";
import { motionTransition } from "@/lib/motion-config";
import { useIntersectionReveal } from "@/hooks/useIntersectionReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";

const WorkEnergyScene = dynamic(() => import("@/components/three/WorkEnergyScene"), {
  ssr: false,
});

const springTransition = {
  type: "spring",
  stiffness: 200,
  damping: 26,
} as const;

function getRelativeIndex(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex;

  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;

  return offset;
}

function ProjectCard({
  project,
  isActive,
  reducedMotion,
}: {
  project: ProjectItem;
  isActive: boolean;
  reducedMotion: boolean;
}) {
  return (
    <>
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
        layout={!reducedMotion}
        className="relative z-10 mt-6 max-w-2xl text-sm leading-relaxed text-white/[74%] md:text-base"
      >
        {project.summary}
      </motion.p>

      <motion.div layout={!reducedMotion} className="relative z-10 mt-6 flex flex-wrap gap-2">
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
            initial={reducedMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
            transition={reducedMotion ? { duration: 0 } : motionTransition.fast}
            className="relative z-10 mt-8 overflow-hidden border-t border-white/[12%] pt-6"
          >
            {project.href ? (
              <Link
                href={project.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="magnetic"
                className="inline-flex items-center rounded-full border border-white/[30%] bg-white px-5 py-2 text-xs uppercase tracking-[0.2em] text-black transition-transform duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
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
    </>
  );
}

function MobileProjectList({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="relative z-10 mx-auto mt-12 max-w-7xl space-y-6 px-6 md:px-12">
      {featuredProjects.map((project) => (
        <article
          key={project.slug}
          className="group relative overflow-hidden rounded-3xl border border-white/[15%] bg-black/[55%] p-6 backdrop-blur-xl"
        >
          <ProjectCard project={project} isActive reducedMotion={reducedMotion} />
        </article>
      ))}
    </div>
  );
}

function OrbitalProjectWheel({ reducedMotion }: { reducedMotion: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = featuredProjects.length;

  const goToProject = (direction: 1 | -1) => {
    setActiveIndex((index) => (index + direction + total) % total);
  };

  const onDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const projectedOffset = info.offset.x + info.velocity.x * 0.15;
    const indexDelta = Math.round(projectedOffset / 140);

    if (indexDelta > 0) goToProject(-1);
    if (indexDelta < 0) goToProject(1);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToProject(-1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToProject(1);
    }
  };

  return (
    <div className="relative z-10 mx-auto mt-12 max-w-7xl px-6 md:px-12">
      <div className="mb-6 flex items-center justify-end gap-3">
        <button
          type="button"
          aria-label="Show previous project"
          onClick={() => goToProject(-1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[20%] bg-white/[5%] text-xl text-white transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Show next project"
          onClick={() => goToProject(1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[20%] bg-white/[5%] text-xl text-white transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          →
        </button>
      </div>

      <motion.div
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured projects"
        tabIndex={0}
        drag={reducedMotion ? false : "x"}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={onDragEnd}
        onKeyDown={onKeyDown}
        className="relative h-[620px] overflow-hidden rounded-[2rem] outline-none [perspective:1200px]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/[18%] to-transparent" />

        {featuredProjects.map((project, index) => {
          const offset = getRelativeIndex(index, activeIndex, total);
          const distance = Math.abs(offset);
          const isActive = offset === 0;
          const angle = offset * 25;
          const x = Math.sin((angle * Math.PI) / 180) * 470;
          const y = distance * 32;
          const rotateY = offset * -18;
          const rotateZ = offset * -3;
          const scale = isActive ? 1 : 0.85;
          const opacity = isActive ? 1 : distance > 2 ? 0 : 0.46;

          return (
            <motion.article
              key={project.slug}
              aria-current={isActive ? "true" : undefined}
              className="group absolute left-1/2 top-8 w-[min(680px,72vw)] -translate-x-1/2 overflow-hidden rounded-3xl border border-white/[15%] bg-black/[55%] p-6 backdrop-blur-xl"
              style={{
                zIndex: total - distance,
                pointerEvents: isActive ? "auto" : "none",
              }}
              animate={
                reducedMotion
                  ? {
                      opacity: isActive ? 1 : 0,
                      scale: 1,
                      x: "-50%",
                      y: 0,
                      rotateY: 0,
                      rotateZ: 0,
                      filter: "blur(0px)",
                    }
                  : {
                      opacity,
                      scale,
                      x: `calc(-50% + ${x}px)`,
                      y,
                      rotateY,
                      rotateZ,
                      filter: isActive ? "blur(0px)" : "blur(2px)",
                    }
              }
              transition={reducedMotion ? { duration: 0.12 } : springTransition}
            >
              <ProjectCard project={project} isActive={isActive} reducedMotion={reducedMotion} />
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function WorkSection() {
  const headingRef = useIntersectionReveal<HTMLDivElement>();
  const githubLink = profile.socials.find((item) => item.label === "GitHub");
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section id="work" className="cv-auto relative overflow-hidden border-t border-white/[10%] bg-[#07070b] py-28">
      <WorkEnergyScene />
      <div ref={headingRef} className="reveal-up mx-auto max-w-7xl px-6 md:px-12">
        <p className="text-[10px] uppercase tracking-[0.24em] text-white/[55%]">Work</p>
        <h2 className="mt-4 font-display text-5xl uppercase tracking-[-0.03em] text-white md:text-7xl">
          Systems
          <br />
          that ship
        </h2>
      </div>

      {isMobile ? (
        <MobileProjectList reducedMotion={reducedMotion} />
      ) : (
        <OrbitalProjectWheel reducedMotion={reducedMotion} />
      )}

      {githubLink ? (
        <div className="relative z-10 mx-auto mt-10 flex max-w-7xl justify-center px-6 md:px-12">
          <Link
            href={githubLink.href}
            target="_blank"
            rel="noreferrer"
            data-cursor="magnetic"
            className="inline-flex items-center rounded-full border border-white/[24%] bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-transform duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            More Projects
          </Link>
        </div>
      ) : null}
    </section>
  );
}
