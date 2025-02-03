import React from 'react';

export default function Footer() {
  return (
    <div style={{
      width: '100%',
      position: 'absolute', // Alterado para absolute
      bottom: 0, // Adicionado para ancorar no final da página
      left: 0,
      backgroundColor: '#f0f0f0',
      padding: '20px 0',
      textAlign: 'center'
    }}>
      <p style={{ margin: 0, padding: '10px', fontSize: '16px' }}>
        Facilita Nutri - Todos os Direitos Reservados
      </p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ display: 'inline', marginRight: '20px' }}>
          <a href="#faleconosco" style={{ textDecoration: 'none', color: 'black' }}>Fale Conosco</a>
        </li>
        <li style={{ display: 'inline', marginRight: '20px' }}>
          <a href="#quemsomos" style={{ textDecoration: 'none', color: 'black' }}>Quem Somos</a>
        </li>
        <li style={{ display: 'inline', marginRight: '20px' }}>
          <a href="#outros" style={{ textDecoration: 'none', color: 'black' }}>Outros</a>
        </li>
      </ul>
    </div>
  );
}
