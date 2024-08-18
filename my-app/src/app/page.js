'use client';

import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [on, setOn] = useState(true);

  const clickButton = () => {
    setOn(!on)

    
  }
  
  useEffect(() => {
    console.log(on)
  }, [on])

  return (
    <main className={styles.main}>

      <h1 className={styles.title}>The door is closed?</h1>

      <span className={on ? styles.containerBallRigth : styles.containerBallLeft}>
        <span className={on ? styles.ballRight : styles.ballLeft } onClick={clickButton}></span>
      </span>
      
    </main>
  );
}
