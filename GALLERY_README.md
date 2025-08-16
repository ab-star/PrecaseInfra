# Gallery Page Setup Guide

## Overview
The gallery page features a professional image showcase with:
- Hero carousel section with featured images
- Responsive grid layout with category filtering
- Image optimization and lazy loading
- Firebase Firestore integration
- Modal view for detailed image inspection
- Smooth animations and transitions

## Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Firestore Database
4. Enable Storage (for image uploads)

### 2. Configure Firestore Database
Create a collection called `gallery` with documents containing:
```javascript
{
  url: "https://your-image-url.com/image.jpg",
  title: "Image Title",
  description: "Image description",
  category: "Box Culvert", // or "Drains", "Walls", etc.
  featured: true, // boolean - will appear in carousel
  uploadDate: firebase.firestore.Timestamp.now()
}
```

### 3. Environment Variables
Copy `.env.example` to `.env.local` and fill in your Firebase config:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Features

### Hero Carousel
- Auto-advancing slideshow (5-second intervals)
- Manual navigation with arrow buttons
- Dot indicators for direct slide access
- Featured images are prioritized
- Overlay text with image title and description

### Image Grid
- Responsive masonry-style layout
- Category-based filtering
- Hover effects with zoom and overlay
- Click to open in modal view
- Optimized image loading with Next.js Image component

### Categories
The system supports the following categories:
- Box Culvert
- Drains
- Walls
- Construction
- Bridge
- Industrial
- Highway
- Tunnel
- Railway
- Manufacturing

### Optimization Features
- **Image Optimization**: Next.js Image component with automatic WebP conversion
- **Lazy Loading**: Images load only when they enter the viewport
- **Responsive Images**: Different sizes served based on screen size
- **Performance**: Framer Motion animations with GPU acceleration
- **SEO Friendly**: Proper alt tags and semantic HTML

## Testing Without Firebase
If Firebase is not configured, the gallery will automatically use sample data from `data/sampleGalleryData.ts`.

## Customization

### Adding New Categories
1. Add images with new category to Firestore
2. Categories will automatically appear in the filter

### Styling
The gallery uses your existing design system:
- Amber/gold accent colors (#ffb300)
- Blue secondary colors
- Gray/concrete backgrounds
- 'Quattro Slab' font family

### Animation Timing
Adjust animation timings in the component:
- Carousel auto-advance: 5000ms
- Image hover animations: 300-500ms
- Modal transitions: 500ms

## File Structure
```
app/
├── gallery/
│   └── page.tsx              # Main gallery page
├── components/
│   └── MainHeader.tsx        # Updated with gallery link
hooks/
└── useGalleryImages.ts       # Firebase data fetching hook
lib/
└── firebase.ts               # Firebase configuration
utils/
└── firebaseUtils.ts          # Upload utilities
data/
└── sampleGalleryData.ts      # Sample data for testing
```

## Upload New Images
Use the `uploadImageToGallery` function from `utils/firebaseUtils.ts` to programmatically upload images, or add them directly to Firestore.

## Performance Tips
1. Keep image file sizes under 2MB
2. Use appropriate image dimensions (recommended: 1200x800px)
3. Compress images before upload
4. Limit featured images to 5-8 for optimal carousel performance
