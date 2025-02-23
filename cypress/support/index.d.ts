/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    saveLocalStorage(): void;
    restoreLocalStorage(): void;
  }
}
