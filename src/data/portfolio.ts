export type SocialLink = {
  label: string;
  href: string;
};

export type ResumeLink = {
  label: string;
  href: string;
  downloadName: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
};

export type ProjectItem = {
  slug: string;
  name: string;
  category: string;
  impact: string;
  stack: string[];
  summary: string;
  href?: string;
};

export type SkillGroup = {
  title: string;
  skills: string[];
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export const profile = {
  name: "Rushikesh Powar",
  headline: "GEN AI Fullstack Engineer · Creative Technologist",
  roleLine: [
    "GenAI Engineer",
    "Agentic Systems Builder",
    "RAG Architect",
    "Fullstack Engineer",
  ],
  intro:
    "I design and ship AI-native products that combine system rigor with cinematic interfaces.",
  summary:
    "2+ years building production GenAI systems with FastAPI, LangChain, RAG, and multi-agent orchestration.",
  email: "rushikeshpowar90@gmail.com",
  phone: "+91-9049776924",
  location: "Pune, India",
  resume: {
    label: "Resume",
    href: "https://drive.google.com/uc?export=download&id=1ENSQCAJkIDpNPXk0vJ4Xc7cYRu_8flq1",
    downloadName: "Rushikesh-Powar-Resume.pdf",
  } satisfies ResumeLink,
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rushikeshpowar/",
    },
    {
      label: "GitHub",
      href: "https://github.com/RushiPowar11",
    },
  ] satisfies SocialLink[],
};

export const experiences: ExperienceItem[] = [
  {
    company: "Thunder Marketing Corp",
    role: "Software Engineer",
    location: "United States · Remote",
    period: "Sep 2025 - Present",
    highlights: [
      "Engineered ServiceRank: FastAPI + MongoDB intelligence platform aggregating 8+ sources, reducing manual collection by 95%.",
      "Orchestrated async scraping across 113+ endpoints via Apify and Crawl4AI, processing 1,000+ reviews per business.",
      "Built Gemini-powered scoring pipeline to normalize unstructured review data into 0-100 sentiment and risk flags.",
      "Deployed Streamlit profiles generated in under 10 minutes with automated deduplication and analysis.",
    ],
  },
  {
    company: "Thunder Marketing Corp",
    role: "Software Engineer",
    location: "United States · Remote",
    period: "Sep 2025 - Present",
    highlights: [
      "Built a multi-tenant CMS powering 14+ sports sites, cutting manual content creation by 80%.",
      "Designed MongoDB-backed recovery workflows with 99% reliability across 60+ complex data models.",
      "Integrated OpenAI + Gemini pipelines processing thousands of RSS feeds for automated article generation.",
      "Optimized media operations for 600MB+ uploads and live match tracking under high concurrent traffic.",
    ],
  },
  {
    company: "MiniOrange Security Software Solutions",
    role: "Software Engineer Intern (GenAI / Fullstack)",
    location: "Pune, India",
    period: "Sep 2024 - Mar 2025",
    highlights: [
      "Designed RAG workflows with LangChain for secure enterprise knowledge retrieval.",
      "Implemented cloud deployments in Azure OpenAI and GCP Vertex AI with performance monitoring.",
      "Built and secured .NET Core APIs with API Key, Basic Auth, and JWT authentication.",
      "Improved API performance by 15% through query optimization and caching strategies.",
    ],
  },
];

export const featuredProjects: ProjectItem[] = [
  {
    slug: "service-rank",
    name: "ServiceRank Intelligence Platform",
    category: "AI Data Platform",
    impact: "95% manual effort reduction",
    summary:
      "Cross-source business intelligence platform with AI scoring, sentiment modeling, and real-time profile generation.",
    stack: ["FastAPI", "MongoDB", "Apify", "Crawl4AI", "Gemini", "Streamlit"],
  },
  {
    slug: "cms-automation",
    name: "Multi-Tenant Sports CMS",
    category: "Publishing Infrastructure",
    impact: "14+ sites in production",
    summary:
      "AI-automated CMS architecture with resilient jobs, high-throughput feed processing, and live match media pipelines.",
    stack: ["Node.js", "React", "MongoDB", "OpenAI", "Gemini"],
  },
  {
    slug: "dnn-rest-plugin",
    name: "DNN REST API Plugin",
    category: "Enterprise API",
    impact: "15% faster API response",
    summary:
      "Production APIs for external integration with robust auth modes and performance optimization.",
    stack: [".NET Core", "DNN", "MSSQL", "JavaScript", "REST API"],
  },
  {
    slug: "multi-agent-rag",
    name: "Multi-Agent RAG Framework",
    category: "Agentic AI",
    impact: "Faster NL-to-SQL orchestration",
    summary:
      "Autonomous multi-step agentic system translating natural-language requests into executable database operations.",
    stack: ["LangChain", "FAISS", "OpenAI", "Python"],
    href: "https://github.com/RushiPowar11/Multi-Agent-RAG-System-for-Natural-Language-Querying-of-a-Relational-Database",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "GenAI & LLM",
    skills: [
      "LangChain",
      "LangGraph",
      "RAG Architectures",
      "Prompt Engineering",
      "LLM Chaining",
      "OpenAI APIs",
      "Gemini AI studio, Vertex AI,",
      "MCP servers, Hugging Face",
    ],
  },
  {
    title: "Backend Systems",
    skills: [
      "Python",
      "Java",
      "FastAPI",
      "Node.js",
      ".NET Core",
      "REST API",
      "Microservices",
    ],
  },
  {
    title: "Data & Infra",
    skills: [
      "MongoDB",
      "PostgreSQL",
      "Pinecone",
      "FAISS",
      "Docker",
      "CI/CD",
    ],
  },
  {
    title: "Frontend & Product",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
];

export const skillCounters = [
  { label: "Years Building", value: 2, suffix: "+" },
  { label: "Production Systems", value: 20, suffix: "+" },
  { label: "AI Workflows", value: 30, suffix: "+" },
  { label: "Integrated Endpoints", value: 113, suffix: "+" },
];

export const processSteps: ProcessStep[] = [
  {
    id: "01",
    title: "Architect",
    description:
      "Translate product intent into resilient system boundaries, data contracts, and execution paths.",
  },
  {
    id: "02",
    title: "Prototype",
    description:
      "Validate interaction language and model behavior quickly with measurable constraints.",
  },
  {
    id: "03",
    title: "Operationalize",
    description:
      "Ship type-safe production pipelines with observability, fallbacks, and incident recovery.",
  },
  {
    id: "04",
    title: "Scale",
    description:
      "Tune throughput, latency, and cost with continuous monitoring and iterative optimization.",
  },
];
