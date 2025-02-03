import React from 'react';
import pessoa1 from '../../img/Pessoa1.png';
import pessoa2 from '../../img/Pessoa2.png'
import pessoa3 from '../../img/Pessoa3.png'
import Mainloading from '../MainLoading/loading'

const openWhatsApp = () => {
  const numeros = [
    "24998824667"
  ];
  const numeroAleatorio = numeros[Math.floor(Math.random() * numeros.length)];
  const whatsappURL = `https://api.whatsapp.com/send?phone=${numeroAleatorio}`;
  window.open(whatsappURL, '_blank');
};


const Suporte = () => {
  return (
    <div className="text-center p-6">
      <Mainloading/>
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
          <img src={pessoa1} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
          <img src={pessoa2} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
          <img src={pessoa3} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
      <h2 className="text-xl font-bold">Precisando de Ajuda?</h2>
<p className="text-muted-foreground mt-2">Fale conosco com um dos atendimentos abaixo</p>

<button
  onClick={openWhatsApp}
  className="bg-[#17A34A] text-white hover:bg-[#17A34A]/80 mt-4 px-4 py-2 rounded-full inline-block text-center no-underline"
>
  Falar no Whatsapp
</button>
    </div>
  );
};

export default Suporte;

