import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { Menu, X, User, Calendar, LogOut } from 'react-feather';
import { motion, AnimatePresence } from 'framer-motion';

function WorkoutSidebar({ isOpen, toggleMenu }) {
  const { user, logout, retornaTicket } = UserAuth();
  const [userTickets, setUserTickets] = useState('')
  const navigate = useNavigate();
  const menuItems = [
    { label: 'Plano de Treino', icon: <Calendar size={20} />, action: () => navigate('/treino') },
    // { label: 'Configurações', icon: <Settings size={20} />, action: () => navigate('/configuracoes') },
    // { label: 'Instrução', icon: <BookOpen size={20} />, action: () => navigate('/instrucao') }, // Novo menu
    { label: 'Sair', icon: <LogOut size={20} />, action: handleLogout, className: 'text-black bg-white hover:bg-gray-700' },
  ];

  
  useEffect(() => {
    retornaTicket()
      .then(async (tickets) => {
        if (tickets !== null) {
          setUserTickets(tickets);
        } else {
          setUserTickets(0);
        }
      })
      .catch((error) => {
        setUserTickets(0);
      });
  }, [retornaTicket]);

  async function handleLogout() {
    try {
      await logout();
      navigate('/');
    } catch (e) {
      console.error('Logout failed', e);
    }
  }

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg text-gray-800 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-40 w-80 shadow-xl overflow-y-auto"
          >
            <div className="flex flex-col h-full bg-gray-800">
              <div className="flex-1 h-7/10 bg-black">
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="mb-4 p-2 rounded-full bg-gray-700">
                    <User size={48} className="text-gray-300" />
                  </div>
                  <h3 className="text-xl font-medium text-white">Olá, Atleta!</h3>
                  <p className="mt-2 text-sm text-gray-400">{user && user.email}</p>
                  <p className="mt-2 text-sm text-gray-400">Ticket: {userTickets}</p>

                </div>
                <div className="flex-1 px-4 py-24 mt-6">
                  <nav>
                    <ul className="space-y-4">
                      {menuItems.map((item, index) => (
                        <li key={index}>
                          <button
                            onClick={item.action}
                            className={`w-full flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors duration-150 ease-in-out ${
                              item.className || 'text-white hover:bg-gray-700'
                            }`}
                          >
                            {item.icon}
                            <span className="ml-3">{item.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
}

WorkoutSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  workoutStreak: PropTypes.number,
};

export default WorkoutSidebar;
