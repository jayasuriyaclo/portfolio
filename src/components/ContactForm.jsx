import React from 'react';

const ContactForm = () => {
  return (
    <div className="form-card">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="firstName">Enter your first name here</label>
          <input type="text" id="firstName" className="form-input" placeholder="Type your first name" />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Input your email address*</label>
          <input type="email" id="email" className="form-input" placeholder="Enter your email here" required />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone number*</label>
          <input type="tel" id="phone" className="form-input" placeholder="Your phone number" required />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Write your message here*</label>
          <textarea id="message" className="form-input" placeholder="Type your message" required></textarea>
        </div>
        
        <button type="submit" className="submit-btn">Submit your details now</button>
      </form>
    </div>
  );
};

export default ContactForm;
