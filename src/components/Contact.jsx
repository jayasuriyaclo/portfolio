import React, { useState } from 'react';
import { Mail, MapPin, Send, MessageSquare, CheckCircle } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiTryhackme } from 'react-icons/si';
import { trackEvent } from '../utils/analytics';

// ── Data ──────────────────────────────────────────────

const socialLinks = [
  {
    id: 1,
    label: 'LinkedIn',
    icon: FaLinkedin,
    href: 'https://www.linkedin.com/in/jayasuriya-j/',
    color: 'hover:bg-[#0077b5] hover:!text-white hover:border-[#0077b5]',
  },
  {
    id: 2,
    label: 'TryHackMe',
    icon: SiTryhackme,
    href: 'https://tryhackme.com/p/Jayasuriya',
    color: 'hover:bg-[#212C42] hover:!text-white hover:border-[#212C42]',
  },
  {
    id: 3,
    label: 'Email',
    icon: Mail,
    href: 'mailto:jayasuriya03096@gmail.com',
    color: 'hover:bg-[var(--accent-1)] hover:!text-white hover:border-[var(--accent-1)]',
  },
];

// ── Main Component ─────────────────────────────────────

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    trackEvent("Contact", "Submit", "Contact Form");

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'c0e1f2ea-4a57-4aa3-839b-c1af9e61d7d2',
          name: form.name,
          email: form.email,
          subject: `New Portfolio Message: ${form.subject || form.name}`,
          message: `Subject: ${form.subject}\n\n${form.message}`,
          from_name: form.name
        })
      });

      if (response.ok) {
        setSubmittedName(form.name.trim().split(' ')[0] || 'there');
        setSubmitted(true);
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        alert('Failed to send message. Please try again or use the direct email link.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Network error. Please try again or use the direct email link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden scroll-mt-20 md:scroll-mt-28 py-24 px-5 sm:px-6 md:px-10 lg:px-14" style={{ background: 'var(--color-bg)' }}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--card-border)] to-transparent" />

      {/* Background accent blob */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, var(--accent-1) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-14 flex flex-col items-center text-center">
          <div className="section-label mx-auto w-fit">
            <MessageSquare size={12} />
            Get In Touch
          </div>
          <h2 className="text-4xl font-black tracking-[-0.03em] text-white sm:text-5xl" style={{ fontFamily: 'var(--font-head)' }}>
            Let's Work Together
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-[16px] leading-[1.8] text-white/50 text-center">
            Whether you have a role in mind, a project to discuss, or just want to connect — my inbox is always open.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12 items-start">

          {/* Left: Info Panel */}
          <div className="space-y-5">
            {/* Availability card */}
            <div
              className="relative overflow-hidden rounded-none p-6 text-white border border-[var(--card-border)] bg-[var(--input-bg)] shadow-[var(--shadow-sm)]"
              style={{ borderTop: '4px solid var(--accent-1)' }}
            >
              {/* Subtle hover gradient */}
              <div 
                className="absolute inset-0 bg-gradient-to-br opacity-[0.03] transition-opacity duration-300 pointer-events-none"
                style={{ backgroundImage: `radial-gradient(circle at 100% 100%, var(--accent-1), transparent 70%)` }}
              />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-none bg-[var(--card-bg)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/70 border border-[var(--card-border)] mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="relative inline-flex h-2 w-2 rounded-none bg-[var(--accent-1)]" />
                  </span>
                  Currently Employed
                </div>
                <h3 className="text-2xl font-black">
                  Working Full-Time
                </h3>
                <p className="mt-2 text-sm text-white/60 leading-[1.7]">
                  I am currently working as a full-time employee, but my inbox is always open for networking or interesting discussions.
                </p>
              </div>
            </div>

            {/* Contact details */}
            <div className="rounded-none border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-[var(--shadow-sm)] space-y-4">
              <h3 className="text-[15px] font-bold text-white uppercase tracking-wider" style={{ fontFamily: 'var(--font-head)' }}>
                Contact Details
              </h3>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-none bg-[var(--accent-soft)]">
                  <Mail size={15} className="text-[var(--accent-1)]" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">Email</p>
                  <a href="mailto:jayasuriya03096@gmail.com" className="text-[14px] font-bold text-white hover:text-[var(--accent-1)] transition-colors">
                    jayasuriya03096@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-none bg-[var(--accent-soft)]">
                  <MapPin size={15} className="text-[var(--accent-1)]" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">Location</p>
                  <p className="text-[14px] font-bold text-white">Chennai, Tamil Nadu, India</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="rounded-none border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-[var(--shadow-sm)]">
              <h3 className="mb-4 text-[15px] font-bold text-white uppercase tracking-wider" style={{ fontFamily: 'var(--font-head)' }}>
                Find Me Online
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ id, label, icon: Icon, href, color }) => (
                  <a
                    key={id}
                    href={href}
                    onClick={() => trackEvent("Social", "Click", label)}
                    id={`contact-social-${label.toLowerCase()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex w-[110px] flex-col items-center gap-1 rounded-none border border-[var(--card-border)] bg-[var(--input-bg)] py-2 text-white/60 transition-all duration-300 ${color} hover:-translate-y-0.5 hover:border-[var(--accent-1)]`}
                    aria-label={label}
                  >
                    <Icon size={17} />
                    <span className="text-[11px] font-bold uppercase tracking-widest mt-1">{label}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Contact Form */}
          <div className="rounded-none border border-[var(--card-border)] bg-[var(--card-bg)] p-8 shadow-[var(--shadow-lg)]">
            {submitted ? (
              /* Success State */
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-none text-white shadow-[0_8px_28px_var(--accent-glow)]"
                  style={{ background: 'var(--accent-grad)' }}
                >
                  <CheckCircle size={30} />
                </div>
                <h3 className="mt-5 text-2xl font-black text-white" style={{ fontFamily: 'var(--font-head)' }}>
                  Message Sent!
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-[1.75] font-semibold text-white/60">
                  Thanks for reaching out, {submittedName}! I'll get back to you within 24–48 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="mt-6 rounded-none border border-[var(--card-border)] px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-white/60 transition-all duration-200 hover:border-[var(--accent-1)] hover:text-[var(--accent-1)]"
                >
                  Send Another
                </button>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit}>
                <h3 className="mb-6 text-xl font-black text-white uppercase tracking-wider" style={{ fontFamily: 'var(--font-head)' }}>
                  Send a Message
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-1.5 block text-[12px] font-bold uppercase tracking-widest text-white/60">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      maxLength={50}
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jayasuriya"
                      className="w-full rounded-none border border-[var(--card-border)] bg-[var(--input-bg)] px-4 py-3 text-[14px] text-white font-bold placeholder:text-white/20 outline-none transition-all duration-200 focus:border-[var(--accent-1)] focus:shadow-[0_0_0_2px_var(--accent-glow)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-1.5 block text-[12px] font-bold uppercase tracking-widest text-white/60">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      maxLength={100}
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-none border border-[var(--card-border)] bg-[var(--input-bg)] px-4 py-3 text-[14px] text-white font-bold placeholder:text-white/20 outline-none transition-all duration-200 focus:border-[var(--accent-1)] focus:shadow-[0_0_0_2px_var(--accent-glow)]"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="contact-subject" className="mb-1.5 block text-[12px] font-bold uppercase tracking-widest text-white/60">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    maxLength={150}
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Job opportunity / Project discussion"
                    className="w-full rounded-none border border-[var(--card-border)] bg-[var(--input-bg)] px-4 py-3 text-[14px] text-white font-bold placeholder:text-white/20 outline-none transition-all duration-200 focus:border-[var(--accent-1)] focus:shadow-[0_0_0_2px_var(--accent-glow)]"
                  />
                </div>

                <div className="mt-4">
                  <label htmlFor="contact-message" className="mb-1.5 block text-[12px] font-bold uppercase tracking-widest text-white/60">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    maxLength={3000}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about the role, project, or anything you'd like to discuss..."
                    className="w-full resize-none rounded-none border border-[var(--card-border)] bg-[var(--input-bg)] px-4 py-3 text-[14px] text-white font-bold placeholder:text-white/20 outline-none transition-all duration-200 focus:border-[var(--accent-1)] focus:shadow-[0_0_0_2px_var(--accent-glow)]"
                  />
                </div>

                <div className="mt-5">
                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-none px-7 py-3 text-[14px] font-black uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_var(--accent-glow)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    style={{ background: 'var(--accent-grad)' }}
                  >
                    {loading ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>


    </section>
  );
};

export default Contact;
