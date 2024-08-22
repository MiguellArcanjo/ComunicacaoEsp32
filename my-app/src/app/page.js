'use client';

import styles from "./page.module.css";
import axios from 'axios';
import { useEffect, useState } from "react";

export default function Home() {
  const apiUrl = "http://localhost:2999/values";
  const [dados, setDados] = useState();
  const [on, setOn] = useState();

  useEffect(() => {
    // Conectar ao WebSocket
    const ws = new WebSocket('ws://localhost:2999');

    ws.onopen = () => {
      console.log('Conectado ao WebSocket');
    };

    ws.onmessage = (event) => {
      const newValue = JSON.parse(event.data);
      setDados(newValue);
      setOn(newValue.comunicationValues);
    };

    ws.onclose = () => {
      console.log('Desconectado do WebSocket');
    };

    ws.onerror = (error) => {
      console.error('Erro no WebSocket:', error);
    };

    // Buscar o valor inicial
    axios.get(apiUrl)
      .then(response => {
        const lastItem = response.data[response.data.length - 1];
        if (lastItem) {
          setDados(lastItem);
          setOn(lastItem.comunicationValues);
        }
      })
      .catch((error) => console.error("Não foi possível retornar o valor"));

    // Limpar a conexão WebSocket quando o componente for desmontado
    return () => {
      ws.close();
    };
  }, []);

  console.log(on);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>The door is closed?</h1>
      <span className={on ? styles.containerBallRight : styles.containerBallLeft}>
        <span className={on ? styles.ballRight : styles.ballLeft}></span>
      </span>
    </main>
  );
}
