import { validateArticlePayload } from './usecases'

describe('validateArticlePayload', () => {
  it('debe devolver errores para título corto', () => {
    const res = validateArticlePayload({ title: 'ab', content: 'contenido valido', categoryId: 'cat-1' })
    expect(res.title).toBeDefined()
  })

  it('debe devolver errores para contenido corto', () => {
    const res = validateArticlePayload({ title: 'Titulo válido', content: 'corto', categoryId: 'cat-1' })
    expect(res.content).toBeDefined()
  })

  it('debe devolver error cuando falte categoría', () => {
    const res = validateArticlePayload({ title: 'Titulo válido', content: 'Contenido suficientemente largo' })
    expect(res.categoryId).toBeDefined()
  })

  it('no debe devolver errores para payload válido', () => {
    const res = validateArticlePayload({ title: 'Titulo válido', content: 'Contenido suficientemente largo', categoryId: 'cat-1' })
    expect(Object.keys(res).length).toBe(0)
  })
})
