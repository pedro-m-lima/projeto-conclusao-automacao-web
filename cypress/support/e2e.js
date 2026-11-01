require('cypress-mochawesome-reporter/register')
require('./commands')

beforeEach(() => {
  cy.intercept({ hostname: /(^|\.)(doubleclick\.net|googlesyndication\.com|googleadservices\.com|adtrafficquality\.google)$/ }, { statusCode: 204 })
})
