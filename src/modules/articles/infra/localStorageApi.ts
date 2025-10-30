import type { Article, Category } from '../domain/types'

const STORAGE_KEY = 'ama:articles_v1'
const CAT_KEY = 'ama:categories_v1'

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    console.error('Error al leer de localStorage', e)
    return null
  }
}

function write<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('Error al escribir en localStorage', e)
  }
}

export const seedInitialData = () => {
  const existing = read<Article[]>(STORAGE_KEY)
  const cats = read<Category[]>(CAT_KEY)
  if (!cats) {
    // Crear 40 categorías para que todos los artículos tengan categoría válida
    const defaultCats: Category[] = [
      { id: 'cat-1', name: 'Tecnología' },
      { id: 'cat-2', name: 'Vida' },
      { id: 'cat-3', name: 'Ciencia', parentId: 'cat-1' },
      { id: 'cat-4', name: 'Salud' },
      { id: 'cat-5', name: 'Educación' },
      { id: 'cat-6', name: 'Deportes' },
      { id: 'cat-7', name: 'Arte' },
      { id: 'cat-8', name: 'Música', parentId: 'cat-7' },
      { id: 'cat-9', name: 'Cine', parentId: 'cat-7' },
      { id: 'cat-10', name: 'Literatura', parentId: 'cat-7' },
      { id: 'cat-11', name: 'Negocios' },
      { id: 'cat-12', name: 'Finanzas', parentId: 'cat-11' },
      { id: 'cat-13', name: 'Emprendimiento', parentId: 'cat-11' },
      { id: 'cat-14', name: 'Viajes' },
      { id: 'cat-15', name: 'Gastronomía' },
      { id: 'cat-16', name: 'Política' },
      { id: 'cat-17', name: 'Historia' },
      { id: 'cat-18', name: 'Psicología' },
      { id: 'cat-19', name: 'Filosofía' },
      { id: 'cat-20', name: 'Ingeniería', parentId: 'cat-1' },
      { id: 'cat-21', name: 'Programación', parentId: 'cat-1' },
      { id: 'cat-22', name: 'Robótica', parentId: 'cat-1' },
      { id: 'cat-23', name: 'Astronomía', parentId: 'cat-3' },
      { id: 'cat-24', name: 'Biología', parentId: 'cat-3' },
      { id: 'cat-25', name: 'Química', parentId: 'cat-3' },
      { id: 'cat-26', name: 'Física', parentId: 'cat-3' },
      { id: 'cat-27', name: 'Matemáticas', parentId: 'cat-3' },
      { id: 'cat-28', name: 'Ecología', parentId: 'cat-3' },
      { id: 'cat-29', name: 'Medicina', parentId: 'cat-4' },
      { id: 'cat-30', name: 'Nutrición', parentId: 'cat-4' },
      { id: 'cat-31', name: 'Fitness', parentId: 'cat-6' },
      { id: 'cat-32', name: 'Fútbol', parentId: 'cat-6' },
      { id: 'cat-33', name: 'Baloncesto', parentId: 'cat-6' },
      { id: 'cat-34', name: 'Tenis', parentId: 'cat-6' },
      { id: 'cat-35', name: 'Natación', parentId: 'cat-6' },
      { id: 'cat-36', name: 'Ciclismo', parentId: 'cat-6' },
      { id: 'cat-37', name: 'Boxeo', parentId: 'cat-6' },
      { id: 'cat-38', name: 'Automovilismo', parentId: 'cat-6' },
      { id: 'cat-39', name: 'Voleibol', parentId: 'cat-6' },
      { id: 'cat-40', name: 'Golf', parentId: 'cat-6' },
    ]
    write(CAT_KEY, defaultCats)
  }
  if (!existing) {
    const sample: Article[] = [
      { id: 'a-1', title: 'Artículo 1', content: 'Contenido de ejemplo para el artículo 1...', categoryId: 'cat-1', createdAt: new Date().toISOString() },
      { id: 'a-2', title: 'Artículo 2', content: 'Contenido de ejemplo para el artículo 2...', categoryId: 'cat-2', createdAt: new Date().toISOString() },
      { id: 'a-3', title: 'Artículo 3', content: 'Contenido de ejemplo para el artículo 3...', categoryId: 'cat-3', createdAt: new Date().toISOString() },
      { id: 'a-4', title: 'Artículo 4', content: 'Contenido de ejemplo para el artículo 4...', categoryId: 'cat-4', createdAt: new Date().toISOString() },
      { id: 'a-5', title: 'Artículo 5', content: 'Contenido de ejemplo para el artículo 5...', categoryId: 'cat-5', createdAt: new Date().toISOString() },
      { id: 'a-6', title: 'Artículo 6', content: 'Contenido de ejemplo para el artículo 6...', categoryId: 'cat-6', createdAt: new Date().toISOString() },
      { id: 'a-7', title: 'Artículo 7', content: 'Contenido de ejemplo para el artículo 7...', categoryId: 'cat-7', createdAt: new Date().toISOString() },
      { id: 'a-8', title: 'Artículo 8', content: 'Contenido de ejemplo para el artículo 8...', categoryId: 'cat-8', createdAt: new Date().toISOString() },
      { id: 'a-9', title: 'Artículo 9', content: 'Contenido de ejemplo para el artículo 9...', categoryId: 'cat-9', createdAt: new Date().toISOString() },
      { id: 'a-10', title: 'Artículo 10', content: 'Contenido de ejemplo para el artículo 10...', categoryId: 'cat-10', createdAt: new Date().toISOString() },
      { id: 'a-11', title: 'Artículo 11', content: 'Contenido de ejemplo para el artículo 11...', categoryId: 'cat-11', createdAt: new Date().toISOString() },
      { id: 'a-12', title: 'Artículo 12', content: 'Contenido de ejemplo para el artículo 12...', categoryId: 'cat-12', createdAt: new Date().toISOString() },
      { id: 'a-13', title: 'Artículo 13', content: 'Contenido de ejemplo para el artículo 13...', categoryId: 'cat-13', createdAt: new Date().toISOString() },
      { id: 'a-14', title: 'Artículo 14', content: 'Contenido de ejemplo para el artículo 14...', categoryId: 'cat-14', createdAt: new Date().toISOString() },
      { id: 'a-15', title: 'Artículo 15', content: 'Contenido de ejemplo para el artículo 15...', categoryId: 'cat-15', createdAt: new Date().toISOString() },
      { id: 'a-16', title: 'Artículo 16', content: 'Contenido de ejemplo para el artículo 16...', categoryId: 'cat-16', createdAt: new Date().toISOString() },
      { id: 'a-17', title: 'Artículo 17', content: 'Contenido de ejemplo para el artículo 17...', categoryId: 'cat-17', createdAt: new Date().toISOString() },
      { id: 'a-18', title: 'Artículo 18', content: 'Contenido de ejemplo para el artículo 18...', categoryId: 'cat-18', createdAt: new Date().toISOString() },
      { id: 'a-19', title: 'Artículo 19', content: 'Contenido de ejemplo para el artículo 19...', categoryId: 'cat-19', createdAt: new Date().toISOString() },
      { id: 'a-20', title: 'Artículo 20', content: 'Contenido de ejemplo para el artículo 20...', categoryId: 'cat-20', createdAt: new Date().toISOString() },
      { id: 'a-21', title: 'Artículo 21', content: 'Contenido de ejemplo para el artículo 21...', categoryId: 'cat-21', createdAt: new Date().toISOString() },
      { id: 'a-22', title: 'Artículo 22', content: 'Contenido de ejemplo para el artículo 22...', categoryId: 'cat-22', createdAt: new Date().toISOString() },
      { id: 'a-23', title: 'Artículo 23', content: 'Contenido de ejemplo para el artículo 23...', categoryId: 'cat-23', createdAt: new Date().toISOString() },
      { id: 'a-24', title: 'Artículo 24', content: 'Contenido de ejemplo para el artículo 24...', categoryId: 'cat-24', createdAt: new Date().toISOString() },
      { id: 'a-25', title: 'Artículo 25', content: 'Contenido de ejemplo para el artículo 25...', categoryId: 'cat-25', createdAt: new Date().toISOString() },
      { id: 'a-26', title: 'Artículo 26', content: 'Contenido de ejemplo para el artículo 26...', categoryId: 'cat-26', createdAt: new Date().toISOString() },
      { id: 'a-27', title: 'Artículo 27', content: 'Contenido de ejemplo para el artículo 27...', categoryId: 'cat-27', createdAt: new Date().toISOString() },
      { id: 'a-28', title: 'Artículo 28', content: 'Contenido de ejemplo para el artículo 28...', categoryId: 'cat-28', createdAt: new Date().toISOString() },
      { id: 'a-29', title: 'Artículo 29', content: 'Contenido de ejemplo para el artículo 29...', categoryId: 'cat-29', createdAt: new Date().toISOString() },
      { id: 'a-30', title: 'Artículo 30', content: 'Contenido de ejemplo para el artículo 30...', categoryId: 'cat-30', createdAt: new Date().toISOString() },
      { id: 'a-31', title: 'Artículo 31', content: 'Contenido de ejemplo para el artículo 31...', categoryId: 'cat-31', createdAt: new Date().toISOString() },
      { id: 'a-32', title: 'Artículo 32', content: 'Contenido de ejemplo para el artículo 32...', categoryId: 'cat-32', createdAt: new Date().toISOString() },
      { id: 'a-33', title: 'Artículo 33', content: 'Contenido de ejemplo para el artículo 33...', categoryId: 'cat-33', createdAt: new Date().toISOString() },
      { id: 'a-34', title: 'Artículo 34', content: 'Contenido de ejemplo para el artículo 34...', categoryId: 'cat-34', createdAt: new Date().toISOString() },
      { id: 'a-35', title: 'Artículo 35', content: 'Contenido de ejemplo para el artículo 35...', categoryId: 'cat-35', createdAt: new Date().toISOString() },
      { id: 'a-36', title: 'Artículo 36', content: 'Contenido de ejemplo para el artículo 36...', categoryId: 'cat-36', createdAt: new Date().toISOString() },
      { id: 'a-37', title: 'Artículo 37', content: 'Contenido de ejemplo para el artículo 37...', categoryId: 'cat-37', createdAt: new Date().toISOString() },
      { id: 'a-38', title: 'Artículo 38', content: 'Contenido de ejemplo para el artículo 38...', categoryId: 'cat-38', createdAt: new Date().toISOString() },
      { id: 'a-39', title: 'Artículo 39', content: 'Contenido de ejemplo para el artículo 39...', categoryId: 'cat-39', createdAt: new Date().toISOString() },
      { id: 'a-40', title: 'Artículo 40', content: 'Contenido de ejemplo para el artículo 40...', categoryId: 'cat-40', createdAt: new Date().toISOString() },
    ]
    write(STORAGE_KEY, sample)
  }
}

