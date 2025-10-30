describe('Editar artículo inexistente', () => {
  it('muestra error al intentar editar artículo inexistente', () => {
    cy.visit('http://localhost:5173/articles/edit/non-existent')
    cy.contains(/error|no encontrado|No encontrado/i)
  })
})
