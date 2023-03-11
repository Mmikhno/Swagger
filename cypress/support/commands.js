// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
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
Cypress.Commands.add("post", (body) => {
  cy.request({
    url: "https://petstore.swagger.io/v2/user",
    method: "POST",
    body: body,
  });
});
Cypress.Commands.add("put", (body, username) => {
  cy.request({
    url: `https://petstore.swagger.io/v2/user/${username}`,
    method: "PUT",
    body: body,
    failOnStatusCode: false,
  });
});
Cypress.Commands.add("gett", (username) => {
  cy.request({
    url: `https://petstore.swagger.io/v2/user/${username}`,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("deleteUser", (username) => {
  cy.request({
    url: `https://petstore.swagger.io/v2/user/${username}`,
    method: "DELETE",
    failOnStatusCode: false,
  });
});
