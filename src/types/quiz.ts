// src/types/quiz.ts

export interface ArticlePreview {
  title: string
}

export interface ArticleData {
  title: string
  summary: string
  key_entities: string[]
  related_topics: string[]
}

export interface Quiz {
  id: number
  questions: any[]   // you can strongly type this later
}
export interface HistoryItem {
  id: number
  title: string
  created_at: string
}

export interface Quiz {
  id: number
  title: string
  questions: any[]   // you can refine later
}
