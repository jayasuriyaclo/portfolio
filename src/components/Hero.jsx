import React from 'react';
import ContactForm from './ContactForm';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <div className="stars">
            &#9733;&#9733;&#9733;&#9733;&#9733;
          </div>
          <p className="trust-text">Trusted by top industry professionals.</p>
          <h1 className="hero-title">Expert Cloud Solutions Architect</h1>
          <p className="hero-desc">
            Senior Cloud Architect specializing in rearchitecting and migrating from AWS and GCP to Microsoft 365 (M365) with a focus on security, scalability, and cost optimization. Expert in implementing advanced features such as M365 Copilot, Lifecycle Workflow Automation, Global Secure Access, Azure AD, Exchange, SharePoint, Teams, Intune, as well as Security and Compliance. Delivers top-tier cloud solutions and ensures seamless integration and optimization to drive business success.
          </p>
        </div>
        
        <div className="hero-form-wrapper">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Hero;
