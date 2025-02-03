
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, PlusCircle } from 'react-feather';

function LoadInicial({ onClose }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-white">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-black">
            <UploadCloud className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Seu Treino Está Pronto</h2>
          <p className="text-gray-600 mb-8">
            Você tem um treino personalizado salvo. O que gostaria de fazer?
          </p>
        </div>
        <div className="space-y-4">
          <button
            className="w-full bg-black text-white px-6 py-3 rounded-lg font-medium transition duration-300 ease-in-out transform hover:bg-green-700 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center"
            onClick={() => navigate('/treino')}
          >
            <UploadCloud className="w-5 h-5 mr-2" />
            Ver meu Treino
          </button>
          <button
            className="w-full bg-white text-black px-6 py-3 rounded-lg font-medium transition duration-300 ease-in-out transform hover:bg-green-50 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center border border-green-300"
            onClick={onClose}
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Montar Outro Treino
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoadInicial;