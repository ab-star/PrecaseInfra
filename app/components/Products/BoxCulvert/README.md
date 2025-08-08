# Box Culvert Product Page

A modern, professional product page for Box Culvert infrastructure solutions built with Next.js, React, Three.js, and Framer Motion.

## 🚀 Features

### 1. Hero Video Section (`HeroVideoSection.tsx`)
- **Full-screen autoplay video** with muted loop
- **Elegant text overlay** with animated title and subtitle
- **Scroll indicator** with smooth animation
- **Responsive design** for all device sizes

### 2. Interactive 3D Model Section (`ModelSection.tsx`)
- **GLTF/GLB 3D model** rendering using React-Three-Fiber
- **Interactive rotation** with OrbitControls
- **Auto-rotation** when idle
- **Product specifications** and feature highlights
- **Professional lighting** and shadows

### 3. Strength Showcase Section (`StrengthSection.tsx`)
- **Split layout** with compelling text and imagery
- **Animated statistics** and performance metrics
- **Technical specifications** display
- **Floating stats card** with scroll animations

### 4. Scroll-Locked Image Transition (`ScrollTransitionSection.tsx`)
- **Scroll-triggered image sequence** (6 images)
- **Smooth transitions** between manufacturing process steps
- **Progress indicator** with visual feedback
- **Scroll lock mechanism** until all images are viewed
- **Cinematic fade effects**

### 5. Technical Specifications Section (`TechnicalSpecsSection.tsx`)
- **Comprehensive specs** organized by category
- **Interactive feature cards** with hover effects
- **Professional gradient background**
- **Call-to-action** for technical datasheet download

### 6. Product Footer (`ProductFooter.tsx`)
- **Company information** and branding
- **Social media links** with animated icons
- **Quick navigation** and product links
- **Contact information** and legal links

## 🎨 Design Features

### Theme & Visual Identity
- **Construction Industry Focus**: Rugged, clean, modern aesthetic
- **High-Contrast Visuals**: Bold typography and striking imagery
- **Professional Color Palette**: Blues, grays, and amber accents
- **Full Viewport Sections**: Immersive 100vh sections

### Animations & Interactions
- **Framer Motion**: Smooth entrance animations and micro-interactions
- **Scroll-Triggered Effects**: Elements animate as they come into view
- **3D Model Interaction**: Rotate and zoom the Box Culvert model
- **Responsive Animations**: Optimized for all device sizes

### Performance Optimizations
- **Hardware Acceleration**: CSS transforms optimized for GPU
- **Lazy Loading**: Images and 3D models load efficiently
- **Smooth Scrolling**: Optimized scroll behavior
- **Progressive Enhancement**: Graceful degradation for older browsers

## 📱 Responsive Design

- **Mobile-First Approach**: Optimized for mobile devices
- **Tablet Optimization**: Perfect layout for medium screens
- **Desktop Enhancement**: Full-featured experience on large screens
- **Cross-Browser Compatibility**: Works across modern browsers

## 🛠️ Technical Stack

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React features and hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Advanced animations and gestures
- **React-Three-Fiber**: 3D rendering with Three.js
- **@react-three/drei**: Helper components for Three.js

## 📁 File Structure

```
app/components/Products/BoxCulvert/
├── HeroVideoSection.tsx          # Hero video with overlay
├── ModelSection.tsx              # 3D model viewer
├── StrengthSection.tsx           # Strength showcase
├── ScrollTransitionSection.tsx   # Image transition sequence
├── TechnicalSpecsSection.tsx     # Technical specifications
├── ProductFooter.tsx             # Footer component
└── ScrollTransition.module.css   # Additional styling
```

## 🎯 Key Achievements

✅ **Immersive Experience**: Full-screen sections create impactful presentation
✅ **Interactive 3D Model**: Users can explore the product in detail
✅ **Scroll Storytelling**: Manufacturing process told through image sequence
✅ **Professional Design**: Construction industry-appropriate aesthetic
✅ **Performance Optimized**: Smooth animations and fast loading
✅ **Fully Responsive**: Works perfectly on all devices
✅ **Accessibility Ready**: Semantic HTML and keyboard navigation

## 🔧 Assets Required

All assets are located in `/public/product/BoxCulvertProduct/`:
- `video/Box video.mp4` - Hero background video
- `glb/Sqare block.glb` - 3D model file
- `strong/strong.png` - Strength showcase image
- `transition/1.png` to `transition/6.png` - Manufacturing process images

## 🚀 Usage

The page is accessible at `/products/box-culvert` and provides a complete product showcase experience with all requested features implemented according to specifications.

---

**Built with precision engineering for the construction industry** 🏗️
