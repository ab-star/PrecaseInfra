import React from 'react';
import Image from 'next/image';
import styles from './BoxCulverProd.module.css';

const BoxCulvertProd = () => {
  const boxImages = [
    '/parallax/Box/Box1.jpeg',
    '/parallax/Box/Box2.jpeg',
    '/parallax/Box/Box3.jpeg',
    '/parallax/Box/Box4.jpeg',
    '/parallax/Box/Box5.jpeg'
  ];

  return (
    <div className={styles.showcaseContainer}>
      {/* First row - two side-by-side images */}
      <div className={styles.imageRow}>
        <div className={styles.imageWrapper}>
          <Image
            src={boxImages[0]}
            alt="Box component 1"
            layout="fill"
            objectFit="cover"
            className={styles.image}
          />
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src={boxImages[1]}
            alt="Box component 2"
            layout="fill"
            objectFit="cover"
            className={styles.image}
          />
        </div>
      </div>

      {/* Second row - two side-by-side images */}
      <div className={styles.imageRow}>
        <div className={styles.imageWrapper}>
          <Image
            src={boxImages[2]}
            alt="Box component 3"
            layout="fill"
            objectFit="cover"
            className={styles.image}
          />
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src={boxImages[3]}
            alt="Box component 4"
            layout="fill"
            objectFit="cover"
            className={styles.image}
          />
        </div>
      </div>

      {/* Third row - single full-width image */}
      <div className={styles.fullWidthRow}>
        <div className={styles.fullWidthWrapper}>
          <Image
            src={boxImages[4]}
            alt="Box component 5"
            layout="fill"
            objectFit="cover"
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default BoxCulvertProd;