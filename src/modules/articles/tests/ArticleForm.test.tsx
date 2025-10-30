import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ArticleForm from '../pages/ArticleForm'
import * as useArticles from '../hooks/useArticles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'

jest.mock('../infra/localStorageApi', () => ({ api: { listCategories: async () => [{ id: 'cat-1', name: 'Test' }] } }))

const createTestQueryClient = () => new QueryClient({ defaultOptions: { queries: { retry: false } } })
const renderWithClient = (ui: React.ReactElement) => render(
  <MemoryRouter>
    <QueryClientProvider client={createTestQueryClient()}>{ui}</QueryClientProvider>
  </MemoryRouter>
)

describe('ArticleForm', () => {
  it('muestra errores de validación y no envía cuando hay errores', async () => {
    renderWithClient(<ArticleForm />)

    const titleInput = screen.getByLabelText(/Título/i)
    const contentInput = screen.getByLabelText(/Contenido/i)
    const submit = screen.getByRole('button', { name: /Guardar/i })

    fireEvent.change(titleInput, { target: { value: 'ab' } })
    fireEvent.change(contentInput, { target: { value: 'corto' } })
    fireEvent.click(submit)

    await waitFor(() => {
      expect(screen.getByText(/El título debe tener al menos 3 caracteres/i)).toBeInTheDocument()
      expect(screen.getByText(/El contenido debe tener al menos 10 caracteres/i)).toBeInTheDocument()
    })
  })

  it('llama al create.mutateAsync cuando payload válido', async () => {
    const createMock = { mutateAsync: jest.fn().mockResolvedValue({ id: 'a-1' }) }
    jest.spyOn(useArticles, 'useCreateArticle').mockReturnValue(createMock as unknown as ReturnType<typeof useArticles.useCreateArticle>)

    renderWithClient(<ArticleForm />)

    fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Título válido' } })
    fireEvent.change(screen.getByLabelText(/Contenido/i), { target: { value: 'Contenido suficientemente largo' } })

    // Wait for the category option to be loaded, then select it
    await waitFor(() => expect(screen.getByText('Test')).toBeInTheDocument())
    fireEvent.change(screen.getByLabelText(/Categoría/i), { target: { value: 'cat-1' } })

    fireEvent.click(screen.getByRole('button', { name: /Guardar/i }))

    await waitFor(() => expect(createMock.mutateAsync).toHaveBeenCalled())
  })
})
