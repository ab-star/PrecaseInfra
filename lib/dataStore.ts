// Data store utilities for gallery and projects
// Uses localStorage for demo mode and Firebase for production
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

export interface GalleryImageData {
  id: string;
  url: string;
  key: string; // R2 key for deletion
  title: string;
  description?: string;
  category?: string;
  featured?: boolean;
  uploadDate: Date;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  category: string;
  location?: string;
  client?: string;
  startDate?: string;
  endDate?: string;
  status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold';
  features: string[];
  budget?: number;
  images: Array<{
    url: string;
    key: string;
    caption?: string;
  }>;
  createdAt: Date;
}

// Gallery Data Store
export class GalleryDataStore {
  // Save gallery image metadata
  static async saveImageMetadata(imageData: Omit<GalleryImageData, 'id' | 'uploadDate'>): Promise<string> {
    try {
      if (db) {
        // Save to Firebase
        const docRef = await addDoc(collection(db, 'gallery'), {
          ...imageData,
          uploadDate: serverTimestamp(),
        });
        return docRef.id;
      } else {
        // Save to localStorage for demo
        const images = this.getLocalImages();
        const newImage: GalleryImageData = {
          ...imageData,
          id: Date.now().toString(),
          uploadDate: new Date(),
        };
        images.push(newImage);
        localStorage.setItem('gallery_images', JSON.stringify(images));
        return newImage.id;
      }
    } catch (error) {
      console.error('Error saving image metadata:', error);
      throw error;
    }
  }

  // Get all gallery images
  static async getAllImages(): Promise<GalleryImageData[]> {
    try {
      if (db) {
        // Get from Firebase
        const q = query(collection(db, 'gallery'), orderBy('uploadDate', 'desc'));
        const querySnapshot = await getDocs(q);
        const images: GalleryImageData[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          images.push({
            id: doc.id,
            url: data.url,
            key: data.key,
            title: data.title,
            description: data.description,
            category: data.category,
            featured: data.featured || false,
            uploadDate: data.uploadDate.toDate(),
          });
        });
        
        return images;
      } else {
        // Get from localStorage
        return this.getLocalImages();
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      return this.getLocalImages(); // Fallback to local
    }
  }

  // Delete gallery image
  static async deleteImage(id: string): Promise<boolean> {
    try {
      if (db) {
        // Delete from Firebase
        await deleteDoc(doc(db, 'gallery', id));
        return true;
      } else {
        // Delete from localStorage
        const images = this.getLocalImages();
        const filtered = images.filter(img => img.id !== id);
        localStorage.setItem('gallery_images', JSON.stringify(filtered));
        return true;
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  }

  // Helper: Get local images
  private static getLocalImages(): GalleryImageData[] {
    try {
      const stored = localStorage.getItem('gallery_images');
      if (stored) {
        return JSON.parse(stored).map((img: Partial<GalleryImageData>) => ({
          ...img,
          uploadDate: new Date(img.uploadDate || Date.now()),
        })) as GalleryImageData[];
      }
      return [];
    } catch {
      return [];
    }
  }
}

// Projects Data Store
export class ProjectsDataStore {
  // Save project data
  static async saveProject(projectData: Omit<ProjectData, 'id' | 'createdAt'>): Promise<string> {
    try {
      if (db) {
        // Save to Firebase
        const docRef = await addDoc(collection(db, 'projects'), {
          ...projectData,
          createdAt: serverTimestamp(),
        });
        return docRef.id;
      } else {
        // Save to localStorage for demo
        const projects = this.getLocalProjects();
        const newProject: ProjectData = {
          ...projectData,
          id: Date.now().toString(),
          createdAt: new Date(),
        };
        projects.push(newProject);
        localStorage.setItem('projects_data', JSON.stringify(projects));
        return newProject.id;
      }
    } catch (error) {
      console.error('Error saving project:', error);
      throw error;
    }
  }

  // Get all projects
  static async getAllProjects(): Promise<ProjectData[]> {
    try {
      if (db) {
        // Get from Firebase
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const projects: ProjectData[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          projects.push({
            id: doc.id,
            title: data.title,
            description: data.description,
            category: data.category,
            location: data.location,
            client: data.client,
            startDate: data.startDate,
            endDate: data.endDate,
            status: data.status,
            features: data.features || [],
            budget: data.budget,
            images: data.images || [],
            createdAt: data.createdAt.toDate(),
          });
        });
        
        return projects;
      } else {
        // Get from localStorage
        return this.getLocalProjects();
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      return this.getLocalProjects(); // Fallback to local
    }
  }

  // Delete project
  static async deleteProject(id: string): Promise<boolean> {
    try {
      if (db) {
        // Delete from Firebase
        await deleteDoc(doc(db, 'projects', id));
        return true;
      } else {
        // Delete from localStorage
        const projects = this.getLocalProjects();
        const filtered = projects.filter(project => project.id !== id);
        localStorage.setItem('projects_data', JSON.stringify(filtered));
        return true;
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      return false;
    }
  }

  // Helper: Get local projects
  private static getLocalProjects(): ProjectData[] {
    try {
      const stored = localStorage.getItem('projects_data');
      if (stored) {
        return JSON.parse(stored).map((project: Partial<ProjectData>) => ({
          ...project,
          createdAt: new Date(project.createdAt || Date.now()),
        })) as ProjectData[];
      }
      return [];
    } catch {
      return [];
    }
  }
}
