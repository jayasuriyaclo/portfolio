import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      text: "Joseph's expertise in migrating our complex AWS infrastructure to Microsoft 365 was unparalleled. He ensured zero downtime and significantly improved our security posture.",
      author: "Sarah Jenkins",
      company: "CTO, TechCorp Solutions"
    },
    {
      text: "The transition to Azure AD and Intune was seamless thanks to Joseph's meticulous planning and execution. A true professional who understands both technology and business needs.",
      author: "David Chen",
      company: "VP of Engineering, GlobalNet"
    },
    {
      text: "We brought Joseph in to audit and optimize our cloud environment. His recommendations saved us 30% in monthly costs while enhancing overall performance.",
      author: "Michael Ross",
      company: "Director of IT, Innovate Inc."
    }
  ];

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <h2 className="section-title">What Clients Say</h2>
        <h3 className="section-subtitle">Trusted by industry leaders</h3>
        
        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p className="testimonial-text">"{item.text}"</p>
              <div>
                <div className="testimonial-author">{item.author}</div>
                <div className="testimonial-company">{item.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
