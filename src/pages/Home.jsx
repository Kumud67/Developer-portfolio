import { useState } from "react";
import { motion } from "framer-motion";
import { FileDown, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/BrandIcons";
import StreamHero from "../components/StreamHero";
import TopicDivider from "../components/TopicDivider";
import SkillsGrid from "../components/SkillsGrid";
import ExperienceTimeline from "../components/ExperienceTimeline";
import ProjectCard from "../components/ProjectCard";
import { profile } from "../data/profile";
import { projects } from "../data/projects";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

export default function Home() {
  return (
    <main>
      {/* ===================== HERO ===================== */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24">
        <div className="hero-ribbons pointer-events-none" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, var(--accent-stream-dim), transparent)",
          }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto w-full max-w-3xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mono inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px]"
            style={{
              background: "var(--bg-glass)",
              border: "1px solid var(--border-hairline-strong)",
              color: "var(--accent-success)",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent-success)" }} />
            open to backend engineering roles
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl"
          >
            <span className="animated-gradient-text">{profile.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-lg font-medium sm:text-xl"
            style={{ color: "var(--accent-stream)" }}
          >
            {profile.title} <span style={{ color: "var(--text-tertiary)" }}>·</span>{" "}
            {profile.tags.join(" · ")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href={profile.links.resume}
              download
              className="flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-semibold transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--accent-stream)", color: "#0a0a0c" }}
            >
              <FileDown size={16} /> Resume
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="glass flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-medium transition-transform hover:-translate-y-0.5"
            >
              <GithubIcon size={16} /> GitHub
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="glass flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-medium transition-transform hover:-translate-y-0.5"
            >
              <LinkedinIcon size={16} /> LinkedIn
            </a>
            <a
              href="#contact"
              className="glass flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-medium transition-transform hover:-translate-y-0.5"
            >
              <Mail size={16} /> Contact
            </a>
          </motion.div>
        </motion.div>

        {/* Live event-stream visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass relative z-10 mx-auto mt-14 w-full max-w-3xl rounded-xl p-2"
        >
          <StreamHero />
        </motion.div>
      </section>

      <TopicDivider label="offset 00142" />

      {/* ===================== ABOUT ===================== */}
      <section id="about" className="section-flow relative overflow-hidden py-20">
        <motion.div {...fadeUp} className="relative z-10 mx-auto max-w-3xl px-6">
          <span className="mono text-[12px] uppercase tracking-[0.18em]" style={{ color: "var(--accent-stream)" }}>
            About
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">A bit about how I work</h2>
          <p className="mt-5 text-[16.5px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {profile.about}
          </p>
          <div className="mt-5 flex items-center gap-2 text-[14px]" style={{ color: "var(--text-tertiary)" }}>
            <MapPin size={15} /> {profile.location}
          </div>
        </motion.div>
      </section>

      <TopicDivider label="offset 00287" />

      {/* ===================== SKILLS ===================== */}
      <section id="skills" className="section-flow section-flow-alt relative overflow-hidden py-20">
        <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-10">
          <span className="mono text-[12px] uppercase tracking-[0.18em]" style={{ color: "var(--accent-stream)" }}>
            Skills
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">What I build with</h2>
        </motion.div>
        <SkillsGrid />
        </div>
      </section>

      <TopicDivider label="offset 00351" />

      {/* ===================== EXPERIENCE ===================== */}
      <section id="experience" className="section-flow relative overflow-hidden py-20">
        <div className="relative z-10 mx-auto max-w-4xl px-6">
        <motion.div {...fadeUp} className="mb-10">
          <span className="mono text-[12px] uppercase tracking-[0.18em]" style={{ color: "var(--accent-stream)" }}>
            Experience
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Where I've shipped</h2>
        </motion.div>
        <ExperienceTimeline />
        </div>
      </section>

      <TopicDivider label="offset 00498" />

      {/* ===================== PROJECTS ===================== */}
      <section id="projects" className="section-flow section-flow-alt relative overflow-hidden py-20">
        <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div {...fadeUp} className="mb-10">
          <span className="mono text-[12px] uppercase tracking-[0.18em]" style={{ color: "var(--accent-stream)" }}>
            Projects
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Selected case studies</h2>
          <p className="mt-3 max-w-2xl text-[15px]" style={{ color: "var(--text-secondary)" }}>
            Each project below includes the problem, the architecture, the tradeoffs I made, and why.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
        </div>
      </section>

      <TopicDivider label="offset 00612" />

      {/* ===================== EDUCATION ===================== */}
      <section id="education" className="section-flow relative overflow-hidden py-20">
        <div className="relative z-10 mx-auto max-w-3xl px-6">
        <motion.div {...fadeUp} className="interactive-lift glass rounded-xl p-7">
          <span className="mono text-[12px] uppercase tracking-[0.18em]" style={{ color: "var(--accent-stream)" }}>
            Education
          </span>
          <h3 className="mt-3 text-xl font-bold">{profile.education.degree}</h3>
          <p className="mt-1" style={{ color: "var(--text-secondary)" }}>
            {profile.education.school} · Class of {profile.education.year}
          </p>
        </motion.div>
        </div>
      </section>

      <TopicDivider label="offset 00734" />

      {/* ===================== CONTACT ===================== */}
      <ContactSection />
    </main>
  );
}

