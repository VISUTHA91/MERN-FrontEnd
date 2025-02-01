import React, { useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I create an account on your website?",
      answer:
        "Click on the 'Sign Up' button at the top, enter your details, and submit the form to complete the registration.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept credit/debit cards, PayPal, and other secure payment methods for a seamless checkout experience.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once shipped, you'll receive a tracking number via email. Use it on the courier’s website for real-time tracking.",
    },
    {
      question: "Do you offer free shipping?",
      answer:
        "We offer free shipping on orders above a certain amount. Check our shipping policy for more details.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Orders can be modified or canceled before processing. Contact support immediately for assistance.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we offer international shipping with varying delivery times and costs based on location.",
    },
    {
      question: "What if I receive a damaged item?",
      answer:
        "If your item arrives damaged, contact support within 7 days for a return or replacement.",
    },
    {
      question: "Can I use multiple discount codes?",
      answer:
        "Only one discount code can be applied per order. Choose the best deal available.",
    },
    {
      question: "How can I contact customer service?",
      answer:
        "Reach us via email at support@yourstore.com or visit our 'Contact Us' page for instant assistance.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Delivery times vary based on location. Typically, it takes 3-7 business days for domestic orders and 7-14 days for international orders.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-12">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-purple-500 text-white py-16 text-center">
        <h1 className="text-4xl font-extrabold tracking-wide">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-lg text-gray-200">
          Get answers to the most common queries.
        </p>
      </div>

<div className="max-w-6xl w-full px-6 mt-12 flex justify-center">
  <div className="flex flex-col gap-6 max-w-[600px] w-full">
    {faqs.map((faq, index) => (
      <div
        key={index}
        className="relative border border-gray-300 rounded-lg shadow-md p-3 py-2 transition-all duration-300"
      >
        <button
          className="flex justify-between items-center w-full text-lg font-semibold text-gray-900 focus:outline-none"
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        >
          {faq.question}
          <span
            className={`transition-transform text-gray-500 ${
              openIndex === index ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>

        {/* Answer (Expanding with CSS Transition) */}
        <div
          className={`mt-2 w-full bg-white shadow-lg rounded-md p-3 transition-all duration-300 ease-in-out ${
            openIndex === index ? "max-h-[150px] opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{ overflow: "hidden" }}
        >
          <p className="text-gray-500 font-light">{faq.answer}</p>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default FAQ;
