const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1366,
  viewportHeight: 900,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 90000,
  video: true,
  screenshotOnRunFailure: true,
  retries: 0,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportPageTitle: 'Projeto Conclusão Automação Web',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },
  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
      return config
    }
  }
})
