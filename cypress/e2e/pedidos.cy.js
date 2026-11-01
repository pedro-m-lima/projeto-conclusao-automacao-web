describe('Finalização de pedidos', () => {
  let usuario

  beforeEach(() => {
    cy.fixture('usuario').then((dados) => {
      usuario = { ...dados, email: `pedido.${Date.now()}.${Cypress._.random(100000, 999999)}@example.com` }
    })
  })

  afterEach(() => {
    cy.limparConta(usuario)
  })

  it('CT15 - Cadastrar um usuário antes de finalizar o pedido', () => {
    cy.abrirInicio()
    cy.get('a[href="/login"]').click()
    cy.cadastrarUsuario(usuario)
    cy.finalizarPedido(usuario)
    cy.excluirConta()
  })

  it('CT16 - Fazer login antes de finalizar o pedido', () => {
    cy.criarContaPelaApi(usuario)
    cy.abrirInicio()
    cy.get('a[href="/login"]').click()
    cy.fazerLogin(usuario)
    cy.finalizarPedido(usuario)
    cy.excluirConta()
  })
})
