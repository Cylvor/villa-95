"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus, HelpCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "Is the road to the villa difficult to drive?",
    answer: "We are located in the Knuckles Mountain Range, so the drive is scenic and winding. The road is fully carpeted and accessible by any standard car (sedan, van, or SUV). You do not need a 4x4. We recommend arriving before sunset to enjoy the views."
  },
  {
    question: "Do you provide driver accommodation?",
    answer: "Yes, we understand that many guests travel with private drivers. We provide clean accommodation and meals for drivers at a nominal charge. Please let us know in advance so we can prepare."
  },
  {
    question: "Is there Wi-Fi and mobile signal?",
    answer: "Yes. Despite being 'above the clouds', we offer high-speed fiber Wi-Fi throughout the property, perfect for remote work. Mobile signal is generally good for major networks (Dialog/Mobitel)."
  },
  {
    question: "What is the weather like? Do I need warm clothes?",
    answer: "The climate is cool and refreshing year-round, similar to Nuwara Eliya but less crowded. It can get chilly in the evenings (18°C - 22°C), so we recommend bringing a light sweater or jacket."
  },
  {
    question: "Are meals provided?",
    answer: "Absolutely. We have an in-house restaurant serving authentic Sri Lankan curry, as well as Chinese and Western dishes. You can dine on your private balcony or at our open-air terrace."
  }
];

export default function FAQ() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animation for the FAQ list
      gsap.from(".faq-item", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={container}
      className="relative w-full bg-white px-6 py-24 md:px-12 md:py-32 text-stone-900"
    >
      <div className="mx-auto max-w-4xl">
        
        {/* --- Header --- */}
        <div className="mb-16 text-center">
          <span className="block text-xs font-mono uppercase tracking-[0.2em] text-emerald-600 mb-4">
            Essentials
          </span>
          <h2 className="text-3xl md:text-5xl font-light leading-tight tracking-tight text-stone-900 mb-6">
            Good to know.
          </h2>
          <p className="text-stone-500 max-w-lg mx-auto leading-relaxed">
            Everything you need to plan your escape to the mountains.
          </p>
        </div>

        {/* --- FAQ List --- */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        {/* --- Contact / Help CTA --- */}
        <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 text-stone-400 text-sm">
                <HelpCircle className="h-4 w-4" />
                <span>Still have questions?</span>
                <a href="#contact" className="text-emerald-700 font-bold underline decoration-emerald-700/30 hover:decoration-emerald-700 transition-all">
                    Contact Rajiva on WhatsApp
                </a>
            </div>
        </div>

      </div>
    </section>
  );
}

// Internal Accordion Component
function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="faq-item border-b border-stone-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-emerald-700"
      >
        <span className="text-lg md:text-xl font-light tracking-wide text-stone-800">
            {question}
        </span>
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-stone-200 transition-all duration-300 ${isOpen ? 'bg-stone-900 border-stone-900 rotate-180' : 'bg-white'}`}>
            {isOpen ? (
                <Minus className="h-4 w-4 text-white" />
            ) : (
                <Plus className="h-4 w-4 text-stone-400" />
            )}
        </div>
      </button>
      
      {/* Smooth Height Transition */}
      <div
        ref={contentRef}
        style={{
            height: isOpen ? contentRef.current?.scrollHeight : 0,
            opacity: isOpen ? 1 : 0
        }}
        className="overflow-hidden transition-all duration-500 ease-in-out"
      >
        <p className="pb-8 pr-8 text-stone-500 leading-relaxed text-sm md:text-base">
            {answer}
        </p>
      </div>
    </div>
  );
}