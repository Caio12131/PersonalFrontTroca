import React from 'react';
import { motion } from 'framer-motion';
import { FiInfo, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

export default function InfoCard({ message, title, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.8, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center">
            <FiInfo className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-center text-gray-800 mb-3">
          {title || "Informação Importante"}
        </h2>

        <p className="text-center text-gray-700 mb-5">
          {message || "Por favor, siga as instruções para concluir o processo. Se precisar de ajuda, entre em contato com o suporte."}
        </p>

        <div className="flex flex-col space-y-3 mb-5">
          <div className="flex items-center text-gray-800">
            <FiCheckCircle className="mr-2 text-green-500" />
            <span>Complete as etapas conforme indicado</span>
          </div>
          <div className="flex items-center text-gray-800">
            <FiArrowRight className="mr-2 text-blue-500" />
            <span>Siga para a próxima etapa</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="bg-blue-600 text-white w-full py-3 rounded-lg flex items-center justify-center transition-all shadow-md hover:bg-blue-700"
        >
          Fechar
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
