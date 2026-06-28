import { motion } from "framer-motion";
import { experience } from "../data/experience";

export default function ExperienceTimeline() {
  return (
    <div className="space-y-10">
      {experience.map((job) => (
        <div key={job.company} className="interactive-lift glass rounded-xl p-6 sm:p-8">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <div className="mono text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                {job.status === "current" ? (
                  <span style={{ color: "var(--accent-success)" }}>● ACTIVE</span>
                ) : (
                  <span>○ ENDED</span>
                )}
                {"  "}
                [{job.period}]
              </div>
              <h3 className="mt-1 text-2xl font-bold">{job.company}</h3>
              <p style={{ color: "var(--text-secondary)" }}>{job.role}</p>
            </div>
          </div>

          <div className="space-y-6">
            {job.engagements.map((eng) => (
              <div key={eng.client}>
                <div
                  className="mono mb-2 text-[12px]"
                  style={{ color: "var(--accent-stream)" }}
                >
                  client: {eng.client}
                </div>
                <ul className="space-y-2">
                  {eng.bullets.map((bullet, bi) => (
                    <motion.li
                      key={bi}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ duration: 0.4, delay: bi * 0.05 }}
                      className="flex gap-3 text-[14.5px] leading-relaxed"
                      style={{ color: "var(--text-primary)" }}
                    >
                      <span className="mono mt-0.5 shrink-0" style={{ color: "var(--text-tertiary)" }}>
                        →
                      </span>
                      <span>{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
