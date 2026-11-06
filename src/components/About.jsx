import React from 'react';
import { User, MapPin, GraduationCap, Sparkles, Lock, Zap, BookOpen, Users } from 'lucide-react';
import PopUp from './PopUp';

// ── Data ──────────────────────────────────────────────

const values = [
  {
    id: 1,
    Icon: Lock,
    title: 'Security First',
    description: 'Before I change a setting, I check what it does to security.',
  },
  {
    id: 2,
    Icon: Zap,
    title: 'Proactive',
    description: 'I patch vulnerabilities and review alerts before they turn into incidents.',
  },
  {
    id: 3,
    Icon: BookOpen,
    title: 'Always Learning',
    description: 'I work through TryHackMe rooms to keep up with new attack techniques.',
  },
  {
    id: 4,
    Icon: Users,
    title: 'Team-Oriented',
    description: 'I write down what I changed and why, so the next admin can follow it.',
  },
];

// ── Sub-components ─────────────────────────────────────

const ValueCard = ({ Icon, title, description }) => (
  <div className="group h-full flex flex-col rounded-none border border-[var(--card-border)] bg-[var(--card-bg)] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_var(--accent-glow)] hover:border-[var(--accent-1)]">
    <div
      className="mb-3 flex h-9 w-9 items-center justify-center rounded-none text-white"
      style={{ background: 'var(--accent-grad)' }}
    >
      <Icon size={16} />
    </div>
    <h3 className="text-[15px] font-bold text-white">{title}</h3>
    <p className="mt-1.5 text-[13px] leading-[1.7] text-white/50">{description}</p>
  </div>
);

// ── Main Component ─────────────────────────────────────

const About = () => {
  return (
    <section id="about" className="relative scroll-mt-20 md:scroll-mt-28 py-24 px-5 sm:px-6 md:px-10 lg:px-14" style={{ background: 'var(--color-surface)' }}>
      {/* Subtle top border line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--card-border)] to-transparent" />

      <div className="mx-auto max-w-4xl">

        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="section-label mx-auto w-fit">
            <User size={12} />
            About Me
          </div>
          <h2 className="text-4xl font-black tracking-[-0.03em] text-white sm:text-5xl" style={{ fontFamily: 'var(--font-head)' }}>
            Who I Am
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-[16px] leading-[1.8] text-white/50 text-center">
            IT administrator working in Microsoft 365 and Azure, mostly on identity and device security.
          </p>
        </div>

        {/* My Story Card — Centered */}
        <div className="rounded-none border border-[var(--card-border)] bg-[var(--input-bg)] p-8 shadow-[var(--shadow-md)]">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-none text-white"
              style={{ background: 'var(--accent-grad)' }}
            >
              <Sparkles size={17} />
            </span>
            <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-head)' }}>
              My Story
            </h3>
          </div>
          <p className="text-[15px] leading-[1.85] text-white/60">
            I'm <strong className="text-white font-bold">Jayasuriya</strong>, an IT Systems Administrator based in <strong className="text-white font-bold">Chennai, India</strong>. I got into IT because I wanted to know how networks and user accounts connect. Now I spend most of my time locking them down.
          </p>
          <p className="mt-4 text-[15px] leading-[1.85] text-white/60">
            My work is in the <strong className="text-white font-bold">Microsoft security stack</strong>. I configure Conditional Access and MFA in Entra ID, manage devices with Intune, watch for threats in Defender, and administer Exchange Online, Teams and SharePoint.
          </p>
          <p className="mt-4 text-[15px] leading-[1.85] text-white/60">
            My goal is to tighten security without making anyone's daily work harder.
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[var(--card-border)] pt-6">
            {[
              { value: '2+', label: 'Years in IT' },
              { value: '50+', label: 'Endpoints' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-head)', background: 'var(--accent-grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {value}
                </p>
                <p className="mt-1 text-[12px] font-semibold text-white/70">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Location & Education */}
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 rounded-none border border-[var(--card-border)] bg-[var(--card-bg)] p-4 shadow-[var(--shadow-xs)]">
            <MapPin size={18} className="text-[var(--accent-1)]" />
            <div>
              <p className="text-[12px] text-white/70">Location</p>
              <p className="text-[14px] font-bold text-white">Chennai, India</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-none border border-[var(--card-border)] bg-[var(--card-bg)] p-4 shadow-[var(--shadow-xs)]">
            <GraduationCap size={18} className="text-[var(--accent-1)]" />
            <div>
              <p className="text-[12px] text-white/70">Education</p>
              <p className="text-[14px] font-bold text-white">B.Tech Information Technology</p>
            </div>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="mt-8">
          <h3 className="mb-4 text-[13px] font-black uppercase tracking-[0.15em] text-white/80 text-center">Core Values</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {values.map((v, i) => (
              <PopUp key={v.id} delay={i * 150} className="h-full">
                <ValueCard {...v} />
              </PopUp>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
