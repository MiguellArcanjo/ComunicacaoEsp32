'use client';

import styles from "./page.module.css";
import axios from 'axios'
import { useEffect, useState } from "react";

export default function Home() {
  const apiUrl = "https://api--esp32.vercel.app/values"
  const [dados, setDados] = useState()
  const [on, setOn] = useState();
  
  useEffect(() => {

    axios.get(apiUrl)
      .then(response => {
        const lastItem = response.data[response.data.length - 1]
        if (lastItem) {
          setDados(lastItem);
          setOn(lastItem.comunicationValues)
        }
      })
      .catch((error) => console.error("Não foi possivel retornar o valor"))
  }, [])

  console.log(on)


  return (
    <main className={styles.main}>

      <h1 className={styles.title}>The door is closed?</h1>

      <span className={on ? styles.containerBallRight : styles.containerBallLeft}>
        <span className={on ? styles.ballRight : styles.ballLeft }></span>
      </span>
      
    </main>
  );
}