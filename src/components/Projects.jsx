import React from 'react';
import { FolderOpen, Shield, Cloud, Key } from 'lucide-react';
import PopUp from './PopUp';

// ── Data ──────────────────────────────────────────────

const projects = [
  {
    id: 1,
    title: 'Microsoft 365 Tenant Hardening',
    category: 'Security & Compliance',
    description:
      'Comprehensive security hardening of an M365 tenant for a mid-sized organization — implemented Conditional Access policies, MFA enforcement, Secure Score improvements, and compliance baselines following Microsoft best practices.',
    tags: ['Entra ID', 'Conditional Access', 'MFA', 'Secure Score', 'Compliance'],
    Icon: Key,
    accentColor: 'var(--accent-1)',
    metrics: [
      { value: '87%', label: 'Secure Score' },
      { value: '15+', label: 'CA Policies' },
      { value: '0',   label: 'Breaches' },
    ],
  },
  {
    id: 2,
    title: 'Zero Trust Endpoint Management',
    category: 'Endpoint Security',
    description:
      'Deployed and configured Microsoft Intune for full MDM/MAM coverage across Windows, iOS, and Android devices. Implemented compliance policies, device configuration profiles, and automated remediation.',
    tags: ['Intune', 'MDM', 'MAM', 'Autopilot', 'Compliance'],
    Icon: Shield,
    accentColor: 'var(--accent-2)',
    metrics: [
      { value: '50+', label: 'Devices' },
      { value: '100%', label: 'Encrypted' },
      { value: '< 1h', label: 'Onboarding' },
    ],
  },
  {
    id: 3,
    title: 'Defender XDR Threat Response',
    category: 'Threat Detection',
    description:
      'Built a structured threat hunting and incident response workflow using Microsoft Defender XDR. Created custom KQL queries for proactive threat hunting, alert correlation rules, and automated response playbooks.',
    tags: ['Defender XDR', 'KQL', 'SIEM', 'Threat Hunting', 'IR Playbooks'],
    Icon: Cloud,
    accentColor: 'var(--accent-3)',
    metrics: [
      { value: '65%', label: 'Faster MTTD' },
      { value: '20+', label: 'KQL Queries' },
      { value: '8',   label: 'Playbooks' },
    ],
  },
];

// ── Sub-components ─────────────────────────────────────

const ProjectCard = ({ project }) => {
  const { title, category, description, tags, Icon, accentColor, metrics } = project;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-none border border-[var(--card-border)] bg-[var(--card-bg)] shadow-[var(--shadow-md)] transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_56px_var(--accent-glow)] hover:border-[var(--accent-1)]"
      style={{ transitionDuration: '400ms' }}
    >
      {/* Card Header — Professional dark banner with colored top border */}
      <div
        className="relative h-44 overflow-hidden p-6 flex flex-col justify-between border-b border-[var(--card-border)] bg-[var(--input-bg)]"
        style={{ borderTop: `4px solid ${accentColor}` }}
      >
        {/* Subtle noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            mixBlendMode: 'overlay',
          }}
        />

        <div className="relative flex items-start justify-between">
          <span className="rounded-none bg-[var(--card-bg)] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white/70 border border-[var(--card-border)]">
            {category}
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-none bg-[var(--card-bg)] text-white border border-[var(--card-border)]"
               style={{ color: accentColor }}>
            <Icon size={16} />
          </div>
        </div>

        <h3 className="relative text-xl font-black text-white leading-snug mt-4">
          {title}
        </h3>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[14px] leading-[1.75] text-white/60 flex-1">
          {description}
        </p>

        {/* Metrics */}
        <div className="mt-5 grid grid-cols-3 divide-x divide-[var(--card-border)] rounded-none border border-[var(--card-border)] bg-[var(--input-bg)] py-3">
          {metrics.map(({ value, label }) => (
            <div key={label} className="px-3 text-center">
              <p
                className="text-[18px] font-black text-white"
                style={{
                  fontFamily: 'var(--font-head)',
                }}
              >
                {value}
              </p>
              <p className="text-[11px] text-white/40 font-bold uppercase tracking-wider mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-none border border-[var(--card-border)] bg-[var(--input-bg)] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────

const Projects = () => {
  return (
    <section id="projects" className="relative scroll-mt-20 md:scroll-mt-28 py-24 px-5 sm:px-6 md:px-10 lg:px-14" style={{ background: 'var(--color-surface)' }}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--card-border)] to-transparent" />

      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="section-label mx-auto w-fit">
            <FolderOpen size={12} />
            Featured Projects
          </div>
          <h2 className="text-4xl font-black tracking-[-0.03em] text-white sm:text-5xl">
            What I've Built
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-[16px] leading-[1.8] text-white/50">
            Real-world implementations across identity security, endpoint management, and threat detection.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
          {projects.map((project, i) => (
            <PopUp key={project.id} delay={i * 150}>
              <ProjectCard project={project} />
            </PopUp>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
