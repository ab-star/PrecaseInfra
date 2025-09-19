"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const ProductFooter = () => {
  const socialLinks = [
    { name: 'LinkedIn', url: '#', icon: '📧' },
    { name: 'Twitter', url: '#', icon: '🐦' },
    { name: 'Facebook', url: '#', icon: '📘' },
    { name: 'Instagram', url: '#', icon: '📷' }
  ];

  const quickLinks = [
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/aboutus' },
    { name: 'Products', url: '/products' },
    { name: 'Contact', url: '/contact' }
  ];

  const productLinks = [
    { name: 'Box Culvert', url: '/products/box-culvert' },
    { name: 'Pipes', url: '/products/pipes' },
    { name: 'Manholes', url: '/products/manholes' },
    { name: 'Custom Solutions', url: '/products/custom' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <Image 
                src="/brandIcon.jpeg" 
                alt="Company Logo" 
                width={48} 
                height={48} 
                className="rounded-full" 
              />
              <h3 className="text-2xl font-bold">InfraStire</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Leading manufacturer of precast concrete infrastructure solutions. 
              Building the future with precision-engineered products.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-xl font-bold">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    href={link.url}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                  >
                    <span>→</span>
                    <span>{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-xl font-bold">Products</h4>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    href={link.url}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                  >
                    <span>→</span>
                    <span>{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-xl font-bold">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-blue-400 mt-1">📍</span>
                <div>
                  <p className="text-gray-400">
                    123 Industrial Avenue<br />
                    Construction City, CC 12345
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-blue-400">📞</span>
                <p className="text-gray-400">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-blue-400">✉️</span>
                <p className="text-gray-400">info@infrastire.com</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="border-t border-gray-800 py-6"
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © 2025 InfraStire. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/safety-policy" className="text-gray-400 hover:text-white transition-colors">
              Safety Policy
            </Link>
            <Link href="/quality-policy" className="text-gray-400 hover:text-white transition-colors">
              Quality Policy
            </Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default ProductFooter;
