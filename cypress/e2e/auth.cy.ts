import { setupClerkTestingToken } from '@clerk/testing/cypress';

describe('Authentication', () => {
  it('sign in', () => {
    setupClerkTestingToken();
    cy.visit('/management');

    cy.contains('h1', 'Sign in to Habituate');
    cy.get('.cl-signIn-root').should('exist');
    cy.get('input[name=identifier]').type(Cypress.env('test_user'));

    cy.get('.cl-formButtonPrimary').contains('button', 'Continue').click();
    cy.get('input[name=password]').type(Cypress.env('test_password'));

    cy.get('.cl-formButtonPrimary').contains('button', 'Continue').click();

    cy.visit('/management');
    cy.url().should('include', 'management');
  });

  it('sign up', () => {
    setupClerkTestingToken();

    cy.visit('/auth/sign-up');
    cy.contains('h1', 'Create your account');
    cy.get('.cl-signUp-root').should('exist');
    cy.get('input[name=username]').type('e2euser' + new Date().getTime());

    cy.get('input[name=password]').type(Cypress.env('test_password'));

    cy.get('.cl-formButtonPrimary').contains('button', 'Continue').click();

    cy.visit('/management');
    cy.url().should('include', 'management');
  });
});
