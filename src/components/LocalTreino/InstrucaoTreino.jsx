import React, { useState, useEffect } from 'react';
import { FaDumbbell } from 'react-icons/fa';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const DaySection = ({ title, icon: Icon, content, isVisible, onToggle }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 transition-all duration-300 ease-in-out">
    <div
      className="flex items-center justify-between p-4 cursor-pointer bg-gray-100 hover:bg-gray-200"
      onClick={onToggle}
    >
      <div className="flex items-center">
        <Icon className="text-gray-600 text-xl mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <span className="text-gray-600">{isVisible ? '▲' : '▼'}</span>
    </div>
    {isVisible && (
      <div className="p-4 bg-white">
        {content.map((exercise, index) => (
          <div key={index} className="mb-6 last:mb-0">
            <h4 className="font-semibold text-lg mb-2">{exercise.name}</h4>
            <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={exercise.gifUrl} 
                alt={exercise.name}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="mt-2 text-gray-600">{exercise.description}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default function InstrucaoTreino() {
  const [visibleIndices, setVisibleIndices] = useState([]);
  const [otherExercises, setOtherExercises] = useState({
    biceps: [],
    triceps: [],
    costas: [],
    ombro: [],
    perna: [],
    peito: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const exercisesRef = collection(db, 'exercises');
        const snapshot = await getDocs(exercisesRef);
        const exercises = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Organizar exercícios por categoria
        const organizedExercises = {
          biceps: exercises.filter(exercise => exercise.category === 'biceps'),
          triceps: exercises.filter(exercise => exercise.category === 'triceps'),
          costas: exercises.filter(exercise => exercise.category === 'costas'),
          ombro: exercises.filter(exercise => exercise.category === 'ombro'),
          perna: exercises.filter(exercise => exercise.category === 'legs'),
          peito: exercises.filter(exercise => exercise.category === 'peito'),
        };

        // Atualiza o estado com os exercícios organizados
        setOtherExercises(organizedExercises);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar exercícios:', error);
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const handleToggleElement = (index) => {
    setVisibleIndices(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Instrução de Exercícios</h1>
      
      <div className="space-y-4">
        <DaySection 
          title="Bíceps" 
          icon={FaDumbbell} 
          content={otherExercises.biceps}
          isVisible={visibleIndices.includes('biceps')}
          onToggle={() => handleToggleElement('biceps')}
        />
        <DaySection 
          title="Tríceps" 
          icon={FaDumbbell} 
          content={otherExercises.triceps}
          isVisible={visibleIndices.includes('triceps')}
          onToggle={() => handleToggleElement('triceps')}
        />
        <DaySection 
          title="Costas" 
          icon={FaDumbbell} 
          content={otherExercises.costas}
          isVisible={visibleIndices.includes('costas')}
          onToggle={() => handleToggleElement('costas')}
        />
        <DaySection 
          title="Ombro" 
          icon={FaDumbbell} 
          content={otherExercises.ombro}
          isVisible={visibleIndices.includes('ombro')}
          onToggle={() => handleToggleElement('ombro')}
        />
        <DaySection 
          title="Perna" 
          icon={FaDumbbell} 
          content={otherExercises.perna}
          isVisible={visibleIndices.includes('perna')}
          onToggle={() => handleToggleElement('perna')}
        />
        <DaySection 
          title="Peito" 
          icon={FaDumbbell} 
          content={otherExercises.peito}
          isVisible={visibleIndices.includes('peito')}
          onToggle={() => handleToggleElement('peito')}
        />
      </div>
    </div>
  );
}
