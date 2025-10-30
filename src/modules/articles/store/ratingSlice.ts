import { createSlice } from '@reduxjs/toolkit';

interface RatingState {
  ratings: Record<string, number>;
}

const initialState: RatingState = {
  ratings: JSON.parse(localStorage.getItem('ama:ratings') || '{}'),
};

const ratingSlice = createSlice({
  name: 'calificacion',
  initialState,
  reducers: {
    setRating: (state, action: { payload: { id: string; rating: number } }) => {
      state.ratings[action.payload.id] = action.payload.rating;
      localStorage.setItem('ama:ratings', JSON.stringify(state.ratings));
    },
    setRatings: (state, action: { payload: Record<string, number> }) => {
      state.ratings = action.payload;
      localStorage.setItem('ama:ratings', JSON.stringify(state.ratings));
    },
  },
});

export const { setRating, setRatings } = ratingSlice.actions;
export default ratingSlice.reducer;
