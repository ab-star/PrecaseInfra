"use client";
import React, { useState, useEffect, useRef, Suspense } from 'react';
// 3D Model Loader Component
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function BoxCulvertModel() {
  try {
    const gltf = useGLTF('/product/BoxCulvertProduct/glb/SqareBlock.glb');
    
    if (!gltf || !gltf.scene) {
      console.log('GLB file loaded but no scene found');
      return (
        <mesh>
          <boxGeometry args={[2, 1, 3]} />
          <meshStandardMaterial color="#8B5CF6" />
        </mesh>
      );
    }
    
    console.log('GLB loaded successfully:', gltf);
    return <primitive object={gltf.scene} scale={2} position={[0, -1, 0]} />;
  } catch (error) {
    console.error('Error loading GLB:', error);
    return (
      <mesh>
        <boxGeometry args={[2, 1, 3]} />
        <meshStandardMaterial color="#EF4444" />
      </mesh>
    );
  }
}
import { motion } from 'framer-motion';
import Image from 'next/image';

// Scroll-Locked Image Transition Component
const transitionImages = [
  '/product/BoxCulvertProduct/transition/1.webp',
  '/product/BoxCulvertProduct/transition/2.webp',
  '/product/BoxCulvertProduct/transition/3.webp',
  '/product/BoxCulvertProduct/transition/4.webp',
  '/product/BoxCulvertProduct/transition/5.webp',
  '/product/BoxCulvertProduct/transition/6.webp',
];

