"use client";
import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [stats] = useState({
    totalImages: 24,
    totalProjects: 12,
    featuredImages: 5,
    activeProjects: 8,
  });

  React.useEffect(() => {
    if (!user) {
      router.push('/admin/login');
    }
  }, [user, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-300"></div>
      </div>
    );
  }

  const menuItems = [
    {
      title: 'Gallery Management',
      description: 'Upload and manage gallery images',
      icon: '🖼️',
      href: '/admin/gallery',
      bgColor: 'from-blue-500 to-blue-600',
      stats: `${stats.totalImages} images`,
    },
    {
      title: 'Project Management',
      description: 'Upload and manage project data',
      icon: '🏗️',
      href: '/admin/projects',
      bgColor: 'from-green-500 to-green-600',
      stats: `${stats.totalProjects} projects`,
    },
    {
      title: 'Gallery R2 (Cloud Storage)',
      description: 'Upload gallery images to Cloudflare R2',
      icon: '☁️',
      href: '/admin/gallery-r2',
      bgColor: 'from-purple-500 to-purple-600',
      stats: 'R2 Storage',
    },
    {
      title: 'Projects R2 (Cloud Storage)',
      description: 'Upload projects to Cloudflare R2',
      icon: '🌐',
      href: '/admin/projects-r2',
      bgColor: 'from-orange-500 to-orange-600',
      stats: 'R2 Storage',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/concrete_texture.jpg')] bg-repeat"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="rounded-full p-1 bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 mr-4">
                <Image 
                  src="/brandIcon.jpeg" 
                  alt="Company Logo" 
                  width={50}
                  height={50}
                  className="rounded-full border-2 border-amber-500/50"
                  quality={100}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-gray-300">Infrastructure Management System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white font-medium">{user.displayName || 'Admin User'}</p>
                <p className="text-gray-400 text-sm">{user.email}</p>
              </div>
              
              <div className="flex gap-2">
                <Link
                  href="/"
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  View Site
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Welcome back, {user.displayName || 'Admin'}! 👋
          </h2>
          <p className="text-xl text-gray-300">
            Manage your infrastructure content and projects from this central dashboard.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Images</p>
                <p className="text-3xl font-bold text-white">{stats.totalImages}</p>
              </div>
              <div className="text-4xl">🖼️</div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Projects</p>
                <p className="text-3xl font-bold text-white">{stats.totalProjects}</p>
              </div>
              <div className="text-4xl">🏗️</div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Featured Images</p>
                <p className="text-3xl font-bold text-white">{stats.featuredImages}</p>
              </div>
              <div className="text-4xl">⭐</div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Projects</p>
                <p className="text-3xl font-bold text-white">{stats.activeProjects}</p>
              </div>
              <div className="text-4xl">🚀</div>
            </div>
          </div>
        </motion.div>

        {/* Management Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {menuItems.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <Link href={item.href}>
                <div className={`bg-gradient-to-br ${item.bgColor} rounded-2xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 border border-white/10`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div className="bg-white/20 rounded-full p-2 group-hover:bg-white/30 transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-white/90 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-white/80 mb-4 group-hover:text-white/70 transition-colors">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                      {item.stats}
                    </span>
                    <span className="text-sm font-medium group-hover:underline">
                      Manage →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/gallery" className="flex items-center gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors group">
              <div className="text-2xl">📤</div>
              <div>
                <p className="text-white font-medium group-hover:text-amber-300 transition-colors">Upload Images</p>
                <p className="text-gray-400 text-sm">Add new gallery images</p>
              </div>
            </Link>
            
            <Link href="/admin/projects" className="flex items-center gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors group">
              <div className="text-2xl">🗂️</div>
              <div>
                <p className="text-white font-medium group-hover:text-amber-300 transition-colors">Add Project</p>
                <p className="text-gray-400 text-sm">Create new project entry</p>
              </div>
            </Link>
            
            <Link href="/gallery" className="flex items-center gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors group">
              <div className="text-2xl">👁️</div>
              <div>
                <p className="text-white font-medium group-hover:text-amber-300 transition-colors">View Gallery</p>
                <p className="text-gray-400 text-sm">See public gallery</p>
              </div>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
