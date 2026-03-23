import { Suspense } from "react";
import dynamic from "next/dynamic";
import SectionSkeleton from "@/components/sections/SectionSkeleton";

const HeroSection = dynamic(() => import("@/components/sections/HeroSection"), {
  suspense: true,
});
const AboutSection = dynamic(() => import("@/components/sections/AboutSection"), {
  suspense: true,
});
const WorkSection = dynamic(() => import("@/components/sections/WorkSection"), {
  suspense: true,
});
const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"), {
  suspense: true,
});
const ProcessSection = dynamic(() => import("@/components/sections/ProcessSection"), {
  suspense: true,
});
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), {
  suspense: true,
});

export default function HomePage() {
  return (
    <main id="main-content" className="relative overflow-x-clip bg-[hsl(var(--background))]">
      <Suspense fallback={<SectionSkeleton label="Hero" minHeight="min-h-screen" />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton label="About" />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton label="Work" />}>
        <WorkSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton label="Skills" />}>
        <SkillsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton label="Process" />}>
        <ProcessSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton label="Contact" />}>
        <ContactSection />
      </Suspense>
    </main>
  );
}
