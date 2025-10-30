import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type State = {
  favorites: string[]
  ratings: Record<string, number>
}

function safeParse<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch (e) {
    console.warn('No se pudo parsear localStorage para', key, e)
    return fallback
  }
}

const initialState: State = {
  favorites: safeParse<string[]>('ama:favorites', []),
  ratings: safeParse<Record<string, number>>('ama:ratings', {}),
}

const slice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload
      const idx = state.favorites.indexOf(id)
      if (idx === -1) state.favorites.push(id)
      else state.favorites.splice(idx, 1)
      localStorage.setItem('ama:favorites', JSON.stringify(state.favorites))
    },
    setRating(state, action: PayloadAction<{ id: string; rating: number }>) {
      state.ratings[action.payload.id] = action.payload.rating
      localStorage.setItem('ama:ratings', JSON.stringify(state.ratings))
    },
  },
})

export const { toggleFavorite, setRating } = slice.actions
export default slice.reducer
