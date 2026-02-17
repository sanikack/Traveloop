import React from "react";
import "./Privacy&Policy.scss";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <h1>Privacy Policy</h1>
      <p>Last updated: February 2026</p>

      <section>
        <h2>1. Information We Collect</h2>
        <p>
          We collect personal information such as name, email address, phone
          number, booking details, and account credentials when you use our
          services. Newsletter subscriptions and contact forms may also collect
          your email.
        </p>
      </section>

      <section>
        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To process bookings</li>
          <li>To manage user accounts</li>
          <li>To provide customer support</li>
          <li>To send travel updates and offers</li>
          <li>To improve our platform</li>
        </ul>
      </section>

      <section>
        <h2>3. Sharing of Information</h2>
        <p>
          We do not sell your personal data. Information may be shared only
          with payment providers, travel partners, or when legally required.
        </p>
      </section>

      <section>
        <h2>4. Data Security</h2>
        <p>
          We use reasonable security measures to protect your data including
          secure servers and restricted access controls.
        </p>
      </section>

      <section>
        <h2>5. Emails & Marketing</h2>
        <p>
          You may receive promotional emails. You can unsubscribe anytime using
          the unsubscribe link.
        </p>
      </section>

      <section>
        <h2>6. Cookies</h2>
        <p>
          We use cookies to maintain login sessions and improve user
          experience.
        </p>
      </section>

      <section>
        <h2>7. User Rights</h2>
        <ul>
          <li>Request account deletion</li>
          <li>Update personal data</li>
          <li>Request your stored data</li>
        </ul>
      </section>

      <section>
        <h2>8. Changes to Policy</h2>
        <p>
          We may update this policy occasionally. Continued use means you
          accept updates.
        </p>
      </section>

      <section>
        <h2>9. Contact</h2>
        <p>Email: support@traveloop.com</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
