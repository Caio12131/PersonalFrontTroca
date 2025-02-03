import React, { useEffect, useState, useCallback } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { IMaskInput } from 'react-imask';
import { XCircle, Droplet, Scale, Ruler, Activity } from 'lucide-react';

export default function SobreMim() {
  const [userAltura, setUserAltura] = useState(0);
  const [userPeso, setUserPeso] = useState(0);
  const [userAge, setUserAge] = useState('');
  const [genero, setGenero] = useState('');
  const [aguaRecomendada, setAguaRecomendada] = useState(0);
  const [color, setColor] = useState('text-black')
  const [msgSave, setMsgSave] = useState('');
  const [alteracao, setAlteracao] = useState(false);
  const [labelAlterar, setLabelAlterar] = useState('Atualizar Dados');
  const [bmi, setBMI] = useState(0);
  const [status, setStatus] = useState('');

  const { retornaDados, salvarDados } = UserAuth();
  const navigate = useNavigate();

  const handlerTreinos = () => {
    navigate('/treino')
  }

  const calcularAguaNecessaria = useCallback(() => {
    const agua = (userPeso ? 0.035 * userPeso : 0).toFixed(2);
    setAguaRecomendada(agua);
  }, [userPeso]);

  const getPointerPosition = () => {
    const minBMI = 15;
    const maxBMI = 40;
    const bmiValue = parseFloat(bmi);
    if (bmiValue < minBMI) {
      return 0;
    } else if (bmiValue > maxBMI) {
      return 100;
    } else {
      return ((bmiValue - minBMI) / (maxBMI - minBMI)) * 100;
    }
  };

  useEffect(() => {
    retornaDados()
      .then((array) => {
        if (array !== null) {
          setUserPeso(array[0]);
          setUserAltura(array[1]);
          const bmiValue = (array[0] / (array[1] * array[1])).toFixed(1);
          setBMI(bmiValue);
      
          if (bmiValue < 18.5) {
            setStatus('Abaixo do peso');
            setColor('text-yellow-600')
          } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
            setStatus('Peso Saúdavel');
            setColor('text-green-600')
          } else if (bmiValue >= 25 && bmiValue < 29.9) {
            setStatus('Acima do peso');
            setColor('text-orange-600')
          } else {
            setStatus('Obesidade');
            setColor('text-red-600')
          }
        } else {
          console.log('Sem dados ainda');
        }
      })
      .catch((error) => {
        console.error('Erro ao obter os dados:', error);
      });
  }, [retornaDados]);

  useEffect(() => {
    calcularAguaNecessaria();
  }, [userPeso, calcularAguaNecessaria]);

  const handleAlterar = () => {
    setAlteracao(!alteracao);
    setLabelAlterar("Alterar Dados");
    setMsgSave("");
  };

  const handleFechar = () => {
    setAlteracao(!alteracao);
  }

  const handleSalvar = async () => {
    // Validações para garantir que todos os campos estão preenchidos
    if (!userPeso || userPeso <= 0) {
      setMsgSave("Por favor, insira um peso válido.");
      return;
    }
  
    if (!userAltura || userAltura <= 0) {
      setMsgSave("Por favor, insira uma altura válida.");
      return;
    }
  
    if (!userAge || userAge <= 0) {
      setMsgSave("Por favor, insira uma idade válida.");
      return;
    }
  
    const imc = userPeso / (userAltura * userAltura);
    
    try {
      await salvarDados(userPeso, userAltura, parseInt(imc));
      setMsgSave("Dados Salvos com Sucesso!");
    } catch {
      setMsgSave("Erro ao salvar os dados.");
    } finally {
      // Reload the page or update state if necessary
      navigate(window.location.pathname);
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Perfil de Saúde</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-center mb-4">
            <Scale className="w-8 h-8 text-blue-500 mr-2" />
            <h3 className="text-xl font-semibold text-gray-700">Peso</h3>
          </div>
          <p className="text-3xl font-bold text-center text-blue-600">{userPeso} kg</p>
        </div>

        <div className="bg-green-50 p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-center mb-4">
            <Ruler className="w-8 h-8 text-green-500 mr-2" />
            <h3 className="text-xl font-semibold text-gray-700">Altura</h3>
          </div>
          <p className="text-3xl font-bold text-center text-green-600">{userAltura} m</p>
        </div>

        <div className="bg-purple-50 p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-center mb-4">
            <Droplet className="w-8 h-8 text-purple-500 mr-2" />
            <h3 className="text-xl font-semibold text-gray-700">Água/Dia</h3>
          </div>
          <p className="text-3xl font-bold text-center text-purple-600">{aguaRecomendada} L</p>
        </div>
      </div>

      {bmi && (
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <div className="flex items-center mb-6">
            <Activity className="w-8 h-8 text-indigo-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Índice de Massa Corporal (IMC)</h2>
          </div>
          <p className={`${color} text-2xl font-semibold mb-4`}>{status}</p>
          <div className="relative w-full h-4 bg-gray-200 rounded-full mb-4">
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full" style={{width: `${getPointerPosition()}%`}}></div>
            <div className="absolute top-full left-0 w-full flex justify-between text-xs text-gray-600 mt-1">
              <span>15</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>35</span>
              <span>40</span>
            </div>
          </div>
          <p className="text-5xl font-bold text-center text-indigo-600">{bmi}</p>
        </div>
      )}

      {alteracao && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md">
            <button onClick={handleFechar} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <XCircle className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Atualizar Dados</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
                <input
                  type="number"
                  id="weight"
                  value={userPeso}
                  onChange={(e) => setUserPeso(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite seu Peso"
                />
              </div>
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">Altura (m)</label>
                <IMaskInput
                  mask="0.00"
                  type="text"
                  id="height"
                  value={userAltura}
                  onChange={(e) => setUserAltura(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite sua Altura: Ex: 1.69"
                />
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Idade</label>
                <input
                  type="number"
                  id="age"
                  value={userAge}
                  onChange={(e) => setUserAge(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite sua Idade"
                />
              </div>
              <div>
                <label htmlFor="genero" className="block text-sm font-medium text-gray-700 mb-1">Gênero</label>
                <select
                  id="genero"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Informe seu gênero</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
              </div>
              <button 
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                onClick={handleSalvar}
              >
                SALVAR
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center space-x-4">
        <button 
          className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700 transition duration-300"
          onClick={handleAlterar}
        >
          {labelAlterar}
        </button>
        <button 
          className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition duration-300"
          onClick={handlerTreinos}
        >
          Minhas Dietas
        </button>
      </div>

      {msgSave && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {msgSave}
        </div>
      )}
    </div>
  );
}