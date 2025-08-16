import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { sampleGalleryImages } from '../data/sampleGalleryData';

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description?: string;
  category?: string;
  uploadDate: Date;
  featured?: boolean;
}

export const useGalleryImages = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        
        // Check if Firebase is properly configured
        if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
          // Use sample data if Firebase is not configured
          console.log('Firebase not configured, using sample data');
          setImages(sampleGalleryImages);
          setError(null);
          setLoading(false);
          return;
        }
        
        const q = query(
          collection(db, 'gallery'),
          orderBy('uploadDate', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedImages: GalleryImage[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedImages.push({
            id: doc.id,
            url: data.url,
            title: data.title,
            description: data.description,
            category: data.category,
            uploadDate: data.uploadDate.toDate(),
            featured: data.featured || false,
          });
        });
        
        setImages(fetchedImages);
        setError(null);
      } catch (err) {
        console.error('Error fetching gallery images:', err);
        // Fallback to sample data on error
        console.log('Falling back to sample data');
        setImages(sampleGalleryImages);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return { images, loading, error };
};
