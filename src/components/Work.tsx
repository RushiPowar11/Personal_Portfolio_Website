"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { DURATION, EASING } from "@/lib/motion";

const PROJECTS = [
  {
    id: 1,
    title: "Multi-Agent RAG System",
    category: "LLM · RAG · Multi-Agent",
    year: "2025",
    image: "https://images.unsplash.com/photo-1620825937374-87fc7d62828e?q=80&w=2000&auto=format&fit=crop",
    stack: ["Python", "LangChain", "OpenAI", "Vector DB"],
    impact: "Natural language querying of relational databases using multi-agent orchestration.",
    link: "https://github.com/RushiPowar11/Multi-Agent-RAG-System-for-Natural-Language-Querying-of-a-Relational-Database"
  },
  {
    id: 2,
    title: "Gut Health Coach AI",
    category: "LLM · RAG · Healthcare AI",
    year: "2025",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2000&auto=format&fit=crop",
    stack: ["Python", "LlamaIndex", "FastAPI"],
    impact: "Holistic health coach with safety checks and personalized guidance.",
    link: "https://github.com/RushiPowar11/Gut_health_coach_ai"
  },
  {
    id: 3,
    title: "Atomberg SoV Agent",
    category: "AI Agent · Market Intelligence",
    year: "2025",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2000&auto=format&fit=crop",
    stack: ["Python", "Agents", "Data Mining"],
    impact: "AI agent built for smart home brand Share of Voice analysis.",
    link: "https://github.com/RushiPowar11/Atomberg-SoV-Agent"
  },
  {
    id: 4,
    title: "Invock Chatbot",
    category: "LLM · WhatsApp API",
    year: "2025",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop",
    stack: ["Python", "WhatsApp API", "NLP"],
    impact: "Conversational AI chatbot integrated into WhatsApp for business automation.",
    link: "https://github.com/RushiPowar11/Invock-Chatbot-WhatsApp"
  },
  {
    id: 5,
    title: "Mini RAG Reranker",
    category: "Embeddings · Retrieval",
    year: "2025",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2000&auto=format&fit=crop",
    stack: ["Python", "Vector DB", "Cohere"],
    impact: "Lightweight RAG pipeline with reranking layer for precision improvement.",
    link: "https://github.com/RushiPowar11/Mini-RAG-Reranker-Sprint"
  },
  {
    id: 6,
    title: "No-Code Web Builder",
    category: "JavaScript · Web",
    year: "2025",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop",
    stack: ["JavaScript", "React", "Node.js"],
    impact: "Tool enabling non-developers to build web solutions intuitively.",
    link: "https://github.com/RushiPowar11/No-Code-Low-Code-web"
  },
];

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for perspective tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full h-[50vh] md:h-[60vh] rounded-2xl cursor-none group perspective-1000 mb-16 md:mb-24"
    >
      <motion.div 
        className="w-full h-full relative preserve-3d"
        animate={{ rotateX: isHovered ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of Card */}
        <div 
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden bg-accent"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end transform-style-3d">
            <motion.div style={{ translateZ: 30 }}>
              <div className="text-primary uppercase text-xs md:text-sm tracking-widest font-mono mb-4">
                {project.category}
              </div>
              <h3 className="text-3xl md:text-6xl font-display font-black tracking-tighter uppercase text-white">
                {project.title}
              </h3>
            </motion.div>
          </div>
        </div>

        {/* Back of Card */}
        <div 
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden bg-accent border border-primary/20 p-8 md:p-12 flex flex-col justify-center items-center text-center"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateX(180deg)"
          }}
        >
          <motion.div style={{ translateZ: 50 }} className="flex flex-col items-center">
            <h4 className="text-2xl md:text-4xl font-display font-black text-primary mb-6">{project.title}</h4>
            <p className="text-muted text-lg md:text-xl font-light mb-8 max-w-lg text-balance">
              {project.impact}
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {project.stack.map(tech => (
                <span key={tech} className="px-4 py-2 rounded-full bg-background border border-primary/30 text-xs font-mono text-primary/80">
                  {tech}
                </span>
              ))}
            </div>

            <a 
              href={project.link}
              target="_blank"
              rel="noreferrer"
              data-cursor="pointer"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform"
            >
              View on GitHub
            </a>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative min-h-screen bg-background px-6 md:px-12 lg:px-24 py-32 z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION, ease: EASING }}
          className="mb-24"
        >
          <h2 className="text-[10vw] md:text-[6vw] font-display font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-primary to-muted/20 leading-[0.8]">
            Featured
            <br />
            <span className="text-primary ml-[5vw]">Systems</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
          {PROJECTS.map((project, i) => (
            <div key={project.id} className={i % 2 === 1 ? "lg:mt-32" : ""}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}