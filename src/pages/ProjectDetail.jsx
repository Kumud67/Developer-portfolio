import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, ArrowLeft, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "../components/BrandIcons";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import java from "react-syntax-highlighter/dist/esm/languages/prism/java";
import { getProjectBySlug } from "../data/projects";
import ArchitectureDiagram from "../components/ArchitectureDiagram";
import TopicDivider from "../components/TopicDivider";
import { useTheme } from "../context/ThemeContext";

SyntaxHighlighter.registerLanguage("java", java);

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const { theme } = useTheme();
  const project = getProjectBySlug(slug);

  if (!project) return <Navigate to="/" replace />;

  return (
    <main className="px-6 pb-24 pt-32">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link
            to="/#projects"
            className="mb-6 inline-flex items-center gap-2 text-[13px]"
            style={{ color: "var(--text-secondary)" }}
          >
            <ArrowLeft size={14} /> All projects
          </Link>

          <span
            className="mono text-[12px] uppercase tracking-[0.18em]"
            style={{ color: "var(--accent-stream)" }}
          >
            {project.eyebrow}
          </span>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{project.title}</h1>
          <p className="mt-4 text-[16.5px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {project.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="mono rounded-lg px-3 py-1.5 text-[12.5px]"
                style={{
                  background: "var(--bg-surface-raised)",
                  border: "1px solid var(--border-hairline)",
                  color: "var(--text-secondary)",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="glass flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-medium transition-transform hover:scale-105"
            >
              <GithubIcon size={16} /> View code
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-semibold transition-transform hover:scale-105"
                style={{ background: "var(--accent-stream)", color: "#0a0a0c" }}
              >
                <ExternalLink size={16} /> Live demo
              </a>
            )}
            <div
              className="glass flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px]"
              style={{ color: "var(--text-tertiary)" }}
            >
              <span className="mono font-bold" style={{ color: "var(--text-primary)" }}>
                {project.metric.value}
              </span>
              {project.metric.label}
            </div>
          </div>
        </motion.div>
      </div>

      <TopicDivider label="problem" />

      <div className="mx-auto max-w-3xl py-10">
        <motion.div {...fadeUp}>
          <h2 className="text-2xl font-bold">The problem</h2>
          <p className="mt-4 text-[15.5px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {project.problem}
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="mt-10">
          <h2 className="text-2xl font-bold">The solution</h2>
          <p className="mt-4 text-[15.5px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {project.solution}
          </p>
        </motion.div>
      </div>

      <TopicDivider label="architecture" />

      <div className="mx-auto max-w-4xl py-10">
        <motion.div {...fadeUp} className="mb-6">
          <h2 className="text-2xl font-bold">System architecture</h2>
          <p className="mt-2 text-[14.5px]" style={{ color: "var(--text-secondary)" }}>
            High-level data flow through the system.
          </p>
        </motion.div>
        <motion.div {...fadeUp}>
          <ArchitectureDiagram stages={project.architecture} />
        </motion.div>
      </div>

      <TopicDivider label="features" />

      <div className="mx-auto max-w-3xl py-10">
        <motion.div {...fadeUp}>
          <h2 className="text-2xl font-bold">Key features</h2>
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {project.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[14.5px]" style={{ color: "var(--text-primary)" }}>
                <CheckCircle2 size={17} className="mt-0.5 shrink-0" style={{ color: "var(--accent-success)" }} />
                {f}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <TopicDivider label="design decisions" />

      <div className="mx-auto max-w-3xl py-10">
        <motion.div {...fadeUp} className="mb-6">
          <h2 className="text-2xl font-bold">Tradeoffs &amp; decisions</h2>
        </motion.div>
        <div className="space-y-5">
          {project.decisions.map((d, i) => (
            <motion.div key={i} {...fadeUp} className="glass rounded-2xl p-6">
              <h3 className="text-[16px] font-semibold" style={{ color: "var(--accent-stream)" }}>
                {d.title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {d.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <TopicDivider label="code" />

      <div className="mx-auto max-w-3xl py-10">
        <motion.div {...fadeUp}>
          <h2 className="text-2xl font-bold">A look at the code</h2>
          <div className="mt-5 overflow-hidden rounded-2xl" style={{ border: "1px solid var(--border-hairline)" }}>
            <div
              className="mono flex items-center justify-between px-4 py-2.5 text-[12px]"
              style={{ background: "var(--bg-surface-raised)", color: "var(--text-tertiary)" }}
            >
              {project.codeSnippet.label}
              <span>{project.codeSnippet.language}</span>
            </div>
            <SyntaxHighlighter
              language={project.codeSnippet.language}
              style={theme === "dark" ? oneDark : oneLight}
              customStyle={{ margin: 0, padding: "20px", fontSize: "13px", background: "var(--bg-surface)" }}
            >
              {project.codeSnippet.code}
            </SyntaxHighlighter>
          </div>
        </motion.div>
      </div>

      <div className="mx-auto max-w-3xl py-6 text-center">
        <Link
          to="/#projects"
          className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-medium"
        >
          <ArrowLeft size={14} /> Back to all projects
        </Link>
      </div>
    </main>
  );
}
