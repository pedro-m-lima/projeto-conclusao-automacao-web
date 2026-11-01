describe('Produtos e inscrição', () => {
  beforeEach(() => {
    cy.abrirInicio()
  })

  it('CT08 - Consultar a lista e os detalhes do primeiro produto', () => {
    cy.get('a[href="/products"]').click()
    cy.location('pathname').should('eq', '/products')
    cy.contains('h2', 'All Products').should('be.visible')
    cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0)
    cy.get('.features_items').should('be.visible')
    cy.get('.features_items a[href^="/product_details/"]').first().click()
    cy.location('pathname').should('eq', '/product_details/1')
    cy.get('.product-information').should('be.visible').within(() => {
      cy.get('h2').should('have.text', 'Blue Top')
      cy.contains('Category: Women > Tops').should('be.visible')
      cy.contains('Rs. 500').should('be.visible')
      cy.contains('p', 'Availability: In Stock').should('be.visible')
      cy.contains('p', 'Condition: New').should('be.visible')
      cy.contains('p', 'Brand: Polo').should('be.visible')
    })
  })

  it('CT09 - Pesquisar produtos pelo nome', () => {
    cy.get('a[href="/products"]').click()
    cy.location('pathname').should('eq', '/products')
    cy.contains('h2', 'All Products').should('be.visible')
    cy.get('#search_product').type('jeans')
    cy.get('#submit_search').click()
    cy.contains('h2', 'Searched Products').should('be.visible')
    cy.contains('.productinfo p', 'Soft Stretch Jeans').should('be.visible')
    cy.contains('.productinfo p', 'Regular Fit Straight Jeans').should('be.visible')
    cy.contains('.productinfo p', 'Grunt Blue Slim Fit Jeans').should('be.visible')
    cy.get('.features_items .productinfo p').should('have.length', 3).each(($nome) => {
      cy.wrap($nome).should('be.visible').invoke('text').should('match', /jeans/i)
    })
  })

  it('CT10 - Realizar inscrição pela página inicial', () => {
    cy.get('#footer').scrollIntoView()
    cy.contains('h2', 'Subscription').should('be.visible')
    cy.get('#susbscribe_email').type(`inscricao.${Date.now()}@example.com`)
    cy.get('#subscribe').click()
    cy.contains('You have been successfully subscribed!').should('be.visible')
  })
})
