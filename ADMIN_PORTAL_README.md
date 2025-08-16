# Admin Portal Documentation

## Overview
A comprehensive admin portal for managing gallery images and project data with Firebase integration and demo authentication.

## Features
- **User Authentication**: Demo login with sample credentials
- **Gallery Management**: Upload and manage gallery images with categories
- **Project Management**: Add and manage project data with multiple images
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Instant feedback with toast notifications
- **Firebase Integration**: Firestore database and Storage for files

## Demo Credentials
```
Email: admin@infrastire.com
Password: admin123
```

## Admin Portal Structure

### 1. Login Page (`/admin/login`)
- Professional login interface
- Demo credentials display
- Form validation
- Loading states
- Responsive design

### 2. Dashboard (`/admin/dashboard`)
- Overview statistics
- Quick action buttons
- Navigation to management pages
- User profile display

### 3. Gallery Management (`/admin/gallery`)
- Upload single images (max 5MB)
- Add title, description, category
- Mark as featured for carousel
- View existing gallery images
- Image preview functionality

### 4. Project Management (`/admin/projects`)
- Add comprehensive project data
- Upload multiple images per project (max 5 images, 5MB each)
- Project details:
  - Title, description, location
  - Category and status
  - Start/end dates
  - Client information
  - Project area/scale
  - Key features (tags)
- View existing projects in grid layout

## File Structure
```
app/
├── admin/
│   ├── layout.tsx              # Admin-specific layout with auth
│   ├── login/
│   │   └── page.tsx           # Login page
│   ├── dashboard/
│   │   └── page.tsx           # Main dashboard
│   ├── gallery/
│   │   └── page.tsx           # Gallery management
│   └── projects/
│       └── page.tsx           # Project management
├── gallery/
│   └── page.tsx               # Public gallery page
contexts/
└── AuthContext.tsx            # Authentication context
components/
└── ClientWrapper.tsx          # Auth provider wrapper
utils/
└── firebaseUtils.ts           # Firebase utility functions
```

## Firebase Collections

### Gallery Collection (`gallery`)
```javascript
{
  url: "https://storage.googleapis.com/...",
  title: "Image Title",
  description: "Optional description",
  category: "Box Culvert", // or other categories
  featured: true, // boolean for carousel
  uploadDate: firebase.firestore.Timestamp
}
```

### Projects Collection (`projects`)
```javascript
{
  title: "Project Title",
  description: "Project description",
  location: "Project location",
  category: "Box Culvert", // project category
  status: "Completed", // Planning, In Progress, Completed, On Hold
  startDate: firebase.firestore.Timestamp,
  endDate: firebase.firestore.Timestamp, // optional
  images: ["url1", "url2", ...], // array of image URLs
  features: ["feature1", "feature2", ...], // array of key features
  client: "Client name",
  area: "Project scale/area",
  createdAt: firebase.firestore.Timestamp
}
```

## Setup Instructions

### 1. Firebase Setup
1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Authentication, Firestore Database, and Storage
3. Get your Firebase configuration from Project Settings
4. Copy `.env.example` to `.env.local` and fill in your config

### 2. Firestore Security Rules
```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /gallery/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /projects/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 3. Storage Security Rules
```javascript
// Storage Security Rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /gallery/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.resource.size < 5 * 1024 * 1024;
    }
    match /projects/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.resource.size < 5 * 1024 * 1024;
    }
  }
}
```

## Features & Components

### Authentication System
- **Demo Mode**: Works without Firebase using sample credentials
- **Firebase Mode**: Full authentication when configured
- **Session Persistence**: Maintains login state across refreshes
- **Auto-redirect**: Redirects unauthenticated users to login

### Image Upload
- **File Validation**: Type and size checking
- **Image Preview**: Shows selected images before upload
- **Progress Indicators**: Loading states during upload
- **Error Handling**: User-friendly error messages

### Form Management
- **Validation**: Client-side form validation
- **Auto-save**: Form state preservation
- **Reset Functionality**: Clear forms after successful submission

### UI/UX Features
- **Responsive Design**: Works on all screen sizes
- **Smooth Animations**: Framer Motion transitions
- **Toast Notifications**: Real-time feedback
- **Loading States**: Visual feedback during operations
- **Modal Dialogs**: Overlay forms for uploads

## Categories

### Gallery Categories
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

### Project Categories
- Box Culvert
- Drains
- Walls
- Bridge
- Highway
- Railway
- Industrial
- Commercial
- Residential
- Infrastructure

### Project Status Options
- Planning
- In Progress
- Completed
- On Hold

## Usage Guide

### Adding Gallery Images
1. Navigate to `/admin/gallery`
2. Click "Upload Image"
3. Select image file (max 5MB)
4. Fill in title, description, category
5. Check "Featured" for carousel inclusion
6. Click "Upload Image"

### Adding Projects
1. Navigate to `/admin/projects`
2. Click "Add Project"
3. Fill in project details:
   - Title (required)
   - Description
   - Location
   - Category and status
   - Start date (required)
   - End date (optional)
   - Client name
   - Project area/scale
4. Add key features using the feature input
5. Upload project images (optional, max 5)
6. Click "Add Project"

## Troubleshooting

### Demo Mode (No Firebase)
- Uses sample data for demonstration
- Upload functionality shows success but doesn't persist
- All features work for testing purposes

### Firebase Issues
- Check environment variables are correctly set
- Verify Firebase project is configured
- Ensure Firestore and Storage are enabled
- Check security rules allow read/write operations

### Image Upload Issues
- File size must be under 5MB
- Only image files are accepted
- Check Firebase Storage quota
- Verify network connection

### Authentication Issues
- Demo credentials: admin@infrastire.com / admin123
- Clear browser cache/localStorage if issues persist
- Check Firebase Authentication is enabled

## Security Notes
- Demo admin credentials are for development only
- Implement proper authentication for production
- Use Firebase Authentication rules for user management
- Set appropriate Firestore security rules
- Monitor Storage usage and costs

## Performance Optimization
- Images are automatically optimized by Next.js
- Lazy loading for gallery grids
- Efficient Firebase queries with ordering
- Minimal re-renders with proper state management

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Production Deployment
1. Set up proper Firebase authentication
2. Configure environment variables
3. Set Firebase security rules
4. Test all functionality
5. Monitor Firebase usage and costs