function ScrollLockedImageTransition() {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isProcessing = useRef(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current || isProcessing.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const windowHeight = window.innerHeight;
      
      // Check if section is in viewport (with some buffer)
      const isInViewport = sectionTop <= 50 && sectionBottom >= windowHeight - 50;
      
      if (!isInViewport) return;
      
      // Prevent default scroll behavior
      e.preventDefault();
      e.stopPropagation();
      
      isProcessing.current = true;
      
      const direction = e.deltaY > 0 ? 1 : -1; // 1 for down, -1 for up
      
      if (direction > 0) {
        // Scrolling down
        if (index < transitionImages.length - 1) {
          setIndex(prev => prev + 1);
        } else {
          // At last image, allow page scroll
          window.scrollBy({ top: 200, behavior: 'smooth' });
        }
      } else {
        // Scrolling up
        if (index > 0) {
          setIndex(prev => prev - 1);
        } else {
          // At first image, allow page scroll
          window.scrollBy({ top: -200, behavior: 'smooth' });
        }
      }
      
      // Reset processing flag after a delay
      setTimeout(() => {
        isProcessing.current = false;
      }, 300);
    };

    // Use document instead of window for better compatibility
    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, [index]);

  return (
    <div 
      ref={sectionRef} 
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Debug indicator - remove in production */}
      <div className="absolute top-4 right-4 z-50 bg-red-500 text-white px-2 py-1 rounded text-xs">
        Current Image: {index + 1} / {transitionImages.length}
      </div>
      
      {/* Background overlay for better contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-20" />
      
      {/* Images with smooth transitions */}
      {transitionImages.map((src, i) => (
        <div
          key={src}
          className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out transform ${
            i === index 
              ? 'opacity-100 scale-100 z-10' 
              : i < index 
                ? 'opacity-0 scale-95 z-0 translate-x-[-10%]'
                : 'opacity-0 scale-95 z-0 translate-x-[10%]'
          }`}
        >
          <Image
            src={src}
            alt={`Box Culvert Process Step ${i + 1}`}
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            priority={i <= 1}
          />
        </div>
      ))}
      
      {/* Progress indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-3 bg-black bg-opacity-60 px-6 py-3 rounded-full backdrop-blur-sm">
          {transitionImages.map((_, i) => (
            <div
              key={i}
              className={`transition-all duration-500 ${
                i === index 
                  ? 'w-12 h-3 bg-white rounded-full' 
                  : 'w-3 h-3 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigator buttons */}
      <div className="absolute inset-0 flex items-center justify-between px-4 z-30 pointer-events-none">
        <button
          onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
          className="pointer-events-auto h-12 w-12 rounded-full bg-black/60 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm border border-white/20"
          aria-label="Previous"
        >
          <span className="sr-only">Previous</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>
        <button
          onClick={() => setIndex((prev) => Math.min(prev + 1, transitionImages.length - 1))}
          className="pointer-events-auto h-12 w-12 rounded-full bg-black/60 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm border border-white/20"
          aria-label="Next"
        >
          <span className="sr-only">Next</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="m10 6-1.41 1.41L13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </button>
      </div>
      
      {/* Image counter and description */}
      <div className="absolute top-12 left-12 z-20 text-white">
        <div className="bg-black bg-opacity-60 px-4 py-2 rounded-lg backdrop-blur-sm">
          <div className="text-sm font-medium mb-1">
            Step {index + 1} of {transitionImages.length}
          </div>
          <div className="text-xs opacity-90">
            Box Culvert Installation Process
          </div>
        </div>
      </div>
      
  {/* Scroll instruction */}
      {index === 0 && (
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-20 text-white text-center animate-bounce">
          <div className="bg-black bg-opacity-60 px-4 py-2 rounded-lg backdrop-blur-sm">
            <div className="text-sm">Scroll to explore the process</div>
            <div className="text-xs opacity-75 mt-1">↓</div>
          </div>
        </div>
      )}
    </div>
  );
}

const ProfessionalBoxCulvertPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeInOut" }
  };

  return (
    <div className="bg-white font-sans pt-28">
    {/* Hero Section - Fullscreen Video (R2) */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-30 pointer-events-none" />
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
      src="https://pub-ff6f7349f0ca4f698e9006f92b5c1c8a.r2.dev/BoxVideo/BoxVideo1.mp4"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
        />
        <div className="relative flex flex-col items-center justify-center h-full w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-white text-5xl md:text-7xl font-bold tracking-wide drop-shadow-lg mb-6"
          >
            Introducing Box Culvert
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-white text-xl md:text-2xl font-light max-w-2xl mx-auto drop-shadow"
          >
            High-Strength | Precision Engineering | Rapid Installation
          </motion.p>
        </div>
      </section>

      {/* Interactive 3D Model Section */}
      <section className="relative w-full h-screen bg-white flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0" />
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          <div className="w-full h-[60vh] md:h-[70vh] flex items-center justify-center">
            <Suspense fallback={<div className='text-center text-gray-400'>Loading 3D Model...</div>}>
              <Canvas 
                camera={{ position: [5, 5, 5], fov: 50 }} 
                style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0' }}
                onCreated={() => console.log('Canvas created')}
              >
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <pointLight position={[-10, -10, -5]} intensity={0.5} />
                <OrbitControls enablePan={false} enableZoom={true} />
                <BoxCulvertModel />
              </Canvas>
            </Suspense>
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Explore the Box Culvert in 3D</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Interact with the model to view geometry, jointing, and design details from every angle. Built for precision and strength.</p>
          </div>
        </div>
      </section>

      {/* Strength Showcase Section (Split) */}
      <section className="w-full h-screen flex flex-col md:flex-row items-center justify-center bg-white">
        <div className="flex-1 flex flex-col justify-center items-start px-8 md:px-20 py-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Strength That Lasts Generations</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-xl">
            Our Box Culverts are engineered for exceptional durability and load-bearing capacity. Built with high-performance concrete and reinforced steel, they withstand the harshest conditions and the heaviest loads, ensuring your infrastructure stands the test of time.
          </p>
          <ul className="space-y-3 text-gray-700 text-base">
            <li><span className="font-bold text-blue-600">•</span> Designed for Indian highways & railways</li>
            <li><span className="font-bold text-blue-600">•</span> 100+ year design life</li>
            <li><span className="font-bold text-blue-600">•</span> Exceeds IS, IRC, and IRS standards</li>
          </ul>
        </div>
        <div className="flex-1 flex items-center justify-center h-full p-8">
          <Image src="/product/BoxCulvertProduct/strong/strong.webp" alt="Box Culvert Strength" width={600} height={600} className="object-contain rounded-xl shadow-2xl max-h-[70vh]" />
        </div>
      </section>

      {/* Scroll-Locked Image Transition Section */}
      <section className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
        <ScrollLockedImageTransition />
        
      </section>

      {/* Creative/Custom Section: Project Gallery */}
      <section className="w-full h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex flex-col items-center justify-center text-white px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-yellow-400 text-center">Project Gallery</h2>
        <p className="text-lg max-w-2xl mb-10 text-center text-blue-100">See our Box Culverts in action across major infrastructure projects. Built for reliability, trusted by industry leaders.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <Image src="/product/BoxCulvertProduct/gallery/1.webp" alt="Project 1" width={400} height={300} className="rounded-lg shadow-lg object-cover w-full h-64" />
          <Image src="/product/BoxCulvertProduct/gallery/2.webp" alt="Project 2" width={400} height={300} className="rounded-lg shadow-lg object-cover w-full h-64" />
          <Image src="/product/BoxCulvertProduct/gallery/3.webp" alt="Project 3" width={400} height={300} className="rounded-lg shadow-lg object-cover w-full h-64" />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-slate-900 text-white py-12 px-6 flex flex-col md:flex-row items-center md:items-start justify-between">
        <div className="mb-8 md:mb-0">
          <h3 className="text-2xl font-bold mb-2">Infrastire</h3>
          <p className="text-blue-100 mb-2">4th Floor, Magnet Corporate Park<br/>Near Sola Flyover, S.G. Highway<br/>Thaltej, Ahmedabad, Gujarat - 380 054</p>
          <p className="text-blue-100">© {new Date().getFullYear()} Infrastire. All rights reserved.</p>
        </div>
        <div className="mb-8 md:mb-0">
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-blue-100">📞 +91 79 4021 0000</p>
          <p className="text-blue-100">✉️ askexpert@infrastire.com</p>
        </div>
        <div className="mb-8 md:mb-0">
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline text-blue-100">Home</a></li>
            <li><a href="#" className="hover:underline text-blue-100">Products</a></li>
            <li><a href="#" className="hover:underline text-blue-100">Projects</a></li>
            <li><a href="#" className="hover:underline text-blue-100">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-400 hover:text-white">LinkedIn</a>
            <a href="#" className="text-blue-400 hover:text-white">Twitter</a>
            <a href="#" className="text-blue-400 hover:text-white">Facebook</a>
          </div>
        </div>
      </footer>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900">EVERYTHING PERFECT AND PRECISE.</h2>
            <p className="mt-4 text-gray-600 text-lg">
              Unmatched dimensional accuracy and tolerances unlike any other in civil infrastructure.
            </p>
          </div>
          <div className="mt-16 grid md:grid-cols-3 gap-10 text-center">
            <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }} className="border p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-blue-600">± 5 mm</h3>
              <h4 className="mt-2 text-xl font-semibold text-slate-800">PRECISE SEGMENT LENGTHS</h4>
              <p className="mt-2 text-gray-500">Enables best predictions for the construction site, avoiding last-minute installation hassles.</p>
            </motion.div>
            <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ delay: 0.2 }} className="border p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-blue-600">± 5 mm</h3>
              <h4 className="mt-2 text-xl font-semibold text-slate-800">STRAIGHT EDGES</h4>
              <p className="mt-2 text-gray-500">Enables piece-by-piece fitting, just like Lego. It has no extraordinary gaps.</p>
            </motion.div>
            <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ delay: 0.4 }} className="border p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-blue-600">± 3 mm</h3>
              <h4 className="mt-2 text-xl font-semibold text-slate-800">ACCURATE THICKNESSES</h4>
              <p className="mt-2 text-gray-500">Designed to perform and optimised to save.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#f7f7f7] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
              <h2 className="text-4xl font-bold text-slate-900">FEATURING FORM, FIT AND FUNCTION.</h2>
              <p className="mt-4 text-lg text-gray-600">
                Uncompromised jointing arrangements in-built as well as on-site connection to ensure fit and functionality after installation.
              </p>
              <div className="mt-8 space-y-5">
                <div className="p-4 border-l-4 border-blue-600 bg-white">
                  <h4 className="font-bold text-slate-800">MORTAR GROOVE</h4>
                  <p className="text-gray-600">To fill in mortar for zero gaps leaving zero probability of leakage.</p>
                </div>
                <div className="p-4 border-l-4 border-blue-600 bg-white">
                  <h4 className="font-bold text-slate-800">RUBBER GASKET GROOVE</h4>
                  <p className="text-gray-600">To fit in a rubber gasket that provides a water-proof character.</p>
                </div>
                <div className="p-4 border-l-4 border-blue-600 bg-white">
                  <h4 className="font-bold text-slate-800">SOCKET & PLUG</h4>
                  <p className="text-gray-600">To allow for a close and smooth transition of segments.</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="flex justify-center">
              <Image src="/product/product-2.jpeg" alt="Box Culvert Features" width={500} height={500} className="rounded-lg shadow-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Structural Integrity Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="flex justify-center">
              <Image src="/product/product-3.jpeg" alt="Structural Integrity" width={500} height={500} className="rounded-lg shadow-xl" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
              <h2 className="text-4xl font-bold text-slate-900">STRUCTURALLY INTEGRATED</h2>
              <p className="mt-4 text-lg text-gray-600">
                Designed with high-performance concrete and high-strength steel to sustain project-specific loading for highway classes or railway categories.
              </p>
              <ul className="mt-8 space-y-3 list-disc list-inside text-gray-700">
                <li>Reinforcement details as per precast design</li>
                <li>Type of steel and grade of concrete (Fe500D/Fe550D)</li>
                <li>Accurate in terms of cutting length, curvature and spacing of rebars</li>
                <li>Use of CPCC and CRS steel for durability</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Table */}
      <section className="bg-[#f7f7f7] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900">TECHNICAL SPECIFICATIONS</h2>
            <p className="mt-4 text-gray-600 text-lg">
              Our Precast Box Culverts are manufactured to meet rigorous industry standards.
            </p>
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="mt-12 shadow-lg rounded-lg overflow-hidden border">
            <table className="w-full text-left bg-white">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="p-4 font-semibold">Parameter</th>
                  <th className="p-4 font-semibold">Specification</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-medium text-gray-800">Loading Class</td>
                  <td className="p-4 text-gray-600">70R, Class A, Class AA, Indian Railway Loading</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">Concrete Grade</td>
                  <td className="p-4 text-gray-600">M40, M50, M60 (High-performance self-compacting)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium text-gray-800">Steel Grade</td>
                  <td className="p-4 text-gray-600">Fe500D, Fe550D (High Strength Deformed Steel)</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">Dimensional Tolerance</td>
                  <td className="p-4 text-gray-600">Length/Width: ±5mm, Thickness: ±3mm</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium text-gray-800">Joint Type</td>
                  <td className="p-4 text-gray-600">Mortar Groove, Rubber Gasket, Socket & Plug</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">Applicable Standards</td>
                  <td className="p-4 text-gray-600">IS 456, IRC Codes, IRS Concrete Bridge Code</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold">LET’S REVOLUTIONISE THE PRECAST INDUSTRY</h2>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Ready to experience superior quality and construction speed? Contact our experts for customized solutions and let&apos;s precast the future, together.
          </p>
          <div className="mt-8">
            <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              GET A QUOTE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfessionalBoxCulvertPage;
