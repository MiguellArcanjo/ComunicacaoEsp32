import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>

      <span className={styles.containerBall}>
        <span className={styles.ball1}></span>
        <span className={styles.ball2}></span>
      </span>
      
    </main>
  );
}
