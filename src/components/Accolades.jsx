import React from 'react';

const Accolades = () => {
  const accolades = [
    {
      title: "Recognition for Outstanding Performance in Cloud Architecture",
      desc: "Awarded for exceptional contributions to designing and implementing innovative cloud solutions."
    },
    {
      title: "Top Performer Award",
      desc: "Recognized for exceptional performance and leadership in technical roles and project management."
    },
    {
      title: "Excellence in Technical Training",
      desc: "Acknowledged for developing and delivering impactful training programs for Office 365 administrators."
    },
    {
      title: "Innovative Solutions Award",
      desc: "Honored for creating innovative solutions and automations that significantly enhanced operational efficiency."
    }
  ];

  return (
    <section className="section section-dark" id="accolades">
      <div className="container">
        <h2 className="section-title">Accolades</h2>
        <h3 className="section-subtitle" style={{color: '#94a3b8'}}>Recognitions and achievements</h3>
        
        <div className="accolades-grid">
          {accolades.map((item, index) => (
            <div className="accolade-card" key={index}>
              <h4 className="accolade-title">{item.title}</h4>
              <p className="accolade-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accolades;
