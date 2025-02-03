import React, { useState } from 'react'
import { getDatabase, ref, get } from 'firebase/database'
import { auth } from '../firebase'


export const buscarTreinos = async () => {
  try {
    const current = auth.currentUser
    if (current) {
      const db = getDatabase()
      const treinosRef = ref(db, `users/${current.uid}/treinosGerados`)
      
      const snapshot = await get(treinosRef)
      
      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        console.log("Nenhum treino encontrado.")
        return null
      }
    }
  } catch (error) {
    console.error("Erro ao buscar treinos:", error)
    return null
  }
}

export default function WorkoutConsultation() {
  const [workouts, setWorkouts] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleConsultWorkout = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const retrievedWorkouts = await buscarTreinos()
      setWorkouts(retrievedWorkouts)
    } catch (err) {
      setError("Erro ao consultar treinos. Por favor, tente novamente.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Consulta de Treinos</h1>
      <button
        onClick={handleConsultWorkout}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? 'Consultando...' : 'Consultar Treino'}
      </button>
      {error && (
        <p className="mt-4 text-red-500">{error}</p>
      )}
      {workouts && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Treinos Encontrados:</h2>
          {Object.entries(workouts).map(([key, workout]) => (
            <div key={key} className="mb-4 p-4 border rounded shadow">
              <p className="font-bold">Data de Criação: {formatDate(workout.dataCriacao)}</p>
              <div className="mt-2 space-y-2">
                <p><strong>Duração:</strong> {workout.duracao}</p>
                <p><strong>Nível:</strong> {workout.nivel}</p>
                <p><strong>Grupos Musculares:</strong> {workout.gruposMusculares.join(', ')}</p>
                <p><strong>Dias de Treino:</strong> {workout.diasTreino.join(', ')}</p>
                <details>
                  <summary className="cursor-pointer text-blue-500 hover:text-blue-700">Ver Treino Completo</summary>
                  <pre className="mt-2 whitespace-pre-wrap bg-gray-100 p-2 rounded">{JSON.stringify(workout.treino, null, 2)}</pre>
                </details>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}