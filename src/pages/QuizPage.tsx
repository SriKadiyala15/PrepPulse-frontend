import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { fetchQuizById } from "../services/api"
import QuizDisplay from "../components/QuizDisplay"
import type { Quiz } from "../types/quiz"

export default function QuizPage() {
  const { id } = useParams<{ id: string }>()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!id) return

    fetchQuizById(id)
      .then(setQuiz)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div>Loading quiz...</div>
  if (!quiz) return <div>Quiz not found</div>

  return (
    <div className="quiz-shell">
      <QuizDisplay quiz={quiz} />
    </div>
  )
}
