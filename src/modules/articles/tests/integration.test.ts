import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer, { toggleFavorite } from '../store/favoritesSlice';

describe('Integración Redux', () => {
  it('actualiza favoritos correctamente', () => {
    const store = configureStore({ reducer: { favorites: favoritesReducer } });
    store.dispatch(toggleFavorite('1'));
    expect(store.getState().favorites.favorites).toContain('1');
    store.dispatch(toggleFavorite('1'));
    expect(store.getState().favorites.favorites).not.toContain('1');
  });
});

