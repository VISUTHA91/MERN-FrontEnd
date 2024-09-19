import React from 'react';

const Support = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center mt-16">Information</h1>

      {/* FAQ Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Frequently Asked Questions</h2>
        <p className="text-lg leading-relaxed mb-4">
          Here you will find answers to the most common questions about our products, services, and policies.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          If you have any additional questions, feel free to contact our support team.
        </p>
      </section>

      {/* Shipping & Returns Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Shipping & Returns</h2>
        <p className="text-lg leading-relaxed mb-4">
          We offer free standard shipping on all orders over $50. Orders are processed within 1-2 business days. Once shipped, you will receive a tracking number to monitor your delivery.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          If you're not satisfied with your purchase, you can return it within 30 days for a full refund. Items must be in their original condition and packaging. Please contact our support team to initiate a return.
        </p>
      </section>

      {/* Privacy Policy Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Privacy Policy</h2>
        <p className="text-lg leading-relaxed mb-4">
          We are committed to protecting your privacy. Our Privacy Policy outlines how we collect, use, and protect your personal information. We do not share your information with third parties without your consent.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          For more details on how we handle your data, please review our full Privacy Policy on our website.
        </p>
      </section>

      {/* Terms & Conditions Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Terms & Conditions</h2>
        <p className="text-lg leading-relaxed mb-4">
          By using our website, you agree to comply with and be bound by our terms and conditions. These terms may be updated from time to time, so please check this page periodically.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          We reserve the right to modify or discontinue our services at any time without notice. Your continued use of our website constitutes acceptance of any changes to these terms.
        </p>
      </section>
    </div>
  );
};

export default Support;
