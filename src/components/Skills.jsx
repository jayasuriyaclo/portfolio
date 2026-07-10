import React from 'react';
import { Cpu, LayoutGrid, ShieldCheck, Crosshair } from 'lucide-react';
import PopUp from './PopUp';

// ── Data ──────────────────────────────────────────────

const skillGroups = [
  {
    id: 1,
    category: 'Microsoft 365',
    Icon: LayoutGrid,
    skills: [
      { name: 'Exchange Online',   level: 5 },
      { name: 'Teams Admin',       level: 5 },
      { name: 'SharePoint',        level: 4 },
      { name: 'OneDrive',          level: 4 },
      { name: 'M365 Admin Center', level: 5 },
    ],
  },
  {
    id: 2,
    category: 'Identity & Security',
    Icon: ShieldCheck,
    skills: [
      { name: 'Entra ID (AAD)',     level: 5 },
      { name: 'Conditional Access', level: 4 },
      { name: 'MFA & SSPR',         level: 5 },
      { name: 'Privileged Identity',level: 4 },
      { name: 'Zero Trust',         level: 4 },
    ],
  },
  {
    id: 3,
    category: 'Threat Protection',
    Icon: Crosshair,
    skills: [
      { name: 'Defender for 365',      level: 5 },
      { name: 'Defender for Endpoint', level: 4 },
      { name: 'Threat Hunting',        level: 4 },
      { name: 'Alert Triage',          level: 5 },
      { name: 'SIEM Basics',           level: 3 },
    ],
  },
];

// level 1–5: how many filled dots out of 5

const toolBadges = [
  'PowerShell', 'Microsoft Graph', 'Azure CLI', 'Active Directory',
  'DNS / DHCP', 'Group Policy', 'ITSM / ServiceNow', 'KQL',
  'Windows Server', 'Hyper-V', 'Networking', 'VPN / Firewall',
];

// ── Label map ─────────────────────────────────────────
const levelLabel = { 5: 'Expert', 4: 'Advanced', 3: 'Proficient', 2: 'Familiar', 1: 'Learning' };
const labelColor  = {
  Expert:    'border-[var(--accent-1)] text-[var(--accent-1)] bg-[var(--accent-soft)]',
  Advanced:  'border-[var(--accent-3)] text-[var(--accent-3)] bg-[var(--accent-soft)]',
  Proficient:'border-[var(--accent-2)] text-[var(--accent-2)] bg-[var(--accent-soft)]',
  Familiar:  'border-[var(--card-border)] text-white/40',
  Learning:  'border-[var(--card-border)] text-white/30',
};

// ── Sub-components ─────────────────────────────────────

const SkillRow = ({ name, level }) => {
  const label = levelLabel[level];
  return (
    <div className="flex items-center justify-between gap-3 py-2.5 border-b border-[var(--card-border)] last:border-0">
      <span className="text-[13.5px] font-bold text-white/70">{name}</span>
      <span
        className={`rounded-none border px-2.5 py-0.5 text-[11px] font-black shrink-0 uppercase tracking-widest ${labelColor[label]}`}
      >
        {label}
      </span>
    </div>
  );
};

const SkillGroupCard = ({ category, Icon, skills }) => (
  <div className="group rounded-none border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-[var(--shadow-md)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_var(--accent-glow)] hover:border-[var(--accent-1)]">
    <div className="mb-5 flex items-center gap-3">
      <span
        className="flex h-10 w-10 items-center justify-center rounded-none text-white shadow-sm"
        style={{ background: 'var(--accent-grad)' }}
      >
        <Icon size={17} />
      </span>
      <h3 className="text-[17px] font-bold text-white">
        {category}
      </h3>
    </div>
    <div>
      {skills.map(({ name, level }) => (
        <SkillRow key={name} name={name} level={level} />
      ))}
    </div>
  </div>
);

// ── Main Component ─────────────────────────────────────

const Skills = () => {
  return (
    <section id="skills" className="relative scroll-mt-20 md:scroll-mt-28 py-24 px-5 sm:px-6 md:px-10 lg:px-14" style={{ background: 'var(--color-bg)' }}>
      {/* Subtle divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--card-border)] to-transparent" />

      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-14 flex flex-col items-center text-center">
          <div className="section-label mx-auto w-fit">
            <Cpu size={12} />
            Technical Skills
          </div>
          <h2 className="text-4xl font-black tracking-[-0.03em] text-white sm:text-5xl" style={{ fontFamily: 'var(--font-head)' }}>
            My Expertise
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-[16px] leading-[1.8] text-white/50 text-center">
            Proficiency across the Microsoft security ecosystem, built through hands-on experience and continuous learning.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3 relative z-10">
          {skillGroups.map((group, index) => (
            <PopUp key={group.id} delay={index * 150}>
              <SkillGroupCard {...group} />
            </PopUp>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
