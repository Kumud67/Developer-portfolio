import { useMemo } from "react";
import { motion } from "framer-motion";

const FLOWS = [
  {
    path: "M 24 62 C 150 24, 252 92, 366 54 S 520 40, 616 76",
    duration: 8.5,
    delay: 0,
    color: "var(--accent-stream)",
  },
  {
    path: "M 18 112 C 146 142, 226 70, 352 106 S 506 156, 622 118",
    duration: 10,
    delay: 1.4,
    color: "var(--accent-success)",
  },
  {
    path: "M 38 150 C 168 116, 262 178, 392 142 S 514 96, 606 132",
    duration: 9.2,
    delay: 2.2,
    color: "var(--accent-warn)",
  },
];

function Flow({ path, duration, delay, color }) {
  const pulses = useMemo(() => [0, 1], []);

  return (
    <g>
      <path d={path} fill="none" stroke={color} strokeOpacity="0.14" strokeWidth="1.5" />
      {pulses.map((pulse) => (
        <motion.circle
          key={pulse}
          r="4"
          fill={color}
          fillOpacity="0.72"
          filter="url(#soft-glow)"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          style={{ offsetPath: `path("${path}")` }}
          transition={{
            duration,
            delay: delay + pulse * (duration / 2),
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </g>
  );
}

export default function StreamHero() {
  return (
    <svg
      viewBox="0 0 640 200"
      className="h-full w-full"
      role="img"
      aria-label="Subtle animated visualization of data flowing through a distributed system"
    >
      <defs>
        <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="stream-field" cx="50%" cy="45%" r="70%">
          <stop offset="0%" stopColor="var(--accent-stream)" stopOpacity="0.12" />
          <stop offset="58%" stopColor="var(--accent-stream)" stopOpacity="0.035" />
          <stop offset="100%" stopColor="var(--accent-stream)" stopOpacity="0" />
        </radialGradient>
        <clipPath id="stream-clip">
          <rect x="0" y="0" width="640" height="200" rx="12" />
        </clipPath>
      </defs>
      <g clipPath="url(#stream-clip)">
        <rect width="640" height="200" fill="url(#stream-field)" />
        <path
          d="M 72 28 H 568 M 72 172 H 568"
          fill="none"
          stroke="var(--border-hairline)"
          strokeWidth="1"
          strokeOpacity="0.55"
        />
        {FLOWS.map((flow, i) => (
          <Flow key={i} {...flow} />
        ))}
      </g>
    </svg>
  );
}
