import React, { useState } from "react";
import ScrollReveal from "./ScrollReveal";

interface FAQ {
  question: string;
  answer: string;
}

const FAQS: FAQ[] = [
  {
    question: "How fast can you create a virtual tour from my photos?",
    answer: "Most listings are ready within 24–48 hours. High-priority listings can be processed within hours."
  },
  {
    question: "Do I need professional photography?",
    answer: "Not necessarily. Our AI and editing tools can turn standard listing photos into cinematic tours and virtual staging."
  },
  {
    question: "Can I use these videos for social media?",
    answer: "Absolutely! Each tour comes with social-ready clips optimized for Instagram, TikTok, and Facebook."
  },
  {
    question: "Is virtual staging realistic?",
    answer: "Yes! We use professional design templates and AI enhancements to make every room look naturally furnished."
  },
  {
    question: "Can I cancel or change my plan anytime?",
    answer: "Yes, our subscription plans are flexible and you can upgrade, downgrade, or cancel anytime."
  }
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section section-gray">
      <ScrollReveal>
        <div className="container">
          <div className="section-header">
            <h2 className="heading-2">Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <div key={i} className="faq-item">
                <button
                  onClick={() => toggle(i)}
                  className="faq-question"
                  aria-expanded={openIndex === i}
                >
                  {faq.question}
                </button>
                {openIndex === i && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default FAQSection;