import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const ProtectedAtendimento = ({ children }) => {
    const [atendimento, setAtendimento]= useState('')
    const {verificarAtendimento} = UserAuth()
    useEffect(()=> {
      verificarAtendimento().then((valor) => setAtendimento(valor))
    }, [verificarAtendimento])

   if (atendimento === false) {
     return <Navigate to='/dieta' />;
   }
  return children;
};

export default ProtectedAtendimento;
