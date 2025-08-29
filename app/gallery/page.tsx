import GalleryPage from "../view-gallery/page";
export default GalleryPage;
"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useGalleryImages, GalleryImage } from '../../hooks/useGalleryImages';
import MainHeader from '../components/MainHeader';
import Footer from '../components/Footer';

const Gallery = () => {
  const { images, loading, error } = useGalleryImages();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);

  // Get featured images for carousel
  const featuredImages = images.filter(img => img.featured);
  const carouselImages = featuredImages.length > 0 ? featuredImages : images.slice(0, 5);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(images.map(img => img.category).filter(Boolean)))] as string[];

  // Filter images based on selected category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter(img => img.category === selectedCategory));
    }
  }, [images, selectedCategory]);

  // Auto-advance carousel
  useEffect(() => {
    if (carouselImages.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <MainHeader />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-300 mx-auto mb-4"></div>
            <p className="text-white text-xl">Loading Gallery...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <MainHeader />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <p className="text-red-400 text-xl mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">      
      {/* Hero Carousel Section */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0">
          <Image
            src="/concrete_texture.jpg"
            alt="Gallery background"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>

        {carouselImages.length > 0 && (
          <div className="relative h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={carouselImages[currentSlide]?.url || '/placeholder.jpg'}
                  alt={carouselImages[currentSlide]?.title || 'Gallery image'}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Content */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-16">
              <motion.div
                key={`content-${currentSlide}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-4xl"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  {carouselImages[currentSlide]?.title || 'Our Gallery'}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
                  {carouselImages[currentSlide]?.description || 'Showcasing our finest infrastructure projects and innovations'}
                </p>
                <div className="flex items-center gap-4">
                  <span className="px-4 py-2 bg-amber-500 text-white rounded-full text-sm font-semibold">
                    {carouselImages[currentSlide]?.category || 'Featured'}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Carousel Navigation */}
            <button
              onClick={prevSlide}
              className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-all"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full transition-all"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>

            {/* Carousel Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-amber-500' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Gallery Grid Section */}
      <section className="py-20 px-4 md:px-8 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/concrete_texture.jpg')] bg-repeat"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
              PROJECT SHOWCASE
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-amber-400">Infrastructure</span> Gallery
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our comprehensive portfolio of infrastructure projects, from cutting-edge precast solutions to large-scale construction innovations.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-amber-500 text-white shadow-lg transform scale-105'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Image Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-xl cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="aspect-w-4 aspect-h-3 relative">
                    <Image
                      src={image.url}
                      alt={image.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Image Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-bold text-lg mb-1 line-clamp-1">{image.title}</h3>
                    {image.description && (
                      <p className="text-sm text-gray-300 line-clamp-2">{image.description}</p>
                    )}
                    {image.category && (
                      <span className="inline-block mt-2 px-2 py-1 bg-amber-500 text-xs font-semibold rounded-full">
                        {image.category}
                      </span>
                    )}
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                    </svg>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredImages.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl text-gray-600 mb-4">📸</div>
              <h3 className="text-2xl font-bold text-white mb-2">No images found</h3>
              <p className="text-gray-400">No images match the selected category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-amber-400 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              
              <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1200px) 100vw, 80vw"
                />
              </div>
              
              <div className="bg-gray-800 p-6 rounded-b-lg">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="text-gray-300 mb-4">{selectedImage.description}</p>
                )}
                <div className="flex items-center justify-between">
                  {selectedImage.category && (
                    <span className="px-3 py-1 bg-amber-500 text-white text-sm font-semibold rounded-full">
                      {selectedImage.category}
                    </span>
                  )}
                  <span className="text-gray-400 text-sm">
                    {selectedImage.uploadDate.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Gallery;
