"use client"

import { useState, useEffect } from "react"
import { UserAuth } from "../../context/AuthContext"
import { FaCalendarDay, FaExclamationTriangle, FaExchangeAlt } from "react-icons/fa"
import { get, getDatabase, ref, update } from "firebase/database"
import ExerciseSwapModal from "./ExerciseSwapModal"

const DaySection = ({ title, content, isVisible, onToggle, onSwapExercise, remainingSwaps }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
    <div
      className="flex items-center justify-between p-4 cursor-pointer bg-gray-100 hover:bg-gray-200"
      onClick={onToggle}
    >
      <div className="flex items-center">
        <FaCalendarDay className="text-gray-600 text-xl mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <span className="text-gray-600">{isVisible ? "▲" : "▼"}</span>
    </div>
    {isVisible && (
      <div className="p-4 bg-white">
        {content.map((exercise, index) => (
          <div key={`${exercise.exercise?.exercicio || index}-${index}`} className="mb-6 border-b pb-4">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-lg">{exercise.exercise?.exercicio || "Exercício não especificado"}</p>
              {remainingSwaps[title] > 0 && (
                <button
                  onClick={() => onSwapExercise(title, index)}
                  className="bg-black text-white px-2 py-1 rounded hover:bg-gray-800 transition duration-300 flex items-center"
                >
                  <FaExchangeAlt className="mr-1" />
                  Trocar ({remainingSwaps[title]})
                </button>
              )}
            </div>
            {exercise.exercise?.gif && (
              <img
                src={exercise.exercise.gif || "/placeholder.svg"}
                alt={exercise.exercise.exercicio || "Exercício"}
                className="w-full max-w-xs mx-auto mt-2 mb-2 rounded-lg shadow-md"
              />
            )}
            {exercise.exercise?.description && (
              <p className="text-sm text-gray-600 italic mb-2">{exercise.exercise.description}</p>
            )}
            {exercise.group === "Cardio" ? (
              <p className="text-sm text-gray-700">{`Duração: ${exercise.duration || exercise.reps} `}</p>
            ) : (
              <p className="text-sm text-gray-700">{`${exercise.sets || "-"} séries x ${exercise.reps || "-"} repetições`}</p>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
)

export default function LocalTreino() {
  const [currentWorkout, setCurrentWorkout] = useState(null)
  const [expandedDays, setExpandedDays] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [remainingSwaps, setRemainingSwaps] = useState({})
  const [showSwapModal, setShowSwapModal] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState(null)
  const { user } = UserAuth()

  useEffect(() => {
    const fetchWorkout = async () => {
      console.log("Fetching workout...")
      setError(null)
      try {
        if (user?.uid) {
          const db = getDatabase()
          const userRef = ref(db, `users/${user.uid}`)
          const snapshot = await get(userRef)

          if (snapshot.exists()) {
            const userData = snapshot.val()
            setCurrentWorkout(userData.treinosGerados)
            setRemainingSwaps(userData.trocasRestantes || {})
            setExpandedDays(Object.fromEntries(Object.keys(userData.treinosGerados).map((day) => [day, true])))
          } else {
            console.log("No workout found")
          }
        }
      } catch (error) {
        console.error("Error fetching workout:", error)
        setError("Ocorreu um erro ao buscar seu treino. Por favor, tente novamente mais tarde.")
      } finally {
        setIsLoading(false)
      }
    }
//
    fetchWorkout()
  }, [user])

  const toggleDayExpansion = (day) => {
    setExpandedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }))
  }

  const sortDaysOfWeek = (workoutData) => {
    const order = ["segunda", "terça", "quarta", "quinta", "sexta", "sábado", "domingo"]

    const formattedWorkoutData = Object.entries(workoutData).map(([key, value]) => {
      let dayName = key.toLowerCase()
      if (dayName === "monday") dayName = "segunda"
      if (dayName === "tuesday") dayName = "terça"
      if (dayName === "wednesday") dayName = "quarta"
      if (dayName === "thursday") dayName = "quinta"
      if (dayName === "friday") dayName = "sexta"
      if (dayName === "saturday") dayName = "sábado"
      if (dayName === "sunday") dayName = "domingo"

      return [dayName, value]
    })

    return formattedWorkoutData.sort(([dayA], [dayB]) => order.indexOf(dayA) - order.indexOf(dayB))
  }

  const handleSwapExercise = (day, index) => {
    const exerciseData = currentWorkout[day][index]
    setSelectedExercise({
      day,
      index,
      exercise: exerciseData.exercise || {},
      group: exerciseData.group || "",
      isHomeWorkout: exerciseData.exercise?.isHomeWorkout || false,
    })
    setShowSwapModal(true)
  }

  const performSwap = async (newExercise) => {
    if (remainingSwaps[selectedExercise.day] > 0 && user?.uid) {
      const db = getDatabase()
      const userRef = ref(db, `users/${user.uid}`)

      try {
        const updatedWorkout = { ...currentWorkout }
        updatedWorkout[selectedExercise.day][selectedExercise.index] = {
          ...updatedWorkout[selectedExercise.day][selectedExercise.index],
          exercise: newExercise,
        }

        const newRemainingSwaps = { ...remainingSwaps }
        newRemainingSwaps[selectedExercise.day] -= 1

        await update(userRef, {
          treinosGerados: updatedWorkout,
          trocasRestantes: newRemainingSwaps,
        })

        setCurrentWorkout(updatedWorkout)
        setRemainingSwaps(newRemainingSwaps)
        setShowSwapModal(false)
      } catch (error) {
        console.error("Error updating workout:", error)
        setError("Ocorreu um erro ao trocar o exercício. Por favor, tente novamente.")
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Seu Treino Personalizado</h1>
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <div className="flex items-center">
            <FaExclamationTriangle className="mr-2" />
            <p>{error}</p>
          </div>
        </div>
      )}
      {isLoading ? (
        <p className="text-center text-gray-600">Carregando seu treino...</p>
      ) : currentWorkout ? (
        <div className="space-y-4">
          {sortDaysOfWeek(currentWorkout).map(([day, exercises]) => (
            <DaySection
              key={day}
              title={day.charAt(0).toUpperCase() + day.slice(1)}
              content={exercises}
              isVisible={expandedDays[day]}
              onToggle={() => toggleDayExpansion(day)}
              onSwapExercise={handleSwapExercise}
              remainingSwaps={remainingSwaps}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Nenhum treino encontrado. Gere um novo treino para começar!</p>
      )}
      {showSwapModal && selectedExercise && (
        <ExerciseSwapModal
          onClose={() => setShowSwapModal(false)}
          onSwap={performSwap}
          currentExercise={selectedExercise}
          exerciseGroup={selectedExercise.group}
          isHomeWorkout={selectedExercise.isHomeWorkout}
          currentWorkout={currentWorkout}
          currentDay={selectedExercise.day}
          remainingSwaps={remainingSwaps}
        />
      )}
    </div>
  )
}

