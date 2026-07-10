import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Fingerprint, Eye, EyeOff } from 'lucide-react';

const calculateEntropy = (password) => {
  let pool = 0;
  if (/[a-z]/.test(password)) pool += 26;
  if (/[A-Z]/.test(password)) pool += 26;
  if (/[0-9]/.test(password)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(password)) pool += 32;

  if (pool === 0) return 0;
  return password.length * Math.log2(pool);
};

const getStrengthDetails = (entropy) => {
  if (entropy < 28) return { label: 'Very Weak', color: 'bg-red-500', text: 'text-red-600', width: '20%', time: 'Instantly' };
  if (entropy < 35) return { label: 'Weak', color: 'bg-orange-500', text: 'text-orange-600', width: '40%', time: 'Minutes' };
  if (entropy < 59) return { label: 'Reasonable', color: 'bg-yellow-500', text: 'text-yellow-600', width: '60%', time: 'Days' };
  if (entropy < 80) return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-600', width: '80%', time: 'Years' };
  return { label: 'Very Strong', color: 'bg-indigo-500', text: 'text-indigo-600', width: '100%', time: 'Centuries' };
};

const PasswordTester = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const entropy = calculateEntropy(password);
  const details = password.length > 0 ? getStrengthDetails(entropy) : { label: 'Enter a password', color: 'bg-gray-200', text: 'text-gray-500', width: '0%', time: '-' };

  return (
    <div className="mx-auto mt-12 w-full max-w-2xl rounded-[26px] border border-black/[0.07] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_12px_36px_rgba(99,102,241,0.1)]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
            <Fingerprint size={16} />
          </div>
          <h3 className="text-[15px] font-semibold text-black">Interactive Identity Test</h3>
        </div>
        <div className="text-[11px] font-medium uppercase tracking-wider text-black/40">Entropy Calculator</div>
      </div>

      <div className="relative mb-4">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type a sample password to test..."
          className="w-full rounded-xl border border-black/[0.1] bg-[#fafaf9] px-4 py-3 text-[14px] text-black outline-none transition-all focus:border-[var(--accent-1)] focus:bg-white"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      <div className="mb-2 flex h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full transition-all duration-500 ${details.color}`}
          style={{ width: details.width }}
        ></div>
      </div>

      <div className="flex items-center justify-between text-[13px]">
        <div className="flex items-center gap-1.5 font-medium">
          Strength: <span className={details.text}>{details.label}</span>
        </div>
        <div className="text-gray-500">
          Crack Time: <span className="font-semibold text-gray-800">{details.time}</span>
        </div>
      </div>
    </div>
  );
};

export default PasswordTester;
