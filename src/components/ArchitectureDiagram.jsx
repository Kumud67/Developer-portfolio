import { motion } from "framer-motion";

// Renders a vertical (mobile) / horizontal (desktop) pipeline of architecture
// stages with an animated flowing pulse between each — used on project detail
// pages to visually communicate system design at a glance.
export default function ArchitectureDiagram({ stages = [] }) {
  return (
    <div
      className="glass rounded-2xl p-6 sm:p-10"
      role="img"
      aria-label={`System architecture: ${stages.join(" leads to ")}`}
    >
      <div className="flex flex-col items-stretch gap-0 sm:flex-row sm:items-center sm:justify-between">
        {stages.map((stage, i) => (
          <div key={stage} className="flex flex-1 flex-col items-center sm:flex-row">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex w-full flex-col items-center gap-2 rounded-xl px-4 py-5 text-center sm:w-auto sm:min-w-[140px]"
              style={{
                background: "var(--bg-surface-raised)",
                border: "1px solid var(--border-hairline)",
              }}
            >
              <span
                className="mono text-[10px] uppercase tracking-wider"
                style={{ color: "var(--text-tertiary)" }}
              >
                stage {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {stage}
              </span>
            </motion.div>

            {i < stages.length - 1 && (
              <div className="flex h-10 items-center justify-center sm:h-auto sm:flex-1 sm:px-2">
                {/* connector: vertical on mobile, horizontal on desktop */}
                <div
                  className="relative h-full w-px sm:h-px sm:w-full"
                  style={{ background: "var(--border-hairline-strong)" }}
                >
                  <motion.div
                    className="absolute h-2 w-2 rounded-full sm:h-2 sm:w-2"
                    style={{
                      background: "var(--accent-stream)",
                      left: "50%",
                      marginLeft: "-4px",
                    }}
                    animate={{
                      top: ["0%", "100%"],
                    }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
