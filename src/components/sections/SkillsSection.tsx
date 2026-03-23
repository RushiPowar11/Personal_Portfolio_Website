"use client";

import { useEffect, useMemo, useRef } from "react";
import SkillSphereScene from "@/components/three/SkillSphereScene";
import { skillCounters, skillGroups } from "@/data/portfolio";
import { ensureGsapPlugins, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const counterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const reducedMotion = useReducedMotion();
  const words = useMemo(() => skillGroups.flatMap((group) => group.skills), []);

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;
    ensureGsapPlugins();

    const ctx = gsap.context(() => {
      counterRefs.current.forEach((node, index) => {
        if (!node) return;
        const target = skillCounters[index]?.value ?? 0;
        const record = { value: 0 };
        gsap.to(record, {
          value: target,
          duration: 1.45,
          ease: "power3.out",
          scrollTrigger: {
            trigger: node,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            node.textContent = `${Math.round(record.value)}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden border-t border-white/[10%] bg-neutral-950 py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <p className="text-[10px] uppercase tracking-[0.24em] text-white/[55%]">Skills</p>
        <h2 className="mt-4 font-display text-5xl uppercase tracking-[-0.03em] text-white md:text-7xl">
          Full stack
          <br />
          <span className="text-white/[62%]">AI execution</span>
        </h2>
      </div>

      <div className="relative mx-auto mt-10 grid max-w-7xl gap-8 px-6 md:grid-cols-[1fr_1fr] md:px-12">
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            {skillCounters.map((counter, index) => (
              <article
                key={counter.label}
                className="rounded-2xl border border-white/[15%] bg-black/[40%] p-5 backdrop-blur-xl"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/[55%]">{counter.label}</p>
                <p className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                  <span
                    ref={(element) => {
                      counterRefs.current[index] = element;
                    }}
                  >
                    {reducedMotion ? counter.value : 0}
                  </span>
                  {counter.suffix}
                </p>
              </article>
            ))}
          </div>

          <div className="grid gap-4">
            {skillGroups.map((group) => (
              <article
                key={group.title}
                className="rounded-2xl border border-white/[14%] bg-black/[35%] p-5 backdrop-blur-xl"
              >
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/[58%]">{group.title}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={`${group.title}-${skill}`}
                      className="rounded-full border border-white/[15%] bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white/[72%]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="relative min-h-[460px] overflow-hidden rounded-3xl border border-white/[15%] bg-black/[40%]">
          <SkillSphereScene words={words} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/[90%] to-transparent" />
        </div>
      </div>
    </section>
  );
}

