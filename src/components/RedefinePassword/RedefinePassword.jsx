import React, { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';

import { useNavigate } from 'react-router-dom';


const RedefinePassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { redefinePassword } = UserAuth();
  const navigate = useNavigate();
  

  const Redefinir = async () => {
    
    try {
       await redefinePassword(email);
       setError("Verifique sua caixa de entrada para redefinir a senha")
    } catch {      
    }
  };




  return (
    <div className="w-5/6 md:max-w-[700px] h-full mx-auto ">
      <div className="text-center">
        {/* eslint-disable-next-line */}
       
      </div>
    
        <div className="mb-3">
          <label className="block text-gray-700 mb-2 font-medium">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border border-green-500 rounded-lg p-3 w-full"
            type="email"
            placeholder="Seu email"
            required
          />
        </div>
      
      
        {error && <p className="text-center text-green-600 mb-3">Email enviado! {error}</p>}
        <button className="bg-green-500 text-white font-medium py-3 rounded-lg w-full hover:bg-green-600" onClick={Redefinir}>
          Redefinir
        </button>
        <div className="mt-3 text-center">
          <p className='mb-3'>
            Já redefiniu a senha?{' '}
          </p>
            <button className="bg-white border border-green-500 text-green-500 font-medium py-3 rounded-lg w-full mb-5 hover:bg-green-100" onClick={() => navigate('/')}>
              ENTRAR
            </button>
         
        </div>
    
    </div>
  );
};

export default RedefinePassword;
