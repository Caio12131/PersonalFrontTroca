import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiList, FiArrowRight, FiPhone } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function InfoCard({ message, title, onClose }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="bg-gray-900 text-white p-8 rounded-2xl shadow-xl max-w-md w-full"
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center">
            <FiCheckCircle className="w-12 h-12 text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-4">{title || "Monte treino"}</h2>
        
        <p className="text-center text-gray-300 mb-6">
          {message || <><strong>Preencha as informações, </strong>depois clique em "Montar Treino".</>}
        </p>

        <div className="space-y-4">
          <div className="flex items-center text-gray-400">
            <FiList className="mr-2 text-white" />
            <span>Selecione seus alimentos preferidos</span>
          </div>
          <div className="flex items-center text-gray-400">
            <FiArrowRight className="mr-2 text-white" />
            <span>Realize o pagamento e retorne na página</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/home')}
          className="mt-8 bg-gray-700 text-white w-full py-3 rounded-xl flex items-center justify-center transition-all shadow-md hover:shadow-lg"
        >
          Montar Treino
        </motion.button>

        <a
          href="https://wa.me/24998824667"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block text-center bg-gray-700 text-white py-3 rounded-xl hover:bg-gray-600 transition-colors"
        >
          <div className="flex items-center justify-center">
            <FiPhone className="mr-2" />
            Já paguei, preciso de ajuda
          </div>
        </a>
      </motion.div>
    </motion.div>
  );
}
