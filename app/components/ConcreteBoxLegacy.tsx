import React, { useEffect, useRef } from "react";
import styles from "./CompanyVision.module.css";
import Image from "next/image";

const ConcreteBoxLegacy: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('gsap').then(gsapModule => {
        const gsap = gsapModule.gsap;
        gsap.fromTo(
          boxRef.current,
          { scale: 0.7, opacity: 0, y: 80, filter: 'blur(12px)' },
          { scale: 1, opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'back.out(1.7)' }
        );
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.1, delay: 0.5, ease: 'power2.out' }
        );
      });
    }
  }, []);

  return (
    <div className={styles.legacyBoxContainer}>
      <div ref={boxRef} className={styles.legacyBox}>
        <Image src="/concreteBoxLegacy.jpg" alt="Concrete Box" width={260} height={180} className={styles.legacyBoxImg} />
      </div>
      <div ref={textRef} className={styles.legacyBoxText} style={{ background: 'none', color: '#181818' }}>
        <h2 style={{ color: '#181818', fontWeight: 900 }}>Legacy in Precast</h2>
        {/* Legacy description removed as requested */}
      </div>
    </div>
  );
};

export default ConcreteBoxLegacy;
