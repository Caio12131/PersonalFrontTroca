import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiCheckCircle } from 'react-icons/fi';

export default function ErrorCard({ id, message, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="bg-gray-900 p-8 rounded-2xl shadow-xl max-w-md w-full mx-auto"
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
            <FiDownload className="w-12 h-12 text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-white mb-4">Seu Treino Está Pronto!</h2>
        
        <p className="text-center text-gray-300 mb-6">
          Para visualizar e baixar o <strong>PDF</strong> do seu treino personalizado, acesse o site utilizando o navegador <strong>Safari ou Chrome</strong>.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="mt-6 bg-gradient-to-r from-gray-700 to-gray-800 text-white w-full py-3 rounded-xl flex items-center justify-center transition-all shadow-md hover:shadow-lg"
        >
          <FiCheckCircle className="mr-2" />
          <span>Entendi, Vou Baixar</span>
        </motion.button>

        {message && (
          <p className="mt-4 text-sm text-center text-gray-400">
            {message}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
