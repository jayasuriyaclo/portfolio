import React from 'react';
import tocumulusImg from '../assets/tocumulus.png';
import shamsImg from '../assets/shams.jpg';

const PartnerCard = ({ type, title, name, img, scale = 1, accentColor }) => (
  <div className="group relative rounded-none border border-[var(--card-border)] bg-[var(--card-bg)] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] flex flex-col justify-between h-[340px] overflow-hidden">
    {/* Subtle hover gradient */}
    <div 
      className="absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-10 pointer-events-none"
      style={{ backgroundImage: `radial-gradient(circle at 100% 100%, ${accentColor}, transparent 70%)` }}
    />

    <div className="relative z-10 flex flex-col items-start gap-4">
      <span className="inline-flex items-center rounded-none bg-[var(--input-bg)] border border-[var(--card-border)] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-white/60">
        {type}
      </span>
      <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl leading-[1.25]" style={{ fontFamily: 'var(--font-head)' }}>
        {title}
      </h2>
    </div>

    <div className="relative z-10 mt-auto flex h-14 w-full items-end justify-start opacity-70 transition-opacity duration-300 group-hover:opacity-100">
      <img
        src={img}
        alt={name}
        className="max-h-full max-w-[180px] object-contain"
        style={{ transform: `scale(${scale})`, transformOrigin: 'left center' }}
      />
    </div>
  </div>
);

const Partners = () => {
  return (
    <section className="relative overflow-hidden bg-[var(--color-bg)] py-24 border-y border-[var(--card-border)] px-5 sm:px-6 md:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 text-[11px] font-black uppercase tracking-[0.4em] text-white/40">
            Trusted By
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-wider" style={{ fontFamily: 'var(--font-head)' }}>
            My Network
          </h2>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <PartnerCard
            type="Experience"
            title="Company I have had the privilege to work with."
            name="TOCUMULUS"
            img={tocumulusImg}
            scale={1.2}
            accentColor="var(--accent-1)"
          />
          <PartnerCard
            type="Collaboration"
            title="A partner I've had the opportunity to collaborate with."
            name="Shams"
            img={shamsImg}
            scale={2.8}
            accentColor="var(--accent-2)"
          />
        </div>
      </div>
    </section>
  );
};

export default Partners;
