// Утилиты для работы с метками и id
import type { LabelItem } from '../types/account'

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export const parseLabels = (labelText: string): LabelItem[] => {
  if (!labelText.trim()) return []
  return labelText
    .split(';')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
    .map((text) => ({ text }))
}

export const labelsToString = (labels: LabelItem[]): string => {
  return labels.map((item) => item.text).join('; ')
}