function ContactSection() {
  const [status, setStatus] = useState("idle");

  return (
    <section id="contact" className="section-flow section-flow-alt relative overflow-hidden py-20">
      <div className="relative z-10 mx-auto max-w-3xl px-6">
      <motion.div {...fadeUp} className="text-center">
        <span className="mono text-[12px] uppercase tracking-[0.18em]" style={{ color: "var(--accent-stream)" }}>
          Contact
        </span>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Let's talk backend systems</h2>
        <p className="mx-auto mt-3 max-w-xl text-[15px]" style={{ color: "var(--text-secondary)" }}>
          Open to backend engineering opportunities. Reach out directly or send a quick message below.
        </p>
      </motion.div>

      <motion.div {...fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-6">
        <a href={`mailto:${profile.email}`} className="flex items-center gap-2 text-[14.5px] hover:underline">
          <Mail size={16} style={{ color: "var(--accent-stream)" }} /> {profile.email}
        </a>
        <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[14.5px] hover:underline">
          <LinkedinIcon size={16} style={{ color: "var(--accent-stream)" }} /> LinkedIn
        </a>
        <a href={profile.links.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[14.5px] hover:underline">
          <GithubIcon size={16} style={{ color: "var(--accent-stream)" }} /> GitHub
        </a>
      </motion.div>

      <motion.form
        {...fadeUp}
        name="contact"
        method="POST"
        data-netlify="true"
        onSubmit={() => {
          setStatus("sent");
        }}
        className="glass mt-10 rounded-xl p-7"
      >
        {/* Netlify Forms detection field */}
        <input type="hidden" name="form-name" value="contact" />

        {status === "sent" ? (
          <p className="py-6 text-center text-[15px]" style={{ color: "var(--accent-success)" }}>
            Message sent — thanks for reaching out. I'll reply soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              required
              name="name"
              placeholder="Your name"
              className="control-field rounded-lg px-4 py-3 text-[14px] outline-none"
              style={{
                background: "var(--bg-surface-raised)",
                border: "1px solid var(--border-hairline)",
                color: "var(--text-primary)",
              }}
            />
            <input
              required
              type="email"
              name="email"
              placeholder="Your email"
              className="control-field rounded-lg px-4 py-3 text-[14px] outline-none"
              style={{
                background: "var(--bg-surface-raised)",
                border: "1px solid var(--border-hairline)",
                color: "var(--text-primary)",
              }}
            />
            <textarea
              required
              name="message"
              placeholder="Message"
              rows={4}
              className="control-field col-span-1 rounded-lg px-4 py-3 text-[14px] outline-none sm:col-span-2"
              style={{
                background: "var(--bg-surface-raised)",
                border: "1px solid var(--border-hairline)",
                color: "var(--text-primary)",
              }}
            />
            <button
              type="submit"
              className="col-span-1 rounded-lg py-3 text-[14px] font-semibold transition-transform hover:-translate-y-0.5 sm:col-span-2"
              style={{ background: "var(--accent-stream)", color: "#0a0a0c" }}
            >
              Send message
            </button>
          </div>
        )}
      </motion.form>
      </div>
    </section>
  );
}
