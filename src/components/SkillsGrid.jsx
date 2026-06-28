import { motion } from "framer-motion";
import { skillGroups } from "../data/skills";

export default function SkillsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {skillGroups.map((group, i) => (
        <motion.div
          key={group.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="interactive-lift glass rounded-xl p-5"
        >
          <span
            className="mono text-[11px] uppercase tracking-[0.16em]"
            style={{ color: "var(--accent-stream)" }}
          >
            {group.label}
          </span>
          <ul className="mt-3 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li
                key={item}
                className="rounded-lg px-3 py-1.5 text-[13px]"
                style={{
                  background: "var(--bg-surface-raised)",
                  border: "1px solid var(--border-hairline)",
                  color: "var(--text-primary)",
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
