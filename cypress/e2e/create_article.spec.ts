describe('Crear artículo E2E', () => {
  it('crea un artículo y lo muestra en el listado', () => {
    cy.visit('http://localhost:5173/articles')
    // Suponiendo que la app tiene botón para abrir el formulario de creación
    cy.contains(/crear/i).click()
    cy.get('input[placeholder]').first().type('Artículo E2E')
    cy.get('textarea').type('Contenido de prueba para E2E testing...')
    cy.get('select').select('cat-1')
    cy.contains(/guardar/i).click()
    cy.contains('Artículo E2E')
  })
})
