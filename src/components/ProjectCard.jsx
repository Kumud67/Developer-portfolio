import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="interactive-lift group glass relative flex h-full flex-col justify-between overflow-hidden rounded-xl p-6"
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, var(--accent-stream-dim), transparent 70%)",
          }}
        />
        <div className="relative">
          <span
            className="mono text-[10.5px] uppercase tracking-[0.16em]"
            style={{ color: "var(--accent-stream)" }}
          >
            {project.eyebrow}
          </span>
          <h3 className="mt-2 text-xl font-bold leading-snug">{project.title}</h3>
          <p className="mt-3 text-[14px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {project.summary}
          </p>
        </div>

        <div className="relative mt-6">
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="mono rounded-md px-2 py-1 text-[11px]"
                style={{
                  background: "var(--bg-surface-raised)",
                  border: "1px solid var(--border-hairline)",
                  color: "var(--text-tertiary)",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="mono text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                {project.metric.value}
              </span>
              <span className="ml-1.5 text-[12px]" style={{ color: "var(--text-tertiary)" }}>
                {project.metric.label}
              </span>
            </div>
            <span
              className="flex items-center gap-1 text-[13px] font-medium transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: "var(--accent-stream)" }}
            >
              View case study <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
