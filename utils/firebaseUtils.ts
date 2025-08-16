// This file contains utility functions for Firebase operations
// Use this in your admin panel or for bulk uploads

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';

export interface UploadImageData {
  title: string;
  description?: string;
  category?: string;
  featured?: boolean;
}

export const uploadImageToGallery = async (
  file: File,
  imageData: UploadImageData
): Promise<string> => {
  try {
    // Upload image to Firebase Storage
    const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Save image metadata to Firestore
    await addDoc(collection(db, 'gallery'), {
      url: downloadURL,
      title: imageData.title,
      description: imageData.description,
      category: imageData.category,
      featured: imageData.featured || false,
      uploadDate: serverTimestamp(),
    });

    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};

// Example usage in a React component:
/*
const handleImageUpload = async (file: File) => {
  try {
    const imageData: UploadImageData = {
      title: "Your Image Title",
      description: "Your image description",
      category: "Box Culvert",
      featured: true
    };
    
    const url = await uploadImageToGallery(file, imageData);
    console.log('Image uploaded successfully:', url);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
*/
