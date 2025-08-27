import Layout from '@/components/layout/Layout';

export default function AboutPage() {
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">About Villa 95</h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-2xl mx-auto">
              Discover the story behind our luxury hill country retreat
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Text Content */}
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-gray-900">
                  Welcome to{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">
                    Villa 95
                  </span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Nestled in the heart of Sri Lanka's picturesque hill country, Villa 95 offers an 
                  unparalleled luxury experience that combines modern comfort with the breathtaking 
                  beauty of nature. Our villa is strategically located in Rangala, providing guests 
                  with panoramic views of misty mountains, lush tea plantations, and serene valleys.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Built with meticulous attention to detail, Villa 95 features contemporary architecture 
                  that harmoniously blends with the natural landscape. Every element has been carefully 
                  curated to ensure maximum comfort while preserving the authentic charm of the hill country.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Whether you're seeking a romantic getaway, a family vacation, or a peaceful retreat 
                  from the hustle and bustle of city life, Villa 95 provides the perfect setting for 
                  creating unforgettable memories.
                </p>
              </div>

              {/* Image Placeholder */}
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-amber-200 to-amber-400 rounded-2xl flex items-center justify-center">
                  <div className="text-center text-amber-800">
                    <div className="text-6xl mb-4">🏔️</div>
                    <p className="text-lg font-medium">Villa 95 Image</p>
                    <p className="text-sm">Beautiful hill country views</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location & History Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Location Map Placeholder */}
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-green-200 to-green-400 rounded-2xl flex items-center justify-center">
                  <div className="text-center text-green-800">
                    <div className="text-6xl mb-4">🗺️</div>
                    <p className="text-lg font-medium">Location Map</p>
                    <p className="text-sm">Rangala, Kandy District</p>
                  </div>
                </div>
              </div>

              {/* Location Content */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">Location & Accessibility</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Villa 95 is conveniently located in Rangala, a charming hill country town in the 
                  Kandy District of Sri Lanka. Our strategic location offers easy access to major 
                  attractions while maintaining the tranquility and privacy that our guests value.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Distance from Kandy</p>
                      <p className="text-gray-600">Approximately 45 minutes by car</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Nearest Airport</p>
                      <p className="text-gray-600">Bandaranaike International Airport (CMB) - 4 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Local Attractions</p>
                      <p className="text-gray-600">Tea plantations, hiking trails, waterfalls</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                At Villa 95, we are committed to providing exceptional experiences that exceed expectations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌟</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in every aspect of our service, from accommodation quality 
                  to guest experience.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌿</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainability</h3>
                <p className="text-gray-600">
                  We are committed to sustainable practices and preserving the natural beauty of our 
                  surroundings.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Hospitality</h3>
                <p className="text-gray-600">
                  Warm Sri Lankan hospitality is at the heart of everything we do, ensuring every 
                  guest feels welcome and valued.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
