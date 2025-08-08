"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import "./BoxCulvert.css"

const ScrollImageTransition = () => {
  const [currentImage, setCurrentImage] = useState(1);
  const [isLocked, setIsLocked] = useState(false);
  const componentRef = useRef(null);
  const touchStartY = useRef(0);
  const scrollCount = useRef(0);
  const SCROLLS_PER_TRANSITION = 3;
  const scrollTimeout = useRef(null);

  // More tolerant viewport check
  const isInViewport = useCallback((threshold = 0.5) => {
    if (!componentRef.current) return false;
    const rect = componentRef.current.getBoundingClientRect();
    return (
      rect.top < window.innerHeight * threshold &&
      rect.bottom > window.innerHeight * (1 - threshold)
    );
  }, []);

  // Handle scroll direction and image transitions
  const handleScroll = useCallback((e) => {
    if (!isInViewport()) return;

    const delta = e.deltaY || e.detail || -e.wheelDelta;
    const isScrollingDown = delta > 0;

    // If we're at the boundaries, allow natural scroll
    if ((currentImage === 5 && isScrollingDown) || (currentImage === 1 && !isScrollingDown)) {
      setIsLocked(false);
      document.body.style.overflow = '';
      return;
    }

    // Otherwise, handle the transition
    if (isLocked) {
      e.preventDefault();
      e.stopPropagation();

      scrollCount.current += 1;
      
      if (scrollCount.current % SCROLLS_PER_TRANSITION === 0) {
        setCurrentImage(prev => isScrollingDown ? Math.min(prev + 1, 5) : Math.max(prev - 1, 1));
      }
    }
  }, [currentImage, isInViewport, isLocked]);

  // Enhanced touch handling
  const handleTouchStart = useCallback((e) => {
    if (!isInViewport()) return;
    touchStartY.current = e.touches[0].clientY;
  }, [isInViewport]);

  const handleTouchMove = useCallback((e) => {
    if (!isInViewport()) return;
    
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY.current - touchY;
    const isSwipingUp = deltaY > 0;

    // At boundaries, allow natural scroll
    if ((currentImage === 5 && isSwipingUp) || (currentImage === 1 && !isSwipingUp)) {
      setIsLocked(false);
      document.body.style.overflow = '';
      return;
    }

    // Otherwise handle transition
    if (isLocked) {
      e.preventDefault();
      e.stopPropagation();

      if (Math.abs(deltaY) > 30) {
        scrollCount.current += 1/3;
        
        if (scrollCount.current >= 1) {
          setCurrentImage(prev => isSwipingUp ? Math.min(prev + 1, 5) : Math.max(prev - 1, 1));
          scrollCount.current = 0;
        }
        touchStartY.current = touchY;
      }
    }
  }, [currentImage, isInViewport, isLocked]);

  // Manage scroll lock state
  useEffect(() => {
    const checkViewport = () => {
      const inView = isInViewport();
      if (inView && !isLocked) {
        setIsLocked(true);
        document.body.style.overflow = 'hidden';
      }
    };

    window.addEventListener('scroll', checkViewport);
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('scroll', checkViewport);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      document.body.style.overflow = '';
    };
  }, [isLocked, handleScroll, handleTouchStart, handleTouchMove, isInViewport]);

  // Reset counter on image change
  useEffect(() => {
    scrollCount.current = 0;
  }, [currentImage]);

  return (
    <div ref={componentRef} className="scroll-transition-container">
      {[1, 2, 3, 4, 5].map((num) => (
        <div 
          key={`box-${num}`}
          className={`image-box ${currentImage === num ? 'active' : ''}`}
          style={{ backgroundImage: `url(/parallax/Box/Box${num}.jpeg)` }}
        />
      ))}
      <div className="progress-indicator">
        {[1, 2, 3, 4, 5].map((num) => (
          <div 
            key={`indicator-${num}`}
            className={`dot ${currentImage >= num ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollImageTransition;