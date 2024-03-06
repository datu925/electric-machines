import { useState } from "react";
import styles from "./InfoSquare.module.scss";

const InfoSquare = ({ text }: { text: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className={styles.svgDiv}>
        <svg
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#888"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 9h.01" />
          <path d="M11 12h1v4h1" />
          <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
        </svg>
        {isHovered && <p className={styles.tooltip}>{text}</p>}
      </div>
    </>
  );
};

export default InfoSquare;
