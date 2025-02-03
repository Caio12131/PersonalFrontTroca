import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

const phrases = [
  'Montando Treino Exclusivo 💪🏼',
  'Com base em seus Objetivos 🎯',
  'Com base em seus Músculos Favoritos 💚',
  'Levando em conta suas necessidades 💪🏼',
  'Definindo os Dias 🎯',
  'Ajustando Detalhes 📋',
  'Criando um Treino unico, assim como você 💚',
  'Priorizando os minimos detalhes 📋'
];

export default function AnimatedPhrases() {
  const [index, setIndex] = useState(0);

  const animationProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    reset: true,
    reverse: true,
    onRest: () => {
      setIndex((currentIndex) => (currentIndex + 1) % phrases.length);
    },
    config: { duration: 5000 },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((currentIndex) => (currentIndex + 1) % phrases.length);
    }, 6000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ 
      textAlign: 'center', 
      fontSize: '1.4rem', 
      fontFamily: 'Poppins, sans-serif',
      whiteSpace: 'normal' // Permite que o texto quebre naturalmente
    }}>
      <animated.div style={animationProps}>{phrases[index]}</animated.div>
    </div>
  );
}
