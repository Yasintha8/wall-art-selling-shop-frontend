import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FaCircleMinus } from "react-icons/fa6";

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Shipping times vary by location. Standard domestic shipping typically takes 3–7 business days. International shipping may take 7–21 business days.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you'll receive a tracking link via email. You can also track your order from your account dashboard.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 14 days of delivery. Items must be unused and in original packaging. Read more on our Returns & Exchanges page.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "Yes, if your order hasn’t been processed yet. Please contact us as soon as possible at support@example.com.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to many countries. Shipping rates and delivery times will be calculated at checkout based on your location.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-8 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10 text-center">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-xl shadow-sm">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-6 py-4 focus:outline-none flex justify-between items-center"
            >
              <span className="font-medium text-gray-800 cursor-pointer">{faq.question}</span>
              <span className="text-gray-500 text-xl cursor-pointer">
                {activeIndex === index ? <FaCircleMinus /> : <FaPlusCircle />}
              </span>
            </button>
            {activeIndex === index && (
              <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
