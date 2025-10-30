import ratingReducer, { setRating } from '../store/ratingSlice';

describe('ratingSlice', () => {
  it('debe establecer un rating', () => {
    const initialState = { ratings: {} };
    const nextState = ratingReducer(initialState, setRating({ id: '1', rating: 5 }));
    expect(nextState.ratings['1']).toBe(5);
  });
});

