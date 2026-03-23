"use client";

import { useEffect, useRef } from "react";
import { processSteps } from "@/data/portfolio";
import { ensureGsapPlugins, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || !pathRef.current || reducedMotion) return;
    ensureGsapPlugins();

    const length = pathRef.current.getTotalLength();
    pathRef.current.style.strokeDasharray = `${length}`;
    pathRef.current.style.strokeDashoffset = `${length}`;

    const ctx = gsap.context(() => {
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: true,
        },
      });

      gsap.from(".process-card", {
        y: 36,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-grid",
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-white/[10%] bg-[#06070d] py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <p className="text-[10px] uppercase tracking-[0.24em] text-white/[55%]">Process</p>
        <h2 className="mt-4 font-display text-5xl uppercase tracking-[-0.03em] text-white md:text-7xl">
          From concept
          <br />
          to scale
        </h2>
      </div>

      <div className="process-grid relative mx-auto mt-14 grid max-w-7xl gap-6 px-6 md:grid-cols-[140px_1fr] md:px-12">
        <div className="relative hidden md:block">
          <svg
            className="sticky top-28 h-[520px] w-full"
            viewBox="0 0 120 520"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              ref={pathRef}
              d="M60 10C60 60 20 80 20 130C20 180 100 190 100 260C100 330 22 340 22 410C22 460 60 480 60 510"
              stroke="url(#processStroke)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="processStroke" x1="60" y1="10" x2="60" y2="510" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f5f7ff" />
                <stop offset="1" stopColor="#606dff" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="space-y-5">
          {processSteps.map((step) => (
            <article
              key={step.id}
              className="process-card rounded-3xl border border-white/[14%] bg-black/[40%] p-6 backdrop-blur-xl md:p-8"
            >
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/[58%]">{step.id}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                {step.title}
              </h3>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/[72%] md:text-base">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

