import React from "react";
import "./Terms&Conditions.scss";

const TermsConditions = () => {
  return (
    <div className="terms-container">
      <h1>Terms & Conditions</h1>
      <p>Last updated: February 2026</p>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using our website and services, you agree to be
          bound by these Terms & Conditions. If you do not agree, please do
          not use our platform.
        </p>
      </section>

      <section>
        <h2>2. Services</h2>
        <p>
          We provide travel package listings, booking services, and related
          travel information. We reserve the right to modify or discontinue
          any service at any time without prior notice.
        </p>
      </section>

      <section>
        <h2>3. Bookings & Payments</h2>
        <ul>
          <li>All bookings are subject to availability.</li>
          <li>Prices may change without prior notice.</li>
          <li>Booking is confirmed only after successful payment.</li>
          <li>You must provide accurate traveler information.</li>
        </ul>
      </section>

      <section>
        <h2>4. Cancellations & Refunds</h2>
        <p>
          Cancellation and refund eligibility depends on the specific package.
          Some bookings may be non-refundable. Refund timelines may vary based
          on payment provider rules.
        </p>
      </section>

      <section>
        <h2>5. User Responsibilities</h2>
        <ul>
          <li>Provide correct personal details</li>
          <li>Do not misuse the platform</li>
          <li>Do not attempt unauthorized access</li>
        </ul>
      </section>

      <section>
        <h2>6. Intellectual Property</h2>
        <p>
          All content, logos, images, and text on this platform are our
          property and may not be copied or reused without permission.
        </p>
      </section>

      <section>
        <h2>7. Limitation of Liability</h2>
        <p>
          We are not liable for delays, losses, or damages caused by third-
          party service providers, weather conditions, or unforeseen events.
        </p>
      </section>

      <section>
        <h2>8. Changes to Terms</h2>
        <p>
          We may update these Terms at any time. Continued use of the platform
          means you accept the updated Terms.
        </p>
      </section>

      <section>
        <h2>9. Contact Us</h2>
        <p>
          For any questions regarding these Terms, contact:
          support@traveloop.com
        </p>
      </section>
    </div>
  );
};

export default TermsConditions;
