import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="px-6 py-10">
      <div
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row"
        style={{ borderColor: "var(--border-hairline)" }}
      >
        <p className="mono text-[12px]" style={{ color: "var(--text-tertiary)" }}>
          © {new Date().getFullYear()} {profile.name} — built with React &amp; Tailwind
        </p>
        <div className="flex items-center gap-4">
          <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GithubIcon size={18} style={{ color: "var(--text-secondary)" }} />
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedinIcon size={18} style={{ color: "var(--text-secondary)" }} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <Mail size={18} style={{ color: "var(--text-secondary)" }} />
          </a>
        </div>
      </div>
    </footer>
  );
}
