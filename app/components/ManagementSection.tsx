"use client";
import { useEffect, useRef } from "react";
import styles from "./ManagementSection.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import Lottie from "lottie-react";
import AOS from "aos";
import "aos/dist/aos.css";


const imageUrl = "https://fujisilvertech.com/wp-content/themes/fujisilvertech/assets/img/Mr-Shunsuke-Irie.png";
const members = [
  {
    name: "Dr. A. B. Star",
    title: "Chairman & Managing Director",
    role: "Visionary Leader",
    img: imageUrl,
    bio: "Dr. Star has led the company to new heights with innovation and integrity.",
    lottie: "/lottie/leader.json"
  },
  {
    name: "Ms. C. D. Nova",
    title: "Chief Executive Officer",
    role: "Strategic Growth",
    img: imageUrl,
    bio: "Ms. Nova is known for her strategic vision and operational excellence.",
    lottie: "/lottie/ceo.json"
  },
  {
    name: "Mr. Anurag Sachan",
    title: "Director",
    role: "Operations",
    img: imageUrl,
    bio: "Mr. Sachan oversees daily operations and ensures project success.",
    lottie: "/lottie/director.json"
  },
  {
    name: "Mr. Rajan Shah",
    title: "Director",
    role: "Business Development",
    img: imageUrl,
    bio: "Mr. Shah leads business development and client relations.",
    lottie: "/lottie/director.json"
  },
  // Add more members as needed
];

export default function ManagementSection() {
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, x: -80, filter: "brightness(1.5) drop-shadow(0 0 16px #6ef)" },
      {
        opacity: 1,
        x: 0,
        filter: "brightness(1.2) drop-shadow(0 0 32px #6ef)",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 80%" }
      }
    );
    AOS.init({ once: true, duration: 900, easing: "ease-out-cubic" });
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.bgParallax}>
        {/* Example Lottie background */}
        {/* <Lottie animationData={require("../../public/lottie/abstract-bg.json")} loop autoPlay className={styles.lottieBg} /> */}
        {/* Add particle/gradient overlays here */}
      </div>
      <div className={styles.header}>
        <div>
          <div ref={titleRef} className={styles.mainTitle}>
            MANAGEMENT<br />BOARD
          </div>
        </div>
      </div>
      <div className={styles.grid}>
        {members.map((m) => (
          <div
            key={m.name}
            className={styles.card}
            tabIndex={0}
          >
            <div className={styles.profileImgWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.img}
                alt={m.name}
                className={styles.profileImg}
              />
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
