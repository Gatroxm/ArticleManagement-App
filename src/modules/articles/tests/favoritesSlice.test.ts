import favoritesReducer, { toggleFavorite } from '../store/favoritesSlice';

describe('favoritesSlice', () => {
  it('debe agregar y quitar un favorito', () => {
    const initialState = { favorites: [], ratings: {} };
    // Agregar
    const nextState = favoritesReducer(initialState, toggleFavorite('1'));
    expect(nextState.favorites).toContain('1');
    // Quitar
    const removedState = favoritesReducer(nextState, toggleFavorite('1'));
    expect(removedState.favorites).not.toContain('1');
  });
});

