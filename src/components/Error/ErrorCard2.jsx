import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiArrowRight, FiX } from 'react-icons/fi';

const ErrorCard = ({ message }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center p-4 z-50"
    >
      <Card>
        <CloseButton onClick={() => setIsVisible(false)} />
        <IconWrapper>
          <FiAlertCircle className="w-12 h-12 text-white" />
        </IconWrapper>

        <Title>Pagamento Pendente</Title>

        <Description>
          <strong>Preencha suas medidas</strong> e alimentos preferidos <strong>e conclua o pagamento</strong> para acessar.
        </Description>

        <ActionButton onClick={() => navigate('/home')}>
          <span className="mr-2">Montar Dieta</span>
          <FiArrowRight />
        </ActionButton>

        {message && <ErrorMessage>{message}</ErrorMessage>}
      </Card>
    </motion.div>
  );
};

const Card = ({ children }) => (
  <motion.div
    initial={{ scale: 0.9, y: 20 }}
    animate={{ scale: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full mx-auto relative"
  >
    {children}
  </motion.div>
);

const IconWrapper = ({ children }) => (
  <div className="flex justify-center mb-4">
    <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
      {children}
    </div>
  </div>
);

const Title = ({ children }) => (
  <h2 className="text-xl font-semibold text-center text-white mb-3">
    {children}
  </h2>
);

const Description = ({ children }) => (
  <p className="text-center text-gray-300 mb-4">
    {children}
  </p>
);

const ActionButton = ({ children, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="bg-gray-700 text-white w-full py-3 rounded-lg flex items-center justify-center transition-transform shadow-md hover:shadow-lg"
  >
    {children}
  </motion.button>
);

const ErrorMessage = ({ children }) => (
  <p className="mt-3 text-sm text-center text-gray-400">
    {children}
  </p>
);

const CloseButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
  >
    <FiX className="w-6 h-6" />
  </button>
);

export default ErrorCard;
