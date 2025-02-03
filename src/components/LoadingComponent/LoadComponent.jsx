import React, { useState, useEffect } from 'react';
import '../LoadingComponent/load.css';
import Frases from './RandomFrases/Frases';
import { useNavigate } from 'react-router-dom';

export default function LoadComponent() {
  const [seconds, setSeconds] = useState(90);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const startTime = localStorage.getItem('startTime') || Date.now();
    localStorage.setItem('startTime', startTime);

    const interval = setInterval(() => {
      const elapsedTime = (Date.now() - startTime) / 1000;
      const remainingTime = Math.max(90 - elapsedTime, 0);

      setSeconds(remainingTime);

      if (remainingTime <= 0) {
        setLoadingComplete(true);
        clearInterval(interval);
        localStorage.removeItem('startTime');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const progressPercentage = ((90 - seconds) / 90) * 100;

  const svgIcon = (
    <svg height="70" width="70" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill="" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
    </svg>
  );

  return (
    <div className="loader-unique">
    {loadingComplete ? (
      <div className="flex space-y-3 centered-content mt-[200px]">
        {svgIcon}
        <div className="text-complete my-3">Clique no botão abaixo para salvar o Treino.</div>
        <button className="save-button-unique bg-black" onClick={() => navigate('/treino')}>Salvar Treino</button>
      </div>
      ) : (
        <div className="loader-container">
         <figure className="loader">
  <div className="spinner"></div>
</figure>

          <div className="progress-wrapper">
          <Frases />
<br></br>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <div className="timer-seconds">{parseInt(progressPercentage)}% gerando treino</div>
          </div>
        </div>
      )}
    </div>
  );
}
