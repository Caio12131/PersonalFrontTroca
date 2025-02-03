import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const ProtectedAtendimentoPersonalizado = ({ children }) => {
    const [atendimento, setAtendimento]= useState('')
    const {verificarAtendimentoPersonalizado} = UserAuth()
    useEffect(()=> {
      verificarAtendimentoPersonalizado().then((valor) => setAtendimento(valor))
    }, [verificarAtendimentoPersonalizado])

   if (atendimento === false || atendimento === undefined) {
     return <Navigate to='/dieta' />;
   }
  return children;
};

export default ProtectedAtendimentoPersonalizado;
