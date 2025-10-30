import type { Article } from './types'

export function validateArticlePayload(payload: Partial<Article>) {
  const errors: Record<string, string> = {}
  // Validación de título
  if (!payload.title || payload.title.trim().length < 3) {
    errors.title = 'El título debe tener al menos 3 caracteres'
  }
  // Validación de contenido
  if (!payload.content || payload.content.trim().length < 10) {
    errors.content = 'El contenido debe tener al menos 10 caracteres'
  }
  // Validación de categoría
  if (!payload.categoryId) {
    errors.categoryId = 'La categoría es obligatoria'
  }
  return errors
}
