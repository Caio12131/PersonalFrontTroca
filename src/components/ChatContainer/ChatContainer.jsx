import React, { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { IMaskInput } from "react-imask";
import Apospagamento from '../AvisoPagar/instrucoesPg';
import { motion } from "framer-motion";
import { ChevronDown, User, Target, Activity, Clock, Clipboard, Heart, AlertCircle, ArrowDownRight } from "react-feather";

<style jsx global>{`
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: linear-gradient(to bottom, #ffcccc, #ff9999);
    color: black;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
  }
     body {
       background-color: transparent;
     }
   `}</style>

export default function Component({sendRequest}) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    goal: "",
    frequency: "",
    duration: "",
    local: "",
    experience: "",
    gender: "",
  });
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [error, setError] = useState("");
  const { retornaTicket, adicionarTicketUsado, salvarDados, retirarTicket, adicionarPrompt } = UserAuth();
  const [userTickets, setUserTickets] = useState(null);

  const muscleGroups = [
    { img: <Activity size={18} />, muscle: "Bíceps" },
    { img: <Activity size={18} />, muscle: "Tríceps" },
    { img: <Activity size={18} />, muscle: "Peito" },
    { img: <Activity size={18} />, muscle: "Costas" },
    { img: <Activity size={18} />, muscle: "Pernas" },
    { img: <Activity size={18} />, muscle: "Glúteos" },
    { img: <Activity size={18} />, muscle: "Abdômen" },
    { img: <Activity size={18} />, muscle: "Cardio" },
    { img: <Activity size={18} />, muscle: "Ombros" },
    { img: <Activity size={18} />, muscle: "Quadriceps" },
    { img: <Activity size={18} />, muscle: "Gluteo" },


  ];

  useEffect(() => {
    retornaTicket()
      .then((tickets) => {
        setUserTickets(tickets !== null ? tickets : "Nenhum ticket disponível")      })
      .catch(() => {
        setUserTickets("Erro ao obter os tickets");
      });
  }, [retornaTicket]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMuscleSelection = (muscle) => {
    setSelectedMuscles((prev) => 
      prev.includes(muscle) ? prev.filter(m => m !== muscle) : [...prev, muscle]
    );
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.weight && formData.height && formData.age;
      case 2:
        return selectedMuscles.length > 0;
      case 3:
        return formData.goal && formData.frequency && formData.duration && formData.experience && formData.local && formData.gender;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      setError("");
    } else {
      setError("Por favor, preencha todos os campos antes de prosseguir.");
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    setError("");
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    document.body.classList.add("scroll-lock");

    try {
      const workoutPlan = generateWorkoutPlan();
      if (userTickets === "TreinoNormal" || userTickets === "TreinoAvancado") {
        // Aqui você normalmente enviaria o workoutPlan para o backend ou processaria
        sendRequest(workoutPlan)
        console.log("Plano de treino:", workoutPlan);
      }

      resetForm();
      await retirarTicket();
      adicionarTicketUsado();
      navigate('/carregando');
    } catch (err) {
      setError('Estamos com bastante requisições! Coloque suas informações novamente para montar seu treino');
    } finally {
      setIsSubmitting(false);
      document.body.classList.remove('scroll-lock');
    }
  };

  const handleSubmitSemTicket = async () => {
    if (!validateForm()) return;

    const data = generateWorkoutPlan();
    await adicionarPrompt(data);
    const imc = formData.weight / (formData.height * formData.height);
    await salvarDados(formData.weight, formData.height, parseInt(imc));
    navigate('/planos');
  };

  const validateForm = () => {
    if (!formData.weight || !formData.height || !formData.age) {
      setError("Por favor, preencha todos os campos de informações pessoais.");
      return false;
    }
    if (!formData.goal) {
      setError("Por favor, selecione o seu Objetivo");
      return false;
    }
    if (!formData.frequency) {
      setError("Por favor, selecione a Frequência de treino");
      return false;
    }
    if (!formData.gender) {
      setError("Por favor, selecione o seu Gênero");
      return false;
    }
    if (selectedMuscles.length === 0) {
      setError("Por favor, selecione pelo menos um grupo muscular");
      return false;
    }

    return true;
  };

  const generateWorkoutPlan = () => {
    return `Crie um plano de treino personalizado com as seguintes características:
    - Objetivo: ${formData.goal}
    - Frequência: ${formData.frequency} vezes por semana
    - Duração: ${formData.duration} minutos por sessão
    - Nível de experiência: ${formData.experience}
    - Grupos musculares preferidos: ${selectedMuscles.join(", ")}
    - Gênero: ${formData.gender}
    - Idade: ${formData.age} anos
    - Peso: ${formData.weight} kg
    - Altura: ${formData.height} m    
    - Local de Treino: ${formData.local} 

    Forneça um plano detalhado para cada dia de treino, incluindo:
    - Exercícios específicos
    - Número de séries e repetições
    - Tempo de descanso entre séries
    - Exercicios comuns que geralmente as pessoas fazem Exemplo: Leg press, Hack,Agachamento, entre outros...
    - Dicas de execução e técnica
    - Sugestões de aquecimento e alongamento

    Adapte o plano de acordo com o nível de experiência e os objetivos do usuário.`;
  };

  const resetForm = () => {
    setFormData({
      weight: "",
      height: "",
      age: "",
      goal: "",
      frequency: "",
      duration: "",
      experience: "",
      gender: "",
      local: "",
    });
    setSelectedMuscles([]);
    setError("");
    setCurrentStep(1);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-2xl shadow-2xl relative z-10">
      {/* Background removed */}
      <ProgressBar currentStep={currentStep} totalSteps={4} />

      {currentStep === 1 && (
        <>
          <h1 className="text-2xl font-bold text-center mb-4 text-gray-900">Vamos montar seu Treino? 💪</h1>
        </>
      )}
      <br />
      {currentStep === 1 && (
        <div className="p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
            <User className="mr-2" /> Informações Pessoais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <InputField
                name="weight"
                placeholder="Peso (kg)"
                mask="000"
                value={formData.weight}
                onChange={handleInputChange}
              />
              {!formData.weight && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <AlertCircle className="h-5 w-5 text-black-500" />
                </div>
              )}
            </div>
            <InputField
              name="height"
              placeholder="Altura (m)"
              mask="0.00"
              value={formData.height}
              onChange={handleInputChange}
            />
            <InputField
              name="age"
              placeholder="Idade"
              mask="000"
              value={formData.age}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}

    {currentStep === 2 && (
      <div className="p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
          <Activity className="mr-2" /> Preferencia Musculares
        </h2>
      <div className="grid grid-cols-2 gap-2">
        {muscleGroups.map((muscle) => (
          <motion.button
            key={muscle.muscle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center border-2 border-black ${
              selectedMuscles.includes(muscle.muscle)
                ? 'bg-black text-white shadow-md'
                : 'bg-white text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => handleMuscleSelection(muscle.muscle)}
          >
            {muscle.img}
            <span className="ml-2">{muscle.muscle}</span>
          </motion.button>
      ))}
    </div>
  </div>
)}


      {currentStep === 3 && (
        <div>
          <div className="p-6 rounded-xl mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
              <Clipboard className="mr-2" /> Detalhes do Treino
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                name="goal"
                value={formData.goal}
                onChange={handleInputChange}
                options={[
                  { value: "", label: "Qual é seu objetivo?" },
                  { value: "Perda de peso", label: "Perda de peso" },
                  { value: "Ganho de massa muscular", label: "Ganho de massa muscular" },
                  { value: "Definição muscular", label: "Definição muscular" },
                  { value: "Melhora da resistência", label: "Melhora da resistência" },
                  { value: "Manutenção da saúde", label: "Manutenção da saúde" },
                ]}
                icon={<Target className="mr-2" />}
              />
              <SelectField
                name="frequency"
                value={formData.frequency}
                onChange={handleInputChange}
                options={[
                  { value: "", label: "Frequência semanal" },
                  { value: "Segunda, Quarta e Sexta", label: "Segunda, Quarta e Sexta" },
                  { value: "Segunda, Terça, Quarta, Quinta e Sexta", label: "Segunda, Terça, Quarta, Quinta e Sexta" },
                  { value: "Segunda, Terça, Quarta, Quinta, Sexta e Sábado", label: "Segunda, Terça, Quarta, Quinta e Sexta e Sábado" },
                  { value: "Terça e Quinta", label: "Terça e Quinta" },
                  { value: "Todos os dias da semana", label: "Todos os dias da semana" },
                ]}
                icon={<Activity className="mr-2" />}
              />
              
              <SelectField
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                options={[
                  { value: "", label: "Duração da sessão" },
                  { value: "30", label: "30 minutos" },
                  { value: "45", label: "45 minutos" },
                  { value: "60", label: "60 minutos" },
                  { value: "90", label: "90 minutos" },
                ]}
                icon={<Clock className="mr-2" />}
              />
              <SelectField
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                options={[
                  { value: "", label: "Nível de experiência" },
                  { value: "Iniciante", label: "Iniciante" },
                  { value: "Intermediário", label: "Intermediário" },
                  { value: "Avançado", label: "Avançado" },
                ]}
                icon={<Heart className="mr-2" />}
              />
              <SelectField 
                name="local" 
                value={formData.local} 
                onChange={handleInputChange} 
                options={[ 
                  { value: "", label: "Local do Treino" }, 
                  { value: "Na Academia", label: "Na Academia" }, 
                  { value: "Em casa", label: "Em casa" }, 
                ]} 
                icon={<ArrowDownRight className="mr-2" />} 
              />
            </div>
          </div>

          <div className="p-6 rounded-xl">
  <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
    <User className="mr-2" /> Gênero
  </h2>
  <div className="flex justify-center space-x-4">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-2 rounded-full text-lg font-semibold transition-colors duration-300 border-2 border-black ${
        formData.gender === 'Masculino' ? 'bg-black text-white' : 'bg-white text-gray-800 hover:bg-gray-200'
      }`}
      onClick={() => setFormData(prev => ({ ...prev, gender: 'Masculino' }))}
    >
      Masculino
    </motion.button>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-2 rounded-full text-lg font-semibold transition-colors duration-300 border-2 border-black ${
        formData.gender === 'Feminino' ? 'bg-black text-white' : 
        'bg-white text-gray-800 hover:bg-gray-200'
      }`}
      onClick={() => setFormData(prev => ({ ...prev, gender: 'Feminino' }))}
    >
      Feminino
    </motion.button>
  </div>
</div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="text-center space-y-4">
          <Apospagamento />
          {userTickets === 0 || userTickets === undefined ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-red-500 text-white py-3 px-6 rounded-full text-lg font-medium shadow-sm transition-all duration-300 hover:bg-red-600"
              onClick={handleSubmitSemTicket}
            >
              MONTAR MEU TREINO
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-4 px-6 rounded-full text-lg font-bold shadow-lg transition-all duration-300 ${
                isSubmitting || (userTickets !== 'TreinoNormal' && userTickets !== 'TreinoAvancado')
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
              disabled={isSubmitting || (userTickets !== 'TreinoNormal' && userTickets !== 'TreinoAvancado')}
              onClick={handleSubmit}
            >
              {isSubmitting ? 'Processando...' : 'MONTAR MEU TREINO'}
            </motion.button>
          )}
        </div>
      )}

      {error && (
        <div className="mt-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
          <p className="font-bold">Erro</p>
          <p>{error}</p>
        </div>
      )}

      <div className="mt-8 flex justify-between">
        {currentStep > 1 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-white text-gray-800 rounded-full hover:bg-red-100"
            onClick={prevStep}
          >
            Anterior
          </motion.button>
        )}
        {currentStep < 4 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-black text-white rounded-full ml-auto hover:bg-gray-800"
            onClick={nextStep}
          >
            Próximo
          </motion.button>
        )}
      </div>
    </div>
  );
}

const InputField = ({ name, placeholder, mask, value, onChange }) => (
  <div className="relative">
    <IMaskInput
      mask={mask}
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
    />
  </div>
);

const SelectField = ({ name, value, onChange, options, icon }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon}
    </div>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full pl-10 pr-3 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 appearance-none bg-white text-black"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
      <div 
        className="bg-black h-2.5 rounded-full transition-all duration-300 ease-in-out" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};