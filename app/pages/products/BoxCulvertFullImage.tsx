import React from 'react';
import Image from 'next/image';
import styles from './FullscreenImage.module.css';

interface FullscreenImageProps {
  imagePath: string;
  altText: string;
}

const BoxCulvertFullImage: React.FC<FullscreenImageProps> = ({ imagePath, altText }) => {
  return (
    <div className={styles.fullscreenContainer}>
      <Image
        src={imagePath}
        alt={altText}
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
    </div>
  );
};

export default BoxCulvertFullImage;