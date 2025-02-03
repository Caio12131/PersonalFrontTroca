import React from 'react'
import treinadorImagem from '../../img/macaverde.png'

const PlanoDeTreino = () => {
  return (
    <div style={{
      maxWidth: '450px',
      margin: '0 auto',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#f8f8f8'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          overflow: 'hidden',
          marginRight: '12px'
        }}>
          <img src={treinadorImagem} alt="Treinador" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        </div>
        <div>
          <h2 style={{fontSize: '16px', fontWeight: 'bold', margin: '0'}}>Plano de Treino Personalizado</h2>
          <p style={{color: '#666', margin: '4px 0 0'}}>Mais barato que qualquer Personal</p>
        </div>
      </div>
      <div style={{padding: '16px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
          <span style={{fontSize: '24px', fontWeight: 'bold'}}>R$9,99<span style={{fontSize: '12px', color: '#666'}}>/Unico</span></span>
          <span style={{
            backgroundColor: '#000000',
            color: 'white',
            fontSize: '10px',
            fontWeight: 'bold',
            padding: '2px 6px',
            borderRadius: '10px'
          }}>Pagamento Unico</span>
        </div>
        <ul style={{listStyle: 'none', padding: 0, margin: '0'}}>
          <li style={{color: 'gray', display: 'flex', alignItems: 'center', marginBottom: '4px'}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000" style={{width: '16px', height: '16px', marginRight: '8px'}}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Treinos personalizados
          </li>
          <li style={{color: 'gray', display: 'flex', alignItems: 'center', marginBottom: '4px'}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000" style={{width: '16px', height: '16px', marginRight: '8px'}}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Em casa ou Academia
          </li>
          <li style={{color: 'gray', display: 'flex', alignItems: 'center'}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000" style={{width: '16px', height: '16px', marginRight: '8px'}}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Acompanhamento de progresso 
          </li>
        </ul>
      </div>
    </div>
  )
}

export default PlanoDeTreino