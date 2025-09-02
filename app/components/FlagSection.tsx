
"use client"
import React, { useEffect } from 'react';
import './FlagSection.css'; // We'll create this CSS file separately

const FlagSection = () => {
  useEffect(() => {
    // Lazy load images on scroll
    const lazyImages = document.querySelectorAll('img[data-src]');
    let hasScrolled = false;

    function replaceImageSrc() {
      if (!hasScrolled) {
        lazyImages.forEach((img) => {
          const dataSrc = img.getAttribute('data-src');
          if (dataSrc) {
            img.setAttribute('src', dataSrc);
            img.removeAttribute('data-src');
          }
        });
        hasScrolled = true;
        window.removeEventListener('scroll', replaceImageSrc);
      }
    }

    window.addEventListener('scroll', replaceImageSrc);
    return () => window.removeEventListener('scroll', replaceImageSrc);
  }, []);

  return (
    <section className="flag-section pb-0">
      <div className="sticky bg-section-light">
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-lg-7">
              <div className="mt-5" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1500">
                <div className="heading-title mb-4">
                  <h3 style={{ color: '#3e5c76' }}>India&apos;s Infrastructure Revolution</h3>
                  <h3 style={{ color: '#22334a' }}>Building the Future, Proudly Indian</h3>
                </div>
                <p style={{ fontSize: '1.15em', color: '#22334a' }}>
                  3gInfraTech is at the forefront of India&apos;s infrastructure transformation, delivering innovative precast 
                  solutions that empower smart cities, modern highways, and sustainable communities. Our expertise, 
                  technology, and commitment to quality are shaping a new era of progress—where every project is a step 
                  toward a stronger, greener, and more connected nation.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative light image */}
        <img 
          src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" 
          alt="Light" 
          className="h-light" 
          data-src="/wp-content/themes/fujisilvertech/assets/img/light.png"
        />
        
        {/* Flag images - positioned to the right */}
        <div className="col-md-12 col-lg-8 right-img">
          <div className="indian-flag flags-overlay">
            <img 
              className="img-fluid excluded-img" 
              data-src="https://fujisilvertech.com/wp-content/themes/fujisilvertech/assets/img/indian-flag.gif" 
              src="/wp-content/uploads/2025/06/indian-flag.png" 
              alt="Indian flag - 3gInfraTech" 
            />
          </div>
          <img 
            className="img-fluid d-none d-lg-block" 
            src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" 
            alt="flag right" 
            data-src="/wp-content/themes/fujisilvertech/assets/img/flag-right-n.webp" 
          />
          <img 
            className="img-fluid d-lg-none" 
            src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%200%200'%3E%3C/svg%3E" 
            alt="flag right bg" 
            data-src="/wp-content/themes/fujisilvertech/assets/img/flag-right.webp"
          />
        </div>
      </div>
    </section>
  );
};

export default FlagSection;