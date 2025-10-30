import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css' // Eliminado Tailwind, solo Bootstrap
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './core/queryClient'
import { Provider } from 'react-redux'
import { store } from './core/store'
import { seedInitialData } from './modules/articles/infra/localStorageApi'
import { seedCategories } from './modules/categories/infra/localStorageApi'
import 'bootstrap/dist/css/bootstrap.min.css';

seedInitialData()
seedCategories()
console.log('Seeded data and starting app')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
