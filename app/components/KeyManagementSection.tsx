
"use client";
import { useRef, useEffect } from "react";
import styles from "./ManagementSection.module.css";

const imageUrl = "https://fujisilvertech.com/wp-content/themes/fujisilvertech/assets/img/Mr-Shunsuke-Irie.png";
const keyMembers = [
  {
    name: "Mr. E. F. Orion",
    title: "Chief Technology Officer",
    role: "Innovation & R&D",
    img: imageUrl,
    bio: "Mr. Orion drives the company’s technology vision and product innovation."
  },
  {
    name: "Ms. G. H. Vega",
    title: "Chief Financial Officer",
    role: "Finance & Strategy",
    img: imageUrl,
    bio: "Ms. Vega ensures financial stability and strategic growth."
  },
  // Add more key members as needed
];

export default function KeyManagementSection() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.opacity = "0";
      titleRef.current.style.transform = "translateX(-40px)";
      setTimeout(() => {
        if (titleRef.current) {
          titleRef.current.style.transition = "opacity 0.8s, transform 0.8s";
          titleRef.current.style.opacity = "1";
          titleRef.current.style.transform = "translateX(0)";
        }
      }, 200);
    }
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <div ref={titleRef} className={styles.mainTitle}>
            KEY MANAGEMENT
          </div>
        </div>
      </div>
      <div className={styles.grid}>
        {keyMembers.map((m) => (
          <div key={m.name} className={styles.card} tabIndex={0}>
            <div className={styles.profileImgWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.img} alt={m.name} className={styles.profileImg} />
            </div>
            <div className={styles.name}>{m.name}</div>
            <div className={styles.title}>{m.title}</div>
            {m.role && <div className={styles.role}>{m.role}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}
