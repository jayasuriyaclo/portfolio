import React from 'react';
import {
  ShieldCheck,
  Cloud,
  KeyRound,
  Download,
  Mail,
  ArrowRight,
  LayoutGrid,
  Sparkles,
} from 'lucide-react';
import SecurityAnalysisWidget from './SecurityAnalysisWidget';

// ── Data ──────────────────────────────────────────────

const capabilities = [
  {
    id: 1,
    title: 'Identity Security',
    description: 'Microsoft Entra ID, conditional access policies, MFA hardening, and Zero Trust principles.',
    Icon: KeyRound,
    borderColors: 'from-[#ff4b17] via-[#f000d0] to-[#ff4b17]'
  },
  {
    id: 2,
    title: 'Cloud Administration',
    description: 'Azure governance, endpoint management, secure baseline configurations and compliance.',
    Icon: Cloud,
    borderColors: 'from-[#23c100] via-[#8400ff] to-[#23c100]'
  },
  {
    id: 3,
    title: 'Threat Protection',
    description: 'Microsoft Defender monitoring, alert triage, threat hunting and incident response.',
    Icon: ShieldCheck,
    borderColors: 'from-[#8400ff] via-[#ff4b17] to-[#8400ff]'
  },
];

const adminSuiteSkills = [
  'Exchange Online', 'Teams', 'SharePoint',
  'OneDrive', 'Intune', 'Entra ID', 'Defender',
];

// ── Sub-components ────────────────────────────────────

const CapabilityCard = ({ title, description, Icon, borderColors }) => (
  <div className="group relative rounded-[24px] p-[2px] transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(99,102,241,0.13)]">
    {/* Animated gradient border wrapper */}
    <div
      className={`absolute inset-0 bg-[length:300%_300%] bg-gradient-to-r ${borderColors || 'from-blue-400 via-indigo-500 to-blue-400'} opacity-[0.15] transition-opacity duration-500 group-hover:opacity-100 rounded-[24px]`}
      style={{ animation: 'gradientShift 6s ease infinite' }}
    />

    <div
      className="relative h-full overflow-hidden rounded-[22px] border border-[var(--card-border)] bg-[var(--card-bg)] p-5 transition-all duration-400"
    >
      {/* Subtle hover gradient background */}
      <div className="absolute inset-0 rounded-[22px] bg-gradient-to-br from-[var(--accent-glow)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

      <span
        className="relative flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-sm"
        style={{ background: 'var(--accent-grad)' }}
      >
        <Icon size={18} />
      </span>
      <h2
        className="relative mt-4 text-[19px] font-bold leading-snug text-white"
      >
        {title}
      </h2>
      <p className="relative mt-2.5 text-[14px] leading-[1.7] text-white/60">{description}</p>
    </div>
  </div>
);

import { trackEvent } from '../utils/analytics';

const HeroButtons = () => (
  <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
    <a
      href="#projects"
      onClick={() => trackEvent("CTA", "Click", "View Projects Hero")}
      id="hero-view-projects"
      className="group inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(99,102,241,0.35)]"
      style={{ background: 'var(--accent-grad)' }}
    >
      View Projects
      <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
    </a>

    <a
      href="#contact"
      onClick={() => trackEvent("CTA", "Click", "Contact Me Hero")}
      id="hero-contact"
      className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--card-border)] bg-transparent px-6 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-1)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent-1)]"
    >
      <Mail size={16} className="mr-2" />
      Contact Me
    </a>

  </div>
);

