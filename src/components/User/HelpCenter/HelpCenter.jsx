import React, { useState } from "react";
import "./HelpCenter.scss";

const faqs = [
  {
    q: "How can I book a travel package?",
    a: "Open the package page, click Book Now, fill the booking form and proceed to checkout."
  },
  {
    q: "Can I cancel my booking?",
    a: "Yes, you can cancel from your bookings page. Refund depends on the cancellation policy."
  },
  {
    q: "What payment methods are supported?",
    a: "We support UPI, cards, net banking and wallets through our secure payment gateway."
  },
  {
    q: "I didn’t receive confirmation email. What to do?",
    a: "Check spam folder first. If not found, contact our support team."
  },
  {
    q: "How can I update my profile details?",
    a: "Go to Settings page → Profile → Edit and save changes."
  }
];

const HelpCenter = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="help-container">

      <h1>Help Center</h1>
      <p className="subtitle">
        Find answers, guides and support for your travel bookings.
      </p>

      {/* Quick Help Blocks */}
      <div className="help-grid">
        <div className="help-card">📦 Booking Help</div>
        <div className="help-card">💳 Payment Issues</div>
        <div className="help-card">👤 Account Support</div>
        <div className="help-card">🧭 Package Details</div>
      </div>

      {/* FAQ */}
      <h2>Frequently Asked Questions</h2>

      <div className="faq-list">
        {faqs.map((item, i) => (
          <div key={i} className="faq-item">
            <div className="faq-q" onClick={() => toggle(i)}>
              {item.q}
              <span>{openIndex === i ? "-" : "+"}</span>
            </div>

            {openIndex === i && (
              <div className="faq-a">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="support-box">
        <h3>Still need help?</h3>
        <p>Email: support@traveloop.com</p>
        <p>Phone: +91 9988776655</p>
        <p>Support Hours: 9 AM – 8 PM</p>
      </div>

    </div>
  );
};

export default HelpCenter;
