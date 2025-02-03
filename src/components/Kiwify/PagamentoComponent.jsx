import React, { useState, useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext';
import CreditCard from '../../img/cartaodecredito.png'

function criarLinkPagamento(linkexterno, token) {
    const baseUrlPagamento = `${linkexterno}`; // Substitua pela URL real
    return `${baseUrlPagamento}?utm_content=${token}`;
}

function PagamentoComponent(linkexterno) {
  const [linkPagamento, setLinkPagamento] = useState('');
  const { user } = UserAuth();
  const [token, setToken] = useState('');
  const linkKiwi = linkexterno.linkexterno

  useEffect(() => {
    if (user && user.uid) {
      setToken(user.uid); // Agora esta chamada só acontece quando user.uid muda
    }
  }, [user]); // Dependência user.uid

  useEffect(() => {
    if (token) {
      const link = criarLinkPagamento(linkKiwi, token);
      setLinkPagamento(link);
    }
  }, [token, linkKiwi]); // Dependência token

  return (
    <div>
      {linkPagamento ? <a className=' no-underline' href={linkPagamento}> <button className="flex bg-white  border-1 mb-3 border-gray-300 text-gray-700  px-4 py-3 rounded-3xl shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
  <div className='flex'>
  <div className="flex items-center justify-center bg-white border-1 border-gray-300 text-white rounded-full p-2 w-[50px] mx-auto">
   <img src={CreditCard} alt='Cartao de Credito' className='w-full'/>
  </div> 
  <div className='text-left flex flex-col justify-center'>
  <span className="font-medium text-sm ml-4  text-black">
    Cartão de Crédito
    <span className="text-xs font- mt-1 text-gray-500 block">
     Aprovação na hora
    </span>
  </span>
  </div>
  </div>
</button></a> : <p>Carregando...</p>}
    </div>
  );
}

export default PagamentoComponent;