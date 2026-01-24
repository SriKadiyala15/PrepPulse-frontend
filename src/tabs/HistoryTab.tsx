import { useEffect, useState } from "react"
import { fetchHistory, fetchQuizById } from "../services/api"
import HistoryTable from "../components/HistoryTable"
import Modal from "../components/Modal"
import QuizDisplay from "../components/QuizDisplay"
import type { HistoryItem, Quiz } from "../types/quiz"

export default function HistoryTab() {
  const [items, setItems] = useState<HistoryItem[]>([])
  const [loadingList, setLoadingList] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false)
  const [selected, setSelected] = useState<Quiz | null>(null)
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false)

  useEffect(() => {
    fetchHistory()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoadingList(false))
  }, [])

  const onView = async (id: number) => {
    setLoadingDetail(true)
    setOpen(true)
    try {
      const quiz = await fetchQuizById(id.toString())
      setSelected(quiz)
    } finally {
      setLoadingDetail(false)
    }
  }

  return (
    <div className="space-y-4">
      {loadingList ? (
        <div className="rounded border bg-white p-4 text-neutral-600">
          Loading history…
        </div>
      ) : (
        <HistoryTable items={items} onView={onView} />
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={selected?.title || "Quiz"}
      >
        {loadingDetail ? (
          <div className="text-neutral-600">Loading…</div>
        ) : selected ? (
          <QuizDisplay quiz={selected} />
        ) : (
          <div className="text-neutral-600">No data</div>
        )}
      </Modal>
    </div>
  )
}
