import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

const About = () => {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="bio">
            <h2 className="section-title">About Me</h2>
            <h3 className="section-subtitle">Dedicated to securing and optimizing your cloud infrastructure</h3>
            <p>
              I am a results-driven Cloud Solutions Architect with over a decade of experience designing and implementing highly secure, scalable, and resilient cloud architectures. I specialize in migrating complex enterprise environments to Microsoft 365, ensuring minimal downtime and maximum ROI.
            </p>
            <p>
              My expertise covers the entire Microsoft cloud ecosystem, including Entra ID (Azure AD), Exchange Online, Intune, and advanced security & compliance features. I thrive on solving complex technical challenges and delivering solutions that align with business objectives.
            </p>
            
            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-number">250+</div>
                <div className="stat-label">Successful Migrations</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">Years Experience</div>
              </div>
            </div>
          </div>
          
          <div className="expertise">
            <h2 className="section-title">Core Expertise</h2>
            <h3 className="section-subtitle">Specialized technical proficiencies</h3>
            
            <ul className="cert-list">
              <li className="cert-item">
                <FiCheckCircle className="cert-icon" size={24} />
                <div>
                  <div className="cert-title">Microsoft 365 Architecture</div>
                  <div className="cert-desc">End-to-end design, deployment, and management of M365 environments.</div>
                </div>
              </li>
              <li className="cert-item">
                <FiCheckCircle className="cert-icon" size={24} />
                <div>
                  <div className="cert-title">Cloud Security & Compliance</div>
                  <div className="cert-desc">Implementing Zero Trust frameworks, Purview, and Defender for Cloud.</div>
                </div>
              </li>
              <li className="cert-item">
                <FiCheckCircle className="cert-icon" size={24} />
                <div>
                  <div className="cert-title">Identity & Access Management</div>
                  <div className="cert-desc">Entra ID, conditional access policies, and secure authentication methods.</div>
                </div>
              </li>
              <li className="cert-item">
                <FiCheckCircle className="cert-icon" size={24} />
                <div>
                  <div className="cert-title">AWS & GCP to Azure Migrations</div>
                  <div className="cert-desc">Seamless cross-cloud transitions with zero data loss.</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
