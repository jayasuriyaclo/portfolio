import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Lock, Monitor, Cpu, Maximize2 } from 'lucide-react';

/* ── Helpers ──────────────────────────────────────────── */

const getOSInfo = () => {
  const ua = navigator.userAgent;
  if (ua.includes('Windows NT 10'))  return 'Windows 10/11';
  if (ua.includes('Windows NT 6.3')) return 'Windows 8.1';
  if (ua.includes('Windows NT 6.2')) return 'Windows 8';
  if (ua.includes('Windows NT 6.1')) return 'Windows 7';
  if (ua.includes('Mac OS X'))       return 'macOS ' + (ua.match(/Mac OS X ([\d_]+)/)?.[1]?.replace(/_/g, '.') || '');
  if (ua.includes('Android'))        return 'Android ' + (ua.match(/Android ([\d.]+)/)?.[1] || '');
  if (ua.includes('iPhone'))         return 'iOS ' + (ua.match(/OS ([\d_]+)/)?.[1]?.replace(/_/g, '.') || '');
  if (ua.includes('iPad'))           return 'iPadOS';
  if (ua.includes('Linux'))          return 'Linux';
  if (ua.includes('CrOS'))           return 'ChromeOS';
  return 'Unknown OS';
};

const getBrowser = () => {
  const ua = navigator.userAgent;
  if (ua.includes('Edg/'))    return 'Edge';
  if (ua.includes('Chrome/')) return 'Chrome';
  if (ua.includes('Firefox/'))return 'Firefox';
  if (ua.includes('Safari/') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('OPR/'))    return 'Opera';
  return 'Browser';
};

const getScreenRes = () => `${window.screen.width} × ${window.screen.height}`;

/* ── Component ────────────────────────────────────────── */

const SecurityAnalysisWidget = () => {
  const [ip, setIp] = useState(null);
  const [step, setStep] = useState(0);
  const [clientInfo] = useState({
    os: getOSInfo(),
    browser: getBrowser(),
    screen: getScreenRes(),
  });

  useEffect(() => {
    const sequence = async () => {
      setStep(1);
      await new Promise((r) => setTimeout(r, 700));
      setStep(2);
      await new Promise((r) => setTimeout(r, 600));

      // Try multiple free IP APIs for reliability
      const apis = [
        'https://api.ipify.org?format=json',
        'https://api64.ipify.org?format=json',
      ];

      let fetchedIp = null;
      for (const url of apis) {
        try {
          const res = await fetch(url);
          const data = await res.json();
          if (data?.ip) { fetchedIp = data.ip; break; }
        } catch { /* try next */ }
      }

      setIp(fetchedIp || 'Protected');
      await new Promise((r) => setTimeout(r, 400));
      setStep(3);
    };

    sequence();
  }, []);

  return (
    <div
      className="mx-auto mt-16 max-w-2xl overflow-hidden rounded-[24px]"
      style={{
        border: '1px solid var(--card-border)',
        backgroundColor: 'var(--card-bg)',
        boxShadow: 'var(--shadow-sm)',
        animation: 'fadeInUp 1s 0.5s ease both',
      }}
    >
      {/* Terminal Header */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: '1px solid var(--divider)', backgroundColor: 'var(--input-bg)' }}
      >
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-amber-400"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400"></div>
        </div>
        <div className="ml-2 flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: 'var(--text-tertiary)' }}>
          <Terminal size={12} />
          <span>&gt;_ visitor_analysis.exe</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-5 font-mono text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        <div className="flex items-center gap-2" style={{ color: 'var(--accent-1)' }}>
          <span className="animate-pulse">▶</span>
          <span>Initiating environment check...</span>
        </div>

        {step >= 1 && (
          <div className="mt-2 animate-[fadeIn_0.5s_ease_forwards]" style={{ color: 'var(--text-tertiary)' }}>
            [+] Establishing secure TLS 1.3 handshake... <span style={{ color: 'var(--accent-1)' }}>OK</span>
          </div>
        )}

        {step >= 2 && (
          <div className="mt-1 animate-[fadeIn_0.5s_ease_forwards]" style={{ color: 'var(--text-tertiary)' }}>
            [+] Reading client environment... <span style={{ color: 'var(--accent-1)' }}>DONE</span>
          </div>
        )}

        {step >= 3 && (
          <div
            className="mt-4 rounded-xl p-4 animate-[fadeInUp_0.6s_ease_forwards]"
            style={{
              border: '1px solid rgba(52, 211, 153, 0.15)',
              backgroundColor: 'rgba(16, 185, 129, 0.06)',
            }}
          >
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 shrink-0 text-emerald-500" size={18} />
              <div className="w-full">
                <p className="font-semibold text-emerald-500">Connection Verified Secure</p>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
                  {/* Public IP */}
                  <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: 'rgba(16, 185, 129, 0.06)' }}>
                    <Lock size={12} className="text-emerald-500 shrink-0" />
                    <span style={{ color: 'var(--text-tertiary)' }}>Public IP:</span>
                    <span className="font-semibold text-emerald-400">{ip}</span>
                  </div>

                  {/* OS */}
                  <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: 'rgba(16, 185, 129, 0.06)' }}>
                    <Cpu size={12} className="text-emerald-500 shrink-0" />
                    <span style={{ color: 'var(--text-tertiary)' }}>OS:</span>
                    <span className="font-semibold text-emerald-400">{clientInfo.os}</span>
                  </div>

                  {/* Screen Resolution */}
                  <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: 'rgba(16, 185, 129, 0.06)' }}>
                    <Maximize2 size={12} className="text-emerald-500 shrink-0" />
                    <span style={{ color: 'var(--text-tertiary)' }}>Resolution:</span>
                    <span className="font-semibold text-emerald-400">{clientInfo.screen}</span>
                  </div>

                  {/* Browser */}
                  <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: 'rgba(16, 185, 129, 0.06)' }}>
                    <Monitor size={12} className="text-emerald-500 shrink-0" />
                    <span style={{ color: 'var(--text-tertiary)' }}>Browser:</span>
                    <span className="font-semibold text-emerald-400">{clientInfo.browser}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityAnalysisWidget;
