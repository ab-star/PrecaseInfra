'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useRequireAdminSession } from '../_hooks/useRequireAdminSession';
import { uploadMultipleImagesToR2, deleteImageFromR2, testR2Connection } from '../../../lib/r2Storage';
import { ProjectsDataStore, ProjectData } from '../../../lib/dataStore';
import Image from 'next/image';
import toast from 'react-hot-toast';

const AdminProjectsR2 = () => {
  useRequireAdminSession();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [r2Status, setR2Status] = useState<'checking' | 'connected' | 'error'>('checking');
  
  // Form state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    client: '',
    startDate: '',
    endDate: '',
    status: 'Planning' as 'Planning' | 'In Progress' | 'Completed' | 'On Hold',
    features: [] as string[],
    budget: '',
  });
  const [newFeature, setNewFeature] = useState('');

  const categories = [
    'Box Culvert',
    'Roads',
    'Railways', 
    'Water Management',
    'Power Infrastructure',
    'Industrial',
    'Bridge Construction',
    'Tunnel',
    'Urban Development',
    'Highway',
  ];

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

  // Load existing projects
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const fetchedProjects = await ProjectsDataStore.getAllProjects();
      setProjects(fetchedProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
      toast.error('Failed to load projects');
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

  const handleFormChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

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

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast.error('Please enter a project title');
      return;
    }

    if (!formData.description.trim()) {
      toast.error('Please enter a project description');
      return;
    }

    if (selectedFiles.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    try {
      setUploading(true);
      
      let projectImages: Array<{ url: string; key: string; caption?: string }> = [];

      if (r2Status !== 'connected') {
        toast.error('R2 storage not connected. Using demo mode.');
        // Demo mode - create mock URLs
        projectImages = selectedFiles.map(file => ({
          url: URL.createObjectURL(file),
          key: `demo_${Date.now()}_${file.name}`,
          caption: file.name,
        }));
      } else {
        // Upload to R2
        const uploadResults = await uploadMultipleImagesToR2(selectedFiles, 'projects');
        projectImages = uploadResults.map((result, index) => ({
          url: result.url,
          key: result.key,
          caption: selectedFiles[index].name,
        }));
      }

      // Save project data
      const projectData: Omit<ProjectData, 'id' | 'createdAt'> = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location || undefined,
        client: formData.client || undefined,
        startDate: formData.startDate || undefined,
        endDate: formData.endDate || undefined,
        status: formData.status,
        features: formData.features,
        budget: formData.budget ? parseFloat(formData.budget) : undefined,
        images: projectImages,
      };

      await ProjectsDataStore.saveProject(projectData);

      toast.success('Project uploaded successfully!');
      
      // Reset form
      setSelectedFiles([]);
      setFormData({
        title: '',
        description: '',
        category: '',
        location: '',
        client: '',
        startDate: '',
        endDate: '',
        status: 'Planning',
        features: [],
        budget: '',
      });
      
      // Reload projects
      loadProjects();
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload project');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteProject = async (project: ProjectData) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      // Delete images from R2 if not demo
      if (r2Status === 'connected') {
        for (const image of project.images) {
          if (!image.key.startsWith('demo_')) {
            await deleteImageFromR2(image.key);
          }
        }
      }
      
      // Delete project metadata
      await ProjectsDataStore.deleteProject(project.id);
      
      toast.success('Project deleted successfully');
      loadProjects();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete project');
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
              <h1 className="text-3xl font-bold text-gray-900">Projects Management (Cloudflare R2)</h1>
              <p className="text-gray-600 mt-2">Upload and manage project portfolios with Cloudflare R2 storage</p>
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
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload New Project</h2>
            
            <div className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleFormChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Enter project title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleFormChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter project description"
                />
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleFormChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Project location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Client
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => handleFormChange('client', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Client name"
                  />
                </div>
              </div>

              {/* Dates and Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleFormChange('startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleFormChange('endDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleFormChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
              </div>

              {/* Budget and Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget (Optional)
                </label>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => handleFormChange('budget', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter budget amount"
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key Features
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Add a feature"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
                  >
                    Add
                  </button>
                </div>
                {formData.features.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(feature)}
                          className="ml-2 text-amber-600 hover:text-amber-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* File Upload Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Images *
                </label>
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
                    <div className="grid grid-cols-2 gap-2">
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
              </div>

              <button
                onClick={handleSubmit}
                disabled={uploading || selectedFiles.length === 0}
                className="w-full bg-amber-600 text-white py-3 px-4 rounded-md hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading Project...' : 'Upload Project'}
              </button>
            </div>
          </div>

          {/* Existing Projects */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Existing Projects ({projects.length})
            </h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {projects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{project.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{project.category}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {project.createdAt.toLocaleDateString()} • {project.images.length} images
                      </p>
                      <div className="mt-2">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          project.status === 'On Hold' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                    {project.images.length > 0 && (
                      <Image
                        src={project.images[0].url}
                        alt={project.title}
                        width={60}
                        height={60}
                        className="w-15 h-15 object-cover rounded-lg ml-4"
                      />
                    )}
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => handleDeleteProject(project)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              
              {projects.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No projects uploaded yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProjectsR2;
