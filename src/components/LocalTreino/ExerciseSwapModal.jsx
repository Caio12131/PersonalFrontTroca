import { useState } from "react"
import { FaTimes } from "react-icons/fa"
import { Exercicios, ExerciciosEmCasa } from "./Exercises"

const ExerciseSwapModal = ({
  onClose,
  onSwap,
  currentExercise,
  exerciseGroup = "",
  isHomeWorkout = false,
  currentWorkout = {},
  currentDay = "",
  remainingSwaps = {},
}) => {
  const [selectedExercise, setSelectedExercise] = useState(null)

  const handleConfirmSwap = () => {
    if (selectedExercise) {
      onSwap(selectedExercise)
    } else {
      alert("Por favor, selecione um exercício para trocar.")
    }
  }

  const exercises = isHomeWorkout ? ExerciciosEmCasa : Exercicios
  const groupExercises = exercises[exerciseGroup] || []

  const availableExercises = groupExercises.filter((exercise) => {
    const isExerciseInWorkout = Object.values(currentWorkout || {}).some((dayExercises) =>
      (dayExercises || []).some((workoutExercise) => workoutExercise?.exercise?.id === exercise.id),
    )

    // Filtrar exercícios disponíveis e garantir o grupo correto
    return (
      !isExerciseInWorkout &&
      exercise.id !== currentExercise?.exercise?.id &&
      (exercise.group === exerciseGroup || !exercise.group)
    )
  })

  const noAvailableExercises = availableExercises.length === 0

  // Usar o valor de remainingSwaps para o dia atual, ou 0 se não estiver definido
  const swapsRemaining = remainingSwaps && remainingSwaps[currentDay] !== undefined ? remainingSwaps[currentDay] : 0

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Escolha um novo exercício</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Exercício atual: {currentExercise?.exercise?.exercicio || "N/A"}</p>
          <p>Grupo muscular: {exerciseGroup || "N/A"}</p>
          <p>
            Trocas restantes para o dia {currentDay}: {remainingSwaps[currentDay] || 0}
          </p>
        </div>
        <div className="space-y-2">
          {noAvailableExercises ? (
            <p className="text-gray-500 italic">Não há exercícios disponíveis para troca neste grupo muscular.</p>
          ) : (
            availableExercises.map((exercise) => (
              <div
                key={exercise.id}
                className={`p-2 border rounded cursor-pointer ${
                  selectedExercise?.id === exercise.id ? "bg-blue-100 border-blue-500" : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedExercise(exercise)}
              >
                <p className="font-medium">{exercise.exercicio}</p>
              </div>
            ))
          )}
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            Cancelar
          </button>
          <button
            onClick={handleConfirmSwap}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!selectedExercise || noAvailableExercises || swapsRemaining === 0}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExerciseSwapModal

