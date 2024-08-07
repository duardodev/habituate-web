import { setupClerkTestingToken } from '@clerk/testing/cypress';

describe('Testing Tokens', () => {
  it('sign in', () => {
    setupClerkTestingToken();
    cy.visit('/habits');

    cy.contains('h1', 'Sign in to Habituate');
    cy.get('.cl-signIn-root').should('exist');
    cy.get('input[name=identifier]').type(Cypress.env('test_user'));

    cy.get('.cl-formButtonPrimary').contains('button', 'Continue').click();
    cy.get('input[name=password]').type(Cypress.env('test_password'));

    cy.get('.cl-formButtonPrimary').contains('button', 'Continue').click();

    cy.visit('/habits');
    cy.url().should('include', 'habits');
  });

  it('sign up', () => {
    setupClerkTestingToken();

    cy.visit('/auth/sign-up');
    cy.contains('h1', 'Create your account');
    cy.get('.cl-signUp-root').should('exist');
    cy.get('input[name=username]').type('e2euser' + new Date().getTime());

    cy.get('input[name=password]').type(Cypress.env('test_password'));

    cy.get('.cl-formButtonPrimary').contains('button', 'Continue').click();

    cy.visit('/habits');
    cy.url().should('include', 'habits');
  });
});
