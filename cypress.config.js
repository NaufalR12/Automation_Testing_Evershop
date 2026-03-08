const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer"); //untuk allure report

module.exports = defineConfig({
  projectId: "aucawc",
  allowCypressEnv: true,
  chromeWebSecurity: false,

  e2e: {
    setupNodeEvents(on, config) {
      //config untuk allure report
      allureWriter(on, config);
      return config;
    },
  },
});
