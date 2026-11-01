Cypress.Commands.add('abrirInicio', () => {
  cy.visit('/')
  cy.get('#header').should('be.visible')
  cy.get('#slider').should('be.visible')
  cy.get('a[href="/login"]').should('be.visible')
})

Cypress.Commands.add('criarContaPelaApi', (usuario) => {
  cy.request({ method: 'POST', url: '/api/createAccount', form: true, body: usuario }).then((resposta) => {
    const corpo = typeof resposta.body === 'string' ? JSON.parse(resposta.body) : resposta.body
    expect(corpo.responseCode).to.eq(201)
    expect(corpo.message).to.eq('User created!')
  })
})

Cypress.Commands.add('limparConta', (usuario) => {
  cy.request({
    method: 'DELETE',
    url: '/api/deleteAccount',
    form: true,
    body: { email: usuario.email, password: usuario.password }
  }).then((resposta) => {
    const corpo = typeof resposta.body === 'string' ? JSON.parse(resposta.body) : resposta.body
    expect(corpo.responseCode).to.be.oneOf([200, 404])
  })
})

Cypress.Commands.add('cadastrarUsuario', (usuario) => {
  cy.contains('h2', 'New User Signup!').should('be.visible')
  cy.get('[data-qa="signup-name"]').type(usuario.name)
  cy.get('[data-qa="signup-email"]').type(usuario.email)
  cy.get('[data-qa="signup-button"]').click()
  cy.contains('b', 'Enter Account Information').should('be.visible')
  cy.get('#id_gender1').check()
  cy.get('[data-qa="name"]').should('have.value', usuario.name)
  cy.get('[data-qa="email"]').should('have.value', usuario.email)
  cy.get('[data-qa="password"]').type(usuario.password, { log: false })
  cy.get('[data-qa="days"]').select(usuario.birth_date)
  cy.get('[data-qa="months"]').select(usuario.birth_month)
  cy.get('[data-qa="years"]').select(usuario.birth_year)
  cy.get('#newsletter').check()
  cy.get('#optin').check()
  cy.get('[data-qa="first_name"]').type(usuario.firstname)
  cy.get('[data-qa="last_name"]').type(usuario.lastname)
  cy.get('[data-qa="company"]').type(usuario.company)
  cy.get('[data-qa="address"]').type(usuario.address1)
  cy.get('[data-qa="address2"]').type(usuario.address2)
  cy.get('[data-qa="country"]').select(usuario.country)
  cy.get('[data-qa="state"]').type(usuario.state)
  cy.get('[data-qa="city"]').type(usuario.city)
  cy.get('[data-qa="zipcode"]').type(usuario.zipcode)
  cy.get('[data-qa="mobile_number"]').type(usuario.mobile_number)
  cy.get('[data-qa="create-account"]').click()
  cy.get('[data-qa="account-created"]').should('be.visible').and('contain.text', 'Account Created!')
  cy.get('[data-qa="continue-button"]').click()
  cy.contains('#header a', `Logged in as ${usuario.name}`).should('be.visible')
})

Cypress.Commands.add('fazerLogin', (usuario) => {
  cy.contains('h2', 'Login to your account').should('be.visible')
  cy.get('[data-qa="login-email"]').type(usuario.email)
  cy.get('[data-qa="login-password"]').type(usuario.password, { log: false })
  cy.get('[data-qa="login-button"]').click()
  cy.contains('#header a', `Logged in as ${usuario.name}`).should('be.visible')
})

Cypress.Commands.add('excluirConta', () => {
  cy.get('a[href="/delete_account"]').click()
  cy.get('[data-qa="account-deleted"]').should('be.visible').and('contain.text', 'Account Deleted!')
  cy.get('[data-qa="continue-button"]').click()
  cy.get('a[href="/login"]').should('be.visible')
})

Cypress.Commands.add('finalizarPedido', (usuario) => {
  cy.get('.features_items .productinfo a[data-product-id="1"]').click()
  cy.contains('#cartModal', 'Added!').should('be.visible')
  cy.contains('button', 'Continue Shopping').click()
  cy.get('#header a[href="/view_cart"]').click()
  cy.location('pathname').should('eq', '/view_cart')
  cy.get('#product-1').should('be.visible').and('contain.text', 'Blue Top')
  cy.get('#product-1 .cart_price').should('contain.text', 'Rs. 500')
  cy.get('#product-1 .cart_quantity').should('contain.text', '1')
  cy.get('#product-1 .cart_total').should('contain.text', 'Rs. 500')
  cy.contains('a', 'Proceed To Checkout').click()
  cy.contains('h2', 'Address Details').should('be.visible')
  for (const endereco of ['#address_delivery', '#address_invoice']) {
    cy.get(endereco).should('contain.text', `${usuario.firstname} ${usuario.lastname}`)
      .and('contain.text', usuario.company)
      .and('contain.text', usuario.address1)
      .and('contain.text', usuario.address2)
      .and('contain.text', usuario.city)
      .and('contain.text', usuario.state)
      .and('contain.text', usuario.zipcode)
      .and('contain.text', usuario.country)
      .and('contain.text', usuario.mobile_number)
  }
  cy.contains('h2', 'Review Your Order').should('be.visible')
  cy.get('#product-1').should('contain.text', 'Blue Top')
  cy.get('#product-1 .cart_total').should('contain.text', 'Rs. 500')
  cy.get('textarea[name="message"]').type('Entregar no endereço informado no cadastro.')
  cy.contains('a', 'Place Order').click()
  cy.get('[data-qa="name-on-card"]').type(usuario.name)
  cy.get('[data-qa="card-number"]').type('4111111111111111')
  cy.get('[data-qa="cvc"]').type('123')
  cy.get('[data-qa="expiry-month"]').type('12')
  cy.get('[data-qa="expiry-year"]').type('2030')
  cy.get('[data-qa="pay-button"]').click()
  cy.get('[data-qa="order-placed"]').should('be.visible').and('contain.text', 'Order Placed!')
  cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
})
