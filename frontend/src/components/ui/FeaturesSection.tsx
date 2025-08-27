'use client';

import { useEffect, useRef } from 'react';
import { Mountain, Wifi, Car, Utensils, Shield, Sparkles, Eye, Heart } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !featuresRef.current) return;

    const features = featuresRef.current.querySelectorAll('.feature-card');

    // Animate features on scroll
    features.forEach((feature, index) => {
      gsap.fromTo(
        feature,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: index * 0.1,
          scrollTrigger: {
            trigger: feature,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Animate section title
    gsap.fromTo(
      sectionRef.current.querySelector('.section-title'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const features = [
    {
      icon: Mountain,
      title: 'Breathtaking Views',
      description: 'Panoramic vistas of the misty hill country and lush tea plantations',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: Wifi,
      title: 'High-Speed WiFi',
      description: 'Stay connected with complimentary high-speed internet throughout the villa',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: Car,
      title: 'Free Parking',
      description: 'Secure parking space available for guests with private vehicles',
      color: 'from-gray-500 to-slate-600',
    },
    {
      icon: Utensils,
      title: 'Full Kitchen',
      description: 'Fully equipped kitchen with modern appliances and dining area',
      color: 'from-orange-500 to-red-600',
    },
    {
      icon: Shield,
      title: '24/7 Security',
      description: 'Round-the-clock security ensuring your safety and peace of mind',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: Sparkles,
      title: 'Luxury Amenities',
      description: 'Premium furnishings, linens, and amenities for ultimate comfort',
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: Eye,
      title: 'Privacy & Seclusion',
      description: 'Exclusive location offering complete privacy and tranquility',
      color: 'from-amber-500 to-yellow-600',
    },
    {
      icon: Heart,
      title: 'Personalized Service',
      description: 'Dedicated staff to cater to your every need during your stay',
      color: 'from-rose-500 to-pink-600',
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="section-title">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">
                Villa 95
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the perfect blend of luxury, comfort, and natural beauty. 
              Every detail has been carefully crafted to ensure an unforgettable experience.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`w-full h-1 bg-gradient-to-r ${feature.color} rounded-full`} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-8 border border-amber-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience Villa 95?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Book your luxury hill country retreat today and create memories that will last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl">
                View Gallery
              </button>
              <button className="bg-white text-amber-600 px-8 py-3 rounded-lg border-2 border-amber-600 hover:bg-amber-600 hover:text-white transition-all duration-200 font-medium">
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
