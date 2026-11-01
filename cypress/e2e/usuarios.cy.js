describe('Cadastro e autenticação', () => {
  let usuario

  beforeEach(() => {
    cy.fixture('usuario').then((dados) => {
      usuario = { ...dados, email: `aluno.${Date.now()}.${Cypress._.random(100000, 999999)}@example.com` }
    })
  })

  afterEach(() => {
    cy.limparConta(usuario)
  })

  it('CT01 - Cadastrar e excluir um usuário', () => {
    cy.abrirInicio()
    cy.get('a[href="/login"]').click()
    cy.cadastrarUsuario(usuario)
    cy.excluirConta()
  })

  it('CT02 - Fazer login com e-mail e senha corretos', () => {
    cy.criarContaPelaApi(usuario)
    cy.abrirInicio()
    cy.get('a[href="/login"]').click()
    cy.fazerLogin(usuario)
    cy.excluirConta()
  })

  it('CT03 - Recusar login com e-mail e senha incorretos', () => {
    cy.abrirInicio()
    cy.get('a[href="/login"]').click()
    cy.contains('h2', 'Login to your account').should('be.visible')
    cy.get('[data-qa="login-email"]').type(usuario.email)
    cy.get('[data-qa="login-password"]').type('SenhaIncorreta123')
    cy.get('[data-qa="login-button"]').click()
    cy.contains('.login-form p', 'Your email or password is incorrect!').should('be.visible')
  })

  it('CT04 - Fazer logout', () => {
    cy.criarContaPelaApi(usuario)
    cy.abrirInicio()
    cy.get('a[href="/login"]').click()
    cy.fazerLogin(usuario)
    cy.get('a[href="/logout"]').click()
    cy.location('pathname').should('eq', '/login')
    cy.contains('h2', 'Login to your account').should('be.visible')
    cy.get('a[href="/logout"]').should('not.exist')
  })

  it('CT05 - Recusar cadastro com e-mail já existente', () => {
    cy.criarContaPelaApi(usuario)
    cy.abrirInicio()
    cy.get('a[href="/login"]').click()
    cy.contains('h2', 'New User Signup!').should('be.visible')
    cy.get('[data-qa="signup-name"]').type(usuario.name)
    cy.get('[data-qa="signup-email"]').type(usuario.email)
    cy.get('[data-qa="signup-button"]').click()
    cy.contains('.signup-form p', 'Email Address already exist!').should('be.visible')
  })
})