const ProfileCard = () => (
  <div className="relative mx-auto flex w-full max-w-[480px] items-center justify-center" style={{ animation: 'fadeInUp 1s ease forwards' }}>
    <div className="relative w-full rounded-none border border-[var(--card-border)] bg-[var(--card-bg)] p-3.5 shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_var(--accent-glow)] hover:border-[var(--accent-1)]">
      <div className="overflow-hidden rounded-none bg-[var(--card-bg)] border border-[var(--card-border)]">

        {/* Image Section */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-surface)]">
          {/* Accent glow behind the transparent cutout */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 45%, var(--accent-glow) 0%, transparent 70%)' }}
          />
          <img
            src="/jayasuriya_prof.webp"
            alt="Jayasuriya portrait"
            className="relative h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
            style={{ objectPosition: '50% 0%', transformOrigin: '50% 100%' }}
          />
        </div>

        {/* Skills Section */}
        <div className="border-t border-[var(--card-border)] p-5">
          <div className="rounded-none border border-[var(--card-border)] bg-[var(--input-bg)] p-4 shadow-[4px_4px_0px_var(--card-border)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--accent-1)]">
                  Microsoft 365
                </p>
                <h3 className="mt-1.5 text-xl font-bold tracking-[-0.03em] text-white" style={{ fontFamily: 'var(--font-head)' }}>
                  Core Admin Suite
                </h3>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none text-white border border-[var(--accent-1)]" style={{ background: 'var(--accent-soft)' }}>
                <LayoutGrid size={17} color="var(--accent-1)" />
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {adminSuiteSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-none px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest transition-colors hover:bg-[var(--accent-1)] hover:text-white"
                  style={{
                    border: '1px solid var(--card-border)',
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ── Main Component ─────────────────────────────────────

const HomeHero = () => {
  return (
    <section
      id="home"
      className="relative scroll-mt-20 md:scroll-mt-28 overflow-hidden px-5 pb-20 pt-28 sm:px-6 md:px-10 md:pb-28 md:pt-36 lg:px-14 lg:pt-40"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Background decoration blobs */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, var(--accent-1) 0%, transparent 70%)',
          animation: 'blobFloat1 18s ease-in-out infinite',
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, var(--accent-3) 0%, transparent 70%)',
          animation: 'blobFloat2 22s ease-in-out infinite',
        }}
      />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)] lg:gap-24">

        {/* Left Column */}
        <div className="relative w-full max-w-xl min-w-0" style={{ animation: 'fadeInUp 0.8s ease forwards' }}>

          {/* Marquee Role label */}
          <div className="mt-5 overflow-hidden whitespace-nowrap border-y border-[var(--card-border)] py-2 mb-6">
            <div className="animate-marquee inline-flex gap-8">
              {[...Array(6)].map((_, i) => (
                <p
                  key={i}
                  className="text-[12px] font-bold uppercase tracking-[0.25em]"
                  style={{ color: 'var(--accent-1)' }}
                >
                  IT Systems Administrator •
                </p>
              ))}
            </div>
          </div>

          {/* Main Heading — single clean line */}
          <h1
            className="text-[2.8rem] sm:text-[3.2rem] font-black leading-[1.1] tracking-tight text-white lg:text-[4rem]"
          >
            Hi, I'm{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'var(--accent-grad)' }}
            >
              Jayasuriya
            </span>
          </h1>

          {/* Tagline */}
          <p className="mt-6 text-[1.1rem] font-semibold leading-[1.7] text-white/80">
            I run{' '}
            <span className="text-white">Microsoft 365</span>,{' '}
            <span className="text-white">Azure</span> and{' '}
            <span className="text-white">Entra ID</span>, with a focus on security.
          </p>

          {/* Description */}
          <p className="mt-3 text-[0.95rem] leading-[1.75] text-white/50">
            I set up Conditional Access and MFA in Entra ID, keep devices compliant in Intune, and work through alerts in Defender.
          </p>

          <HeroButtons />

          {/* Stat row */}
          <div className="mt-10 flex flex-wrap gap-5 sm:gap-10 border-t border-[var(--card-border)] pt-7">
            {[
              { value: '2+', label: 'Years Experience' },
              { value: '50+', label: 'Endpoints Managed' },
              { value: '100%', label: 'Uptime Focus' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p
                  className="text-2xl font-black tracking-tight text-white"
                >
                  {value}
                </p>
                <p className="mt-0.5 text-[12px] font-medium text-white/40">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Profile Card */}
        <ProfileCard />
      </div>

      {/* Capability Cards — full width row below */}
      <div
        className="relative mx-auto mt-12 max-w-7xl"
        style={{ animation: 'fadeInUp 0.9s 0.3s ease both' }}
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {capabilities.map((capability) => (
            <CapabilityCard key={capability.id} {...capability} />
          ))}
        </div>
      </div>

      {/* Dynamic Security Widget */}
      <div className="relative mx-auto mt-4 max-w-7xl px-5 sm:px-6 md:px-10 lg:px-14">
        <SecurityAnalysisWidget />
      </div>
    </section>
  );
};

export default HomeHero;