// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// ══════════════════════════════════════════════════════
// IMPORT FAKER.JS
// ══════════════════════════════════════════════════════
import { faker } from "@faker-js/faker";

// ══════════════════════════════════════════════════════
// CUSTOM COMMAND: Generate Random User Data
// ══════════════════════════════════════════════════════
Cypress.Commands.add("generateRandomUser", () => {
  // Generate random user data yang unik setiap kali dipanggil
  const username = faker.internet.username().toLowerCase();
  const timestamp = Date.now();
  return {
    full_name: faker.person.fullName(),
    // Menggunakan timestamp untuk memastikan email unik
    email: `${username}${timestamp}@test.com`,
    password: faker.internet.password({
      length: 12,
      memorable: true,
      pattern: /[A-Za-z0-9!@#]/,
    }),
  };
});

// Custom command untuk generate data invalid
Cypress.Commands.add("generateInvalidUser", () => {
  return {
    full_name:
      faker.number.int({ min: 100, max: 999 }) +
      "!@#" +
      faker.string.alphanumeric(5), // Nama dengan angka dan simbol
    email: faker.word.words(2).replace(" ", "") + ".com", // Email tanpa @
    password: faker.string.alphanumeric(3), // Password pendek
  };
});

// ══════════════════════════════════════════════════════
// CUSTOM COMMAND: Login dengan Session
// ══════════════════════════════════════════════════════
Cypress.Commands.add("loginWithSession", (email, password) => {
  cy.session(
    [email, password],
    () => {
      cy.visit("https://demo.evershop.io/");
      cy.get("svg.lucide-circle-user").click();
      cy.wait(500);
      cy.get("#field-email").clear().type(email);
      cy.get("#field-password").clear().type(password);
      cy.contains("Sign In").click();
      cy.wait(2000);
      // Verify login success
      cy.url().should("eq", "https://demo.evershop.io/");
      cy.wait(1000);
    },
    {
      validate() {
        // Validate session masih aktif dengan mengecek apakah user masih login
        cy.visit("https://demo.evershop.io/account");
        cy.url().should("include", "/account");
        cy.contains("Logout").should("exist");
      },
    },
  );
});

//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
