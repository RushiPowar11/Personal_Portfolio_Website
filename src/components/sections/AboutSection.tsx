"use client";

import { useEffect, useRef } from "react";
import { experiences, profile } from "@/data/portfolio";
import { ensureGsapPlugins, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || reducedMotion) return;
    ensureGsapPlugins();

    const section = sectionRef.current;
    const track = trackRef.current;
    const layer = layerRef.current;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 24),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      if (layer) {
        gsap.to(layer, {
          yPercent: -22,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden border-t border-white/[10%] bg-neutral-950 py-28"
    >
      <div
        ref={layerRef}
        className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(124,132,255,0.16),transparent_45%)]"
      />

      <div className="mx-auto mb-14 flex w-full max-w-7xl items-end justify-between gap-8 px-6 md:px-12">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/[55%]">About</p>
          <h2 className="mt-4 font-display text-5xl uppercase tracking-[-0.03em] text-white md:text-7xl">
            Built in
            <br />
            <span className="text-white/[60%]">Production</span>
          </h2>
        </div>
        <p className="max-w-lg text-sm leading-relaxed text-white/[65%] md:text-base">
          {profile.name} designs AI systems that survive real traffic, real deadlines, and real
          integration complexity.
        </p>
      </div>

      <div
        ref={trackRef}
        className="relative z-10 flex w-max gap-6 px-6 pb-6 md:gap-8 md:px-12"
      >
        {experiences.map((experience) => (
          <article
            key={`${experience.company}-${experience.role}`}
            className="panel-card w-[90vw] max-w-[780px] flex-shrink-0 rounded-3xl border border-white/[15%] bg-black/[45%] p-8 backdrop-blur-xl md:w-[76vw] md:p-10"
          >
            <div className="flex flex-col gap-3 border-b border-white/[10%] pb-6">
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/[55%]">{experience.period}</p>
              <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                {experience.role}
              </h3>
              <p className="text-sm uppercase tracking-[0.2em] text-white/[60%]">
                {experience.company} · {experience.location}
              </p>
            </div>
            <ul className="mt-7 space-y-4">
              {experience.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/[78%] md:text-base">
                  <span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-white/[75%]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

