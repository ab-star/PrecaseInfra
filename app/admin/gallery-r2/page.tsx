'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useRequireAdminSession } from '../_hooks/useRequireAdminSession';
import Image from 'next/image';
import { uploadImageToR2, deleteImageFromR2, testR2Connection } from '../../../lib/r2Storage';
import { GalleryDataStore, GalleryImageData } from '../../../lib/dataStore';
import toast from 'react-hot-toast';

const AdminGalleryR2 = () => {
  useRequireAdminSession();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [images, setImages] = useState<GalleryImageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [r2Status, setR2Status] = useState<'checking' | 'connected' | 'error'>('checking');
  
  // Form state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [featured, setFeatured] = useState(false);

  // Check authentication
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, authLoading, router]);

  // Check R2 connection
  useEffect(() => {
    const checkR2 = async () => {
      try {
        const isConnected = await testR2Connection();
        setR2Status(isConnected ? 'connected' : 'error');
      } catch {
        setR2Status('error');
      }
    };
    checkR2();
  }, []);

  // Load existing images
  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      setLoading(true);
      const fetchedImages = await GalleryDataStore.getAllImages();
      setImages(fetchedImages);
    } catch (error) {
      console.error('Error loading images:', error);
      toast.error('Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate file types
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      
      if (!isImage) {
        toast.error(`${file.name} is not a valid image file`);
        return false;
      }
      if (!isValidSize) {
        toast.error(`${file.name} is too large (max 10MB)`);
        return false;
      }
      return true;
    });
    
    setSelectedFiles(validFiles);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isValidSize = file.size <= 10 * 1024 * 1024;
      
      if (!isImage) {
        toast.error(`${file.name} is not a valid image file`);
        return false;
      }
      if (!isValidSize) {
        toast.error(`${file.name} is too large (max 10MB)`);
        return false;
      }
      return true;
    });
    
    setSelectedFiles(validFiles);
  }, []);

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    try {
      setUploading(true);
      
      if (r2Status !== 'connected') {
        toast.error('R2 storage not connected. Using demo mode.');
        // Demo mode - just add to local storage
        for (const file of selectedFiles) {
          const demoUrl = URL.createObjectURL(file);
          await GalleryDataStore.saveImageMetadata({
            url: demoUrl,
            key: `demo_${Date.now()}_${file.name}`,
            title,
            description,
            category,
            featured,
          });
        }
      } else {
        // Upload to R2 and save metadata
        for (const file of selectedFiles) {
          const uploadResult = await uploadImageToR2(file, 'gallery');
          
          await GalleryDataStore.saveImageMetadata({
            url: uploadResult.url,
            key: uploadResult.key,
            title,
            description,
            category,
            featured,
          });
        }
      }

      toast.success(`Successfully uploaded ${selectedFiles.length} image(s)`);
      
      // Reset form
      setSelectedFiles([]);
      setTitle('');
      setDescription('');
      setCategory('');
      setFeatured(false);
      
      // Reload images
      loadImages();
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (image: GalleryImageData) => {
    if (!confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      // Delete from R2 if not demo
      if (r2Status === 'connected' && !image.key.startsWith('demo_')) {
        await deleteImageFromR2(image.key);
      }
      
      // Delete metadata
      await GalleryDataStore.deleteImage(image.id);
      
      toast.success('Image deleted successfully');
      loadImages();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete image');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gallery Management (Cloudflare R2)</h1>
              <p className="text-gray-600 mt-2">Upload and manage gallery images with Cloudflare R2 storage</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                r2Status === 'connected' ? 'bg-green-100 text-green-800' :
                r2Status === 'error' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {r2Status === 'connected' ? '✓ R2 Connected' :
                 r2Status === 'error' ? '✗ R2 Error (Demo Mode)' :
                 '○ Checking R2...'}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload New Images</h2>
            
            {/* File Upload Area */}
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-amber-400 transition-colors"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="space-y-2">
                  <div className="text-4xl text-gray-400">📁</div>
                  <div className="text-lg font-medium text-gray-900">
                    Drop images here or click to browse
                  </div>
                  <div className="text-sm text-gray-500">
                    Supports JPG, PNG, WebP (max 10MB each)
                  </div>
                </div>
              </label>
            </div>

            {/* Selected Files */}
            {selectedFiles.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Selected Files ({selectedFiles.length})
                </h3>
                <div className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm text-gray-700 truncate">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Form */}
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter image title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter image description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Select Category</option>
                  <option value="Box Culvert">Box Culvert</option>
                  <option value="Roads">Roads</option>
                  <option value="Railways">Railways</option>
                  <option value="Water">Water</option>
                  <option value="Power">Power</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  id="featured"
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                  Featured Image
                </label>
              </div>

              <button
                onClick={handleUpload}
                disabled={uploading || selectedFiles.length === 0}
                className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : `Upload ${selectedFiles.length} Image(s)`}
              </button>
            </div>
          </div>

          {/* Existing Images */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Existing Images ({images.length})
            </h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {images.map((image) => (
                <div key={image.id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                  <Image
                    src={image.url}
                    alt={image.title}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {image.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {image.category} • {image.uploadDate.toLocaleDateString()}
                    </p>
                    {image.featured && (
                      <span className="inline-block mt-1 px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteImage(image)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
              
              {images.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No images uploaded yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGalleryR2;
