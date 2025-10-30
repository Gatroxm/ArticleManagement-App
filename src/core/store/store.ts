import { configureStore } from '@reduxjs/toolkit';
// Importa tus reducers aquí

export const store = configureStore({
  reducer: {
    // articles: articlesReducer,
    // categories: categoriesReducer,
    // ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
