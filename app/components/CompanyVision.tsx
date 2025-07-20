
"use client"
import { useRef, useEffect, useState } from "react";
// Use native img for GSAP refs
import styles from "./CompanyVision.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

function CompanyVision() {

    const [background, setBackground] = useState(20)

    const parallaxRef = useRef(null);
    const mountain3 = useRef(null);
    const mountain2 = useRef(null);
    const mountain1 = useRef(null);
    const cloudsBottom = useRef(null);
    const cloudsLeft = useRef(null);
    const cloudsRight = useRef(null);
    const stars = useRef(null);
    const sun = useRef(null);
    const copy = useRef(null);
    const btn = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.registerPlugin(ScrollTrigger);
            const tl = gsap.timeline({
                defaults: { duration: 1 },
                scrollTrigger: {
                    trigger: parallaxRef.current,
                    start: "top top",
                    end: "5000 bottom",
                    scrub: true,
                    pin: true,
                    onUpdate: (self) => {
                        setBackground(Math.ceil(self.progress * 100 + 20))
                    },
                },
            });
            tl.to(
                mountain3.current,
                {
                    y: "-=80",
                },
                0
            );
            tl.to(
                mountain2.current,
                {
                    y: "-=30",
                },
                0
            );
            tl.to(
                mountain1.current,
                {
                    y: "+=50",
                },
                0
            );
            tl.to(
                stars.current,
                {
                    top: 0,
                },
                0.5
            );
            tl.to(
                cloudsBottom.current,
                {
                    opacity: 0,
                    duration: 0.5
                },
                0
            );
            tl.to(
                cloudsLeft.current,
                {
                    x: "-20%",
                    opacity: 0,
                },
                0
            );
            tl.to(
                cloudsRight.current,
                {
                    x: "20%",
                    opacity: 0,
                },
                0
            );
            tl.to(
                sun.current,
                {
                    y: "+=210",
                },
                0
            );
            tl.to(
                copy.current,
                {
                    y: "-250%",
                    opacity: 1
                },
                0
            );
            tl.to(
                btn.current,
                {
                    opacity: 1,
                },
                1.5
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className={styles.parallaxOuter}>
            <div
                ref={parallaxRef}
                style={{ background: `linear-gradient(#0F2B9C, #673D7D ${background}%, #A74A67, #EDFC54 )` }}
                className={styles.parallax}
            >
                <img ref={mountain3} className={styles.mountain3} src="/parallax/mountain-3.svg" alt="mountain 3" />
                <img ref={mountain2} className={styles.mountain2} src="/parallax/mountain-2.svg" alt="mountain 2" />
                <img ref={mountain1} className={styles.mountain1} src="/parallax/mountain-1.svg" alt="mountain 1" />
                <img ref={sun} className={styles.sun} src="/parallax/sun.svg" alt="sun" />
                <img ref={cloudsBottom} className={styles.cloudsBottom} src="/parallax/cloud-bottom.svg" alt="clouds bottom" />
                <img ref={cloudsLeft} className={styles.cloudsLeft} src="/parallax/clouds-left.svg" alt="clouds left" />
                <img ref={cloudsRight} className={styles.cloudsRight} src="/parallax/clouds-right.svg" alt="clouds right" />
                <img ref={stars} className={styles.stars} src="/parallax/stars.svg" alt="stars" />
                <div ref={copy} className={styles.copy}>
                    <h1 className={styles.copyH1}>Journey</h1>
                    <span ref={btn} className={styles.copySpan}>Discover more</span>
                </div>
            </div>
        </div>
    )
}

export default CompanyVision