export const api = {
  listArticles: async (): Promise<Article[]> => {
    await delay(200)
    return read<Article[]>(STORAGE_KEY) || []
  },
  getArticle: async (id: string): Promise<Article | null> => {
    await delay(200)
    const all = read<Article[]>(STORAGE_KEY) || []
    return all.find((a) => a.id === id) || null
  },
  createArticle: async (payload: Omit<Article, 'id' | 'createdAt'>) => {
    await delay(200)
    const all = read<Article[]>(STORAGE_KEY) || []
    const newArticle: Article = { ...payload, id: `a-${Date.now()}`, createdAt: new Date().toISOString() }
    all.unshift(newArticle)
    write(STORAGE_KEY, all)
    return newArticle
  },
  updateArticle: async (id: string, payload: Partial<Article>) => {
    await delay(200)
    const all = read<Article[]>(STORAGE_KEY) || []
    const idx = all.findIndex((a) => a.id === id)
    if (idx === -1) throw new Error('No encontrado')
    all[idx] = { ...all[idx], ...payload }
    write(STORAGE_KEY, all)
    return all[idx]
  },
  deleteArticle: async (id: string) => {
    await delay(200)
    const all = read<Article[]>(STORAGE_KEY) || []
    const next = all.filter((a) => a.id !== id)
    write(STORAGE_KEY, next)
    return true
  },
  listCategories: async (): Promise<Category[]> => {
    await delay(100)
    return read<Category[]>(CAT_KEY) || []
  },
}

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}
