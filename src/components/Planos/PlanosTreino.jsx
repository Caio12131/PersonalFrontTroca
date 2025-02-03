import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {  FaDumbbell } from 'react-icons/fa';

const PlanCard = ({ icon, title, price, features, buttonText, link, isPopular, isIdeal }) => (
  <div className={`relative bg-white rounded-2xl overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl ${isPopular ? 'border-4 border-green-500' : isIdeal ? 'border-4 border-blue-500' : 'border border-gray-200'}`}>
    <div className="p-6 flex flex-col h-full"> {/* Adiciona flex e altura completa */}
      <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${isPopular ? 'bg-green-500' : isIdeal ? 'bg-blue-500' : 'bg-gray-100'}`}>
        {icon}
      </div>
      <h3 className="mt-4 text-xl font-bold text-center text-gray-900">{title}</h3>
      <div className="mt-4 text-center">
        <span className="text-4xl font-extrabold text-gray-900">{price}</span>
        <span className="text-base font-medium text-gray-500">/mês</span>
      </div>
      <ul className="mt-6 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg className="flex-shrink-0 w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="ml-3 text-base text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto"> {/* Alinha o botão no final */}
      <Link to={link} className={`${getButtonClass(isPopular, isIdeal)} no-underline`}>
          {buttonText}
        </Link>
      </div>
    </div>
  </div>
);

const getButtonClass = (isPopular, isIdeal) => {
  if (isPopular) {
    return 'plan-button block w-full px-6 py-3 text-base font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out';
  } else if (isIdeal) {
    return 'plan-button block w-full px-6 py-3 text-base font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out';
  }
  return 'plan-button block w-full px-6 py-3 text-base font-medium text-center text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition duration-300 ease-in-out';
};

function PlanosTreino() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plans = [
    {
      icon: <FaDumbbell className="w-8 h-8 text-gray-600" />,
      title: "Treino para Emagrecimento",
      price: "R$ 9,99",
      features: [
        "Baseada nos músculos desejados",
        "Foco Aerobico",
        "Perda de Peso",
        "Frequencia Personalizada",
        "Sugestões de substituições"
      ],
      buttonText: "Escolher Plano",
      link: "/emagrecer",
    },
    {
      icon: <FaDumbbell className="w-8 h-8 text-gray-600" />,
      title: "Treino para Definição",
      price: "R$ 11,99",
      features: [
        "Treinos personalizados",
        "Para casa ou academia",
        "Calorias ajustadas",
        "Acompanhamento de progresso",
        "Exercícios para todos os níveis",
        "Suporte para dúvidas"
      ],
      buttonText: "Escolher Plano",
      link: "/personalizado",
    },
    {
      icon: <FaDumbbell className="w-8 h-8 text-gray-600" />,
      title: "Treino para Ganho de Massa",
      price: "R$ 14,99",
      features: [
        "Treinos focados em hipertrofia",
        "Suplementação recomendada",
        "Acompanhamento de medidas",
        "Receitas ricas em proteínas",
        "Planos de treino progressivos",
      ],
      buttonText: "Escolher Plano",
      link: "/massamuscular"
    },
    {
      icon: <FaDumbbell className="w-8 h-8 text-gray-600" />,
      title: "Treino para Emagrecimento + Massa",
      price: "R$ 16,99",
      features: [
        "Treinos de alta intensidade",
        "Balanceamento de macronutrientes",
        "Estratégias de periodização",
        "Receitas para definição",
        "Monitoramento de gordura corporal",
        "Consultoria personalizada"
      ],
      buttonText: "Comprar Agora",
      link: "/definicaomassa"
    }
  ];

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8"> {/* Gradiente vermelho mais forte */}
      <div className="max-w-7xl mx-auto">
        <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-x-8">
          {plans.map((plan, index) => (
            <PlanCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlanosTreino;
