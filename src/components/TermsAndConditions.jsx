import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>

      <p className="mb-4">
        Welcome to <strong>VeggieMart</strong>! These Terms and Conditions
        govern your use of our website and services. By accessing or using our
        platform, you agree to be bound by these terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        1. Product Information
      </h2>
      <p className="mb-4">
        We strive to provide accurate descriptions and prices of all vegetables
        listed on our site. However, availability and pricing may change due to
        market conditions. Images are for representation purposes only.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Orders & Payments</h2>
      <p className="mb-4">
        Orders placed through our website are subject to acceptance and
        availability. We accept multiple payment methods including cash on
        delivery and mobile banking. You agree to provide valid payment details
        when placing an order.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Delivery</h2>
      <p className="mb-4">
        Delivery times may vary depending on your location and availability. We
        aim to deliver fresh produce within the promised timeframe. Please
        ensure your address and contact details are accurate.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Returns & Refunds</h2>
      <p className="mb-4">
        If you receive damaged or spoiled vegetables, please contact us within
        24 hours of delivery with a photo as proof. Refunds or replacements are
        subject to verification.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        5. User Responsibilities
      </h2>
      <p className="mb-4">
        You agree to use our website only for lawful purposes. You must not
        engage in any activity that disrupts or interferes with our services or
        security.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Privacy</h2>
      <p className="mb-4">
        We value your privacy and are committed to protecting your personal
        information. Please refer to our{" "}
        <a href="/privacy-policy" className="text-blue-600 underline">
          Privacy Policy
        </a>{" "}
        for more details.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to Terms</h2>
      <p className="mb-4">
        We may update these Terms & Conditions at any time. Continued use of the
        site constitutes acceptance of the updated terms.
      </p>

      <p className="mt-6">
        If you have any questions or concerns, please contact our support team
        at{" "}
        <a
          href="mailto:support@veggiemart.com"
          className="text-blue-600 underline"
        >
          support@veggiemart.com
        </a>
        .
      </p>
    </div>
  );
};

export default TermsAndConditions;
