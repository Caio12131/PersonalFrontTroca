import React, { useState, useCallback, useEffect } from 'react'
import { Clock, Dumbbell, Activity, Brain, Flame, Calendar, Check, X, Home, Building2 } from 'lucide-react'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import WorkoutSidebar from '../Menu/HamburgerMenu'
import { UserAuth } from '../../context/AuthContext'
import { Book } from 'react-feather'

export default function WorkoutGenerator({ tickets }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(20);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [selectedPrimaryMuscle, setSelectedPrimaryMuscle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { adicionarPromptTreino, adicionarTicketUsado, retirarTicket } = UserAuth();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const levelOptions = ['Iniciante', 'Intermediário', 'Avançado'];
  const muscleGroups = ['Biceps', 'Triceps', 'Costas', 'Ombro', 'Perna', 'Peito', 'Antebraco', 'Abdomen', 'Cardio', 'Trapezio', 'Gluteos', 'Panturrilha'];
  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const locationOptions = ['em casa', 'na academia'];

  const handleMuscleGroupChange = useCallback((group) => {
    setSelectedMuscleGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  }, []);

  const handleDayToggle = useCallback((day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }, []);

  const handleGenerateWorkout = useCallback(async () => {
    if (isSubmitting) return;

    if (!selectedTime || !selectedLevel || !selectedLocation || selectedMuscleGroups.length === 0 || selectedDays.length === 0 || !selectedPrimaryMuscle) {
      setErrorMessage('Por favor, selecione todas as opções antes de gerar o treino.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (tickets !== 'TreinoNormal' && tickets !== 'TreinoAvançado') {
        const prompt = {
          time: selectedTime,
          level: selectedLevel,
          muscleGroups: selectedMuscleGroups,
          days: selectedDays,
          location: selectedLocation,
          primaryMuscle: selectedPrimaryMuscle,
          uid: auth.currentUser?.uid,
        };
        await adicionarPromptTreino(prompt);
        navigate('/planos');
        return;
      }

      setErrorMessage('');
      setIsLoading(true);

      const response = await fetch(`http://3.17.177.120/api/generateWorkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          time: selectedTime,
          level: selectedLevel,
          muscleGroups: selectedMuscleGroups,
          days: selectedDays,
          location: selectedLocation,
          primaryMuscle: selectedPrimaryMuscle,
          uid: auth.currentUser?.uid,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate workout');
      }

      const workout = await response.json();
      await retirarTicket();
      await adicionarTicketUsado();
      console.log(workout);
    } catch (error) {
      console.error('Error generating workout:', error);
      setErrorMessage('Erro ao gerar o treino: ' + error.message);
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  }, [selectedTime, selectedLevel, selectedMuscleGroups, selectedDays, selectedLocation, selectedPrimaryMuscle, adicionarTicketUsado, navigate, adicionarPromptTreino, tickets, retirarTicket, isSubmitting]);

  useEffect(() => {
    if (isLoading) {
      navigate('/carregando');
    }
  }, [isLoading, navigate]);

  return (
    <div className="font-sans bg-white min-h-screen text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <WorkoutSidebar isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>

      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="lg:border lg:border-gray-200 rounded-3xl overflow-hidden">
          <div className="p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4 text-black flex items-center">
                    <Book className="w-6 h-6 mr-2 text-gray-600" />
                    Informações Pessoais
                  </h2>
                  <div className="flex flex-col gap-2 ">
                    <input
                      type="text"
                      value={peso}
                      placeholder="Peso (em kg)"
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/[^0-9]/g, '').slice(0, 3);
                        setPeso(value);
                      }}
                      className="mb-2 px-3 py-2 rounded-lg text-md font-medium border border-gray-300 hover:bg-gray-100"
                    />
                    <input
                      type="text"
                      value={altura}
                      placeholder="Altura (em metros)"
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/[^0-9]/g, '').slice(0, 3);
                        if (value.length > 1) {
                          value = `${value.slice(0, -2)}.${value.slice(-2)}`;
                        }
                        setAltura(value);
                      }}
                      className="mb-2 px-3 py-2 rounded-lg text-md font-medium border border-gray-300 hover:bg-gray-100"
                    />
                    <select
                      value={objetivo}
                      onChange={(e) => setObjetivo(e.target.value)}
                      className="appearance-none px-3 py-2 rounded-lg text-md font-medium border bg-white border-gray-300 hover:bg-gray-100"
                    >
                      <option value="">Selecione seu Objetivo</option>
                      <option value="1.1">Emagrecimento</option>
                      <option value="1.2">Ganho de Massa Muscular</option>
                      <option value="1.3">Definição Muscular</option>
                      <option value="1.4">Definição com Ganho de Massa</option>
                      <option value="1.5">Ganho de Força</option>
                      <option value="1.6">Melhora da Resistência</option>
                    </select>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4 text-black flex items-center">
                    <Brain className="w-6 h-6 mr-2 text-gray-600" />
                    Nível de Experiência
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {levelOptions.map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          selectedLevel === level
                            ? 'bg-black text-white'
                            : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
  
                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4 text-black flex items-center">
                    <Clock className="w-6 h-6 mr-2 text-gray-600" />
                    Duração do Treino
                  </h2>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="20"
                      max="120"
                      step="10"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, black 0%, black ${(selectedTime - 20) / 100 * 100}%, #E5E7EB ${(selectedTime - 20) / 100 * 100}%, #E5E7EB 100%)`,
                      }}
                    />
                    <span className="ml-4 text-lg font-medium text-black min-w-[4rem]">
                      {selectedTime} min
                    </span>
                  </div>
                </div>
              </div>
  
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4 text-black flex items-center">
                    <Dumbbell className="w-6 h-6 mr-2 text-gray-600" />
                    Preferências Musculares
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {muscleGroups.map((group) => (
                      <button
                        key={group}
                        onClick={() => handleMuscleGroupChange(group)}
                        className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          selectedMuscleGroups.includes(group)
                            ? 'bg-black text-white'
                            : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {selectedMuscleGroups.includes(group) && <Check className="w-4 h-4 mr-2" />}
                        {group}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Added component for primary muscle selection */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4 text-black flex items-center">
                    <Dumbbell className="w-6 h-6 mr-2 text-gray-600" />
                    Músculo Principal
                  </h2>
                  <select
                    value={selectedPrimaryMuscle}
                    onChange={(e) => setSelectedPrimaryMuscle(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 bg-white hover:bg-gray-100"
                  >
                    <option value="">Selecione um músculo principal</option>
                    {muscleGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4 text-black flex items-center">
                    <Calendar className="w-6 h-6 mr-2 text-gray-600" />
                    Dias de Treino
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map((day) => (
                      <button
                        key={day}
                        onClick={() => handleDayToggle(day)}
                        className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          selectedDays.includes(day)
                            ? 'bg-black text-white'
                            : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
  
                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4 text-black flex items-center">
                    <Building2 className="w-6 h-6 mr-2 text-gray-600" />
                    Local do Treino
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {locationOptions.map((location) => (
                      <button
                        key={location}
                        onClick={() => setSelectedLocation(location)}
                        className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          selectedLocation === location
                            ? 'bg-black text-white'
                            : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {location === 'em casa' ? <Home className="w-4 h-4 mr-2" /> : <Building2 className="w-4 h-4 mr-2" />}
                        {location}
                      </button>
                    ))}
                  </div>
                </div>
               
             
              </div>
            </div>

            
  
            {errorMessage && (
              <div className="mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-center">
                <X className="w-5 h-5 mr-2 flex-shrink-0" />
                <p>{errorMessage}</p>
              </div>
            )}
  
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleGenerateWorkout}
                disabled={isLoading || isSubmitting}
                className="flex-1 bg-black text-white px-6 py-3 rounded-full font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-gray-900 flex items-center justify-center"
              >
                {isLoading ? <Activity className="w-5 h-5 mr-2 animate-spin" /> : <Flame className="w-5 h-5 mr-2" />}
                {isLoading ? 'Gerando...' : 'Gerar Treino'}
              </button>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  )
}
//
//