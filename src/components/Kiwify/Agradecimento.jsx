

import React, { useState , useEffect} from 'react';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


function PagamentoComponent() {

  const {user} = UserAuth()

  const token = user.uid  
 
  const [showCard, setShowCard] = useState(false);
  const [cardMessage, setCardMessage] = useState('');
  const [toMain, setToMain] = useState(false);

  
  const navigate = useNavigate();

  function InfoCard({ message, onClose }) {
    return (
      <div className="info-card-overlay">
        <div className="info-card" style={{ backgroundColor: "#e8f4ea", padding: "20px", borderRadius: "10px", border: "2px solid #d4edda", color: "#155724" }}>
          <div style={{ fontSize: "16px", lineHeight: "1.5" }}>
            {message}
          </div>
          <button onClick={onClose} style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}>
            MONTAR MINHA DIETA
          </button>
        </div>
      </div>
    );
  }

      const handleCardClose = () => {
        setShowCard(false);
        if (toMain) navigate('/home');
      }

    useEffect(() => {
        setCardMessage(
          <>
          <p><strong>PAGAMENTO REALIZADO!</strong></p>
          <p>Na página principal, preencha suas informações <strong>NOVAMENTE</strong>, incluindo peso, altura, objetivo e preferências alimentares. 🍏🏋️‍♂️</p>
        </>
        );
        setToMain(true);
        setShowCard(true); 
  
    }, [token]);

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1>Agradecemos pela compra!</h1>
      <h2>Compra realizada com sucesso!</h2>
      <p className='w-[80%] text-justify' >Volte para a pagina inicial coloque suas informações novamente, clique em gerar dieta espere ate que apareça um botão para salvar sua dieta!</p>
      {showCard && <InfoCard message={cardMessage} onClose={handleCardClose} />}
    </div>
  );
}

export default PagamentoComponent;