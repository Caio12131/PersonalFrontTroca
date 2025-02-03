import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/Desafio.css';
import GatewayPagamento from '../../EfiPay/GatewayPagamento';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function GanhoDeMassa() {
  const amount = 14.99; // Valor fixo
  const navigate = useNavigate();

  const handlePaymentWaiting = () => {
    toast.info('Pagamento pendente. Por favor, finalize o pagamento via Pix e volte para essa página!');
  };

  const handlePaymentSuccess = () => {
    navigate('/comprarealizada');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-black">
      <div className="absolute inset-0 bg-white backdrop-filter backdrop-blur-sm"></div>
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-2 sm:p-4">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-[99%] sm:max-w-6xl p-4 border border-gray-200">
          <div className="mt-4">
            <GatewayPagamento
              amount={amount}
              handlePaymentSuccess={handlePaymentSuccess}
              handlePaymentWaiting={handlePaymentWaiting}
            />
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
            Treino gerado após o pagamento. Por favor, volte ao site para acessar seu treino.
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 ml-1" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
