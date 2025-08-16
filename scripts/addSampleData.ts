// Script to add sample gallery data to Firebase Firestore
// Run this script once to populate your gallery collection

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_project.firebaseapp.com",
  projectId: "your_project_id",
  storageBucket: "your_project.appspot.com",
  messagingSenderId: "your_sender_id",
  appId: "your_app_id"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleImages = [
  {
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    title: 'Modern Box Culvert Installation',
    description: 'Advanced precast concrete box culvert system for highway drainage infrastructure.',
    category: 'Box Culvert',
    featured: true,
  },
  {
    url: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    title: 'Precast Concrete Walls',
    description: 'High-strength precast concrete wall panels for industrial construction.',
    category: 'Walls',
    featured: true,
  },
  {
    url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    title: 'Drainage System Implementation',
    description: 'Comprehensive drainage solutions for urban infrastructure development.',
    category: 'Drains',
    featured: true,
  },
  {
    url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    title: 'Construction Site Overview',
    description: 'Large-scale infrastructure project showcasing our construction capabilities.',
    category: 'Construction',
    featured: false,
  },
  {
    url: 'https://images.unsplash.com/photo-1622126807280-9b5b107ace46?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    title: 'Bridge Construction',
    description: 'Innovative bridge construction using precast concrete technology.',
    category: 'Bridge',
    featured: true,
  },
];

async function addSampleData() {
  console.log('Adding sample gallery data to Firestore...');
  
  try {
    for (const image of sampleImages) {
      await addDoc(collection(db, 'gallery'), {
        ...image,
        uploadDate: serverTimestamp(),
      });
      console.log(`Added: ${image.title}`);
    }
    console.log('✅ All sample data added successfully!');
  } catch (error) {
    console.error('❌ Error adding sample data:', error);
  }
}

// Uncomment the line below and run this script to add sample data
// addSampleData();

export { addSampleData };
