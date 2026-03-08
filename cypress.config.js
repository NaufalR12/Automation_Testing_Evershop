const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer"); //untuk allure report

module.exports = defineConfig({
  projectId: "aucawc",
  allowCypressEnv: true,
  chromeWebSecurity: false,

  e2e: {
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: false,
      html: true,
      json: true,
    },
    setupNodeEvents(on, config) {
      //config untuk allure report
      allureWriter(on, config);
      return config;
    },
  },
});
