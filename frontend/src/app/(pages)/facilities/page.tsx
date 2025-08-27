'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { 
  Wifi, 
  Car, 
  Utensils, 
  Shield, 
  Sparkles, 
  Mountain, 
  Coffee, 
  Tv, 
  Snowflake,
  Umbrella,
  Camera,
  BookOpen,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

export default function FacilitiesPage() {
  const [activeTab, setActiveTab] = useState('all');

  const facilities = {
    accommodation: [
      {
        icon: Mountain,
        title: '4 Bedrooms',
        description: 'Spacious bedrooms with premium bedding and mountain views',
        features: ['King-size beds', 'Premium linens', 'Mountain views', 'En-suite bathrooms']
      },
      {
        icon: Tv,
        title: 'Entertainment',
        description: 'Modern entertainment systems for your comfort',
        features: ['Smart TV', 'High-speed WiFi', 'Bluetooth speakers', 'Board games']
      },
      {
        icon: Snowflake,
        title: 'Climate Control',
        description: 'Perfect temperature control throughout the villa',
        features: ['Air conditioning', 'Heating', 'Ceiling fans', 'Ventilation']
      }
    ],
    dining: [
      {
        icon: Utensils,
        title: 'Full Kitchen',
        description: 'Fully equipped kitchen with modern appliances',
        features: ['Refrigerator', 'Microwave', 'Coffee maker', 'Dishwasher']
      },
      {
        icon: Coffee,
        title: 'Dining Areas',
        description: 'Multiple dining options with stunning views',
        features: ['Indoor dining', 'Outdoor terrace', 'BBQ facilities', 'Coffee station']
      }
    ],
    outdoor: [
      {
        icon: Umbrella,
        title: 'Garden & Terrace',
        description: 'Beautiful outdoor spaces to relax and enjoy',
        features: ['Private garden', 'Sun terrace', 'Outdoor seating', 'Mountain views']
      },
      {
        icon: Camera,
        title: 'Scenic Views',
        description: 'Breathtaking views of the hill country',
        features: ['Tea plantations', 'Mountain ranges', 'Sunset views', 'Wildlife watching']
      }
    ],
    services: [
      {
        icon: Shield,
        title: 'Security',
        description: '24/7 security for your peace of mind',
        features: ['CCTV cameras', 'Security personnel', 'Safe parking', 'Emergency contacts']
      },
      {
        icon: Phone,
        title: 'Concierge',
        description: 'Personal assistance for all your needs',
        features: ['24/7 support', 'Local recommendations', 'Transportation', 'Activity booking']
      }
    ]
  };

  const tabs = [
    { id: 'all', label: 'All Facilities' },
    { id: 'accommodation', label: 'Accommodation' },
    { id: 'dining', label: 'Dining' },
    { id: 'outdoor', label: 'Outdoor' },
    { id: 'services', label: 'Services' }
  ];

  const getFilteredFacilities = () => {
    if (activeTab === 'all') {
      return Object.values(facilities).flat();
    }
    return facilities[activeTab as keyof typeof facilities] || [];
  };

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Facilities & Amenities</h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-2xl mx-auto">
              Discover the luxury amenities that make Villa 95 your perfect hill country retreat
            </p>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="py-8 bg-white border-b sticky top-32 z-40">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap gap-4 justify-center">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-amber-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Facilities Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getFilteredFacilities().map((facility, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                >
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-4">
                    <facility.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {facility.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {facility.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2">
                    {facility.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Everything You Need for a Perfect Stay
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From essential amenities to luxury touches, we've thought of everything to ensure 
                your comfort and enjoyment at Villa 95.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wifi className="w-10 h-10 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">High-Speed WiFi</h3>
                <p className="text-gray-600 text-sm">
                  Stay connected with complimentary high-speed internet throughout the villa
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="w-10 h-10 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Parking</h3>
                <p className="text-gray-600 text-sm">
                  Secure parking space available for guests with private vehicles
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-10 h-10 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Local Guide</h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive guide to local attractions, restaurants, and activities
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-10 h-10 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Location Guide</h3>
                <p className="text-gray-600 text-sm">
                  Detailed information about nearby attractions and transportation options
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Questions About Our Facilities?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Our team is here to help you understand all the amenities available at Villa 95. 
              Feel free to reach out with any questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+94112345678"
                className="flex items-center justify-center space-x-2 bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors duration-200 font-medium"
              >
                <Phone className="w-5 h-5" />
                <span>Call Us</span>
              </a>
              <a
                href="mailto:info@villa95rangala.com"
                className="flex items-center justify-center space-x-2 bg-white text-amber-600 px-8 py-3 rounded-lg border-2 border-amber-600 hover:bg-amber-600 hover:text-white transition-all duration-200 font-medium"
              >
                <Mail className="w-5 h-5" />
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
