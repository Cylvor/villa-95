'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Sample gallery images - replace with actual Villa 95 images
  const galleryImages = [
    {
      id: 1,
      src: '/images/villa95-1.jpg',
      alt: 'Villa 95 Exterior View',
      category: 'Exterior',
      description: 'Beautiful exterior view of Villa 95 with mountain backdrop'
    },
    {
      id: 2,
      src: '/images/villa95-2.jpg',
      alt: 'Living Room',
      category: 'Interior',
      description: 'Spacious living room with panoramic windows'
    },
    {
      id: 3,
      src: '/images/villa95-3.jpg',
      alt: 'Master Bedroom',
      category: 'Bedrooms',
      description: 'Luxurious master bedroom with mountain views'
    },
    {
      id: 4,
      src: '/images/villa95-4.jpg',
      alt: 'Kitchen',
      category: 'Interior',
      description: 'Fully equipped modern kitchen'
    },
    {
      id: 5,
      src: '/images/villa95-5.jpg',
      alt: 'Bathroom',
      category: 'Interior',
      description: 'Elegant bathroom with premium fixtures'
    },
    {
      id: 6,
      src: '/images/villa95-6.jpg',
      alt: 'Garden View',
      category: 'Exterior',
      description: 'Beautiful garden and outdoor seating area'
    },
    {
      id: 7,
      src: '/images/villa95-7.jpg',
      alt: 'Tea Plantation View',
      category: 'Views',
      description: 'Stunning views of surrounding tea plantations'
    },
    {
      id: 8,
      src: '/images/villa95-8.jpg',
      alt: 'Sunset View',
      category: 'Views',
      description: 'Breathtaking sunset over the hill country'
    },
    {
      id: 9,
      src: '/images/villa95-9.jpg',
      alt: 'Outdoor Dining',
      category: 'Exterior',
      description: 'Al fresco dining area with mountain views'
    },
    {
      id: 10,
      src: '/images/villa95-10.jpg',
      alt: 'Pool Area',
      category: 'Amenities',
      description: 'Infinity pool with panoramic views'
    },
    {
      id: 11,
      src: '/images/villa95-11.jpg',
      alt: 'Hiking Trail',
      category: 'Activities',
      description: 'Nearby hiking trails through tea estates'
    },
    {
      id: 12,
      src: '/images/villa95-12.jpg',
      alt: 'Local Wildlife',
      category: 'Nature',
      description: 'Local wildlife and bird watching opportunities'
    }
  ];

  const categories = ['All', 'Exterior', 'Interior', 'Bedrooms', 'Views', 'Amenities', 'Activities', 'Nature'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Photo Gallery</h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-2xl mx-auto">
              Explore the beauty and luxury of Villa 95 through our stunning photography
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-amber-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className="group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  onClick={() => openLightbox(index)}
                >
                  {/* Placeholder for actual images */}
                  <div className="w-full h-64 bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center relative overflow-hidden">
                    <div className="text-center text-amber-800">
                      <div className="text-4xl mb-2">📸</div>
                      <p className="text-sm font-medium">{image.alt}</p>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-2xl mb-2">👁️</div>
                        <p className="text-sm">Click to view</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white">
                    <h3 className="font-semibold text-gray-900 mb-1">{image.alt}</h3>
                    <p className="text-sm text-gray-600">{image.description}</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                      {image.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {filteredImages.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📷</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No images found</h3>
                <p className="text-gray-600">Try selecting a different category</p>
              </div>
            )}
          </div>
        </section>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
            <div className="relative max-w-7xl max-h-full p-4">
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors duration-200"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Navigation buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors duration-200"
              >
                <ChevronLeft className="w-12 h-12" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors duration-200"
              >
                <ChevronRight className="w-12 h-12" />
              </button>

              {/* Image */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-full h-96 bg-gradient-to-br from-amber-200 to-amber-400 rounded-2xl flex items-center justify-center">
                  <div className="text-center text-amber-800">
                    <div className="text-8xl mb-4">📸</div>
                    <p className="text-2xl font-medium">{filteredImages[selectedImage].alt}</p>
                    <p className="text-lg">{filteredImages[selectedImage].description}</p>
                  </div>
                </div>
              </div>

              {/* Image info */}
              <div className="mt-4 text-center text-white">
                <p className="text-lg font-medium">{filteredImages[selectedImage].alt}</p>
                <p className="text-gray-300">{filteredImages[selectedImage].description}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {selectedImage + 1} of {filteredImages.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
