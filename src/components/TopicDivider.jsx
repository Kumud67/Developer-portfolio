// Signature structural device: a section divider styled like a Kafka topic's
// offset timeline, with a small tick label. Used consistently between sections.
export default function TopicDivider({ label }) {
  return (
    <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-6 py-2">
      {label && (
        <span
          className="mono shrink-0 text-[11px] uppercase tracking-[0.18em]"
          style={{ color: "var(--text-tertiary)" }}
        >
          {label}
        </span>
      )}
      <div className="topic-line flex-1" />
    </div>
  );
}
