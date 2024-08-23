'use client';

import styles from "./page.module.css";
import axios from 'axios';
import { useEffect, useState } from "react";

export default function Home() {
  const apiUrl = "https://apiesp32websocket.onrender.com/values";
  const [dados, setDados] = useState();
  const [on, setOn] = useState();

  useEffect(() => {
    const ws = new WebSocket('wss//apiesp32websocket.onrender.com');

    ws.onopen = () => {
      console.log('Conectado ao WebSocket');
    };

    ws.onmessage = (event) => {
      try {
        const newValue = JSON.parse(event.data);
        console.log('Dados recebidos do WebSocket:', newValue);
        
        if (newValue.values && newValue.values.length > 0) {
          const lastValue = newValue.values[newValue.values.length - 1];
          console.log('Último valor do array:', lastValue);
          
          setDados(lastValue);
          setOn(lastValue.comunicationValue);
        } else {
          console.warn('O array "values" está vazio ou não existe');
        }
      } catch (error) {
        console.error('Erro ao processar a mensagem WebSocket:', error);
      }
    };

    ws.onclose = () => {
      console.log('Desconectado do WebSocket');
    };

    ws.onerror = (error) => {
      console.error('Erro no WebSocket:', error);
    };

    const fetchInitialData = async () => {
      try {
        const response = await axios.get(apiUrl);
        console.log('Dados recebidos do Axios:', response.data);

        if (response.data.values && response.data.values.length > 0) {
          const lastValue = response.data.values[response.data.values.length - 1];
          console.log('Último valor do array:', lastValue);

          if (lastValue) {
            setDados(lastValue);
            setOn(lastValue.comunicationValue);
          }
        } else {
          console.warn('O array "values" está vazio ou não existe na resposta da API');
        }
      } catch (error) {
        console.error("Não foi possível retornar o valor", error);
      }
    };

    fetchInitialData();

    return () => {
      ws.close();
    };
  }, []);

  console.log('Estado atual de "on":', on);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>The door is closed?</h1>
      <span className={on ? styles.containerBallRight : styles.containerBallLeft}>
        <span className={on ? styles.ballRight : styles.ballLeft}></span>
      </span>
    </main>
  );
}
