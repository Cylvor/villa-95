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
    answer: "Yes. Despite being 'above the clouds', we offer high-speed fiber Wi-Fi throughout the property, perfect for remote work. Mobile signal is generally good for major networks."
  },
  {
    question: "What is the weather like? Do I need warm clothes?",
    answer: "The climate is cool and refreshing year-round, similar to Nuwara Eliya but less crowded. It can get chilly in the evenings (18°C - 22°C), so we recommend bringing a light sweater or jacket."
  },
  {
    question: "Are meals provided?",
    answer: "Absolutely. We have an in-house restaurant serving authentic Sri Lankan curry, as well as Chinese and Western dishes. You can dine on your private balcony or at our open-air terrace."
  },
  {
    question: "Can we go hiking in the Knuckles Range from the villa?",
    answer: "Absolutely. We can arrange guided treks through the Knuckles Mountain Range, a UNESCO World Heritage site. There are trails suitable for all fitness levels, from gentle estate walks to more challenging mountain peaks."
  },
  {
    question: "What are the check-in and check-out times?",
    answer: "Our standard check-in is at 2:00 PM and check-out is at 11:00 AM. If you'd like to arrive earlier or stay a bit longer, please let us know and we will do our best to accommodate your request based on availability."
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
                <a 
                    href="https://wa.me/94773864650" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-bold underline decoration-emerald-700/30 hover:decoration-emerald-700 transition-all inline-flex items-center gap-1"
                >
                    Contact Rajeewa on WhatsApp
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
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