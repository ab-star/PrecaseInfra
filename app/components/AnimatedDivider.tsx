import styles from "./AnimatedDivider.module.css";

export default function AnimatedDivider() {
  return (
    <div className={styles.divider}>
      <svg className={styles.wave} viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,80 C480,0 960,160 1440,80 L1440,120 L0,120 Z" fill="#181e29" fillOpacity="0.9">
          <animate attributeName="d" dur="6s" repeatCount="indefinite"
            values="M0,80 C480,0 960,160 1440,80 L1440,120 L0,120 Z;
                    M0,60 C480,40 960,120 1440,60 L1440,120 L0,120 Z;
                    M0,80 C480,0 960,160 1440,80 L1440,120 L0,120 Z" />
        </path>
      </svg>
    </div>
  );
}
