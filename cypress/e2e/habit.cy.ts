describe('Habit Management', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clerkSignIn({
      strategy: 'password',
      identifier: Cypress.env('test_user'),
      password: Cypress.env('test_password'),
    });
    cy.visit('/management');
  });

  it('display the habit title', () => {
    cy.contains('Correr 1KM').should('be.visible');
  });

  it('edit the habit title', () => {
    cy.contains('Correr 1KM').click();

    cy.get('[role="menu"]').should('be.visible');
    cy.get('[role="menu"]').find('[role="menuitem"]').contains('Renomear').should('be.visible').click();

    cy.get('input[type="text"]').should('be.visible').clear().type('Correr 5KM').type('{enter}');
    cy.wait(500);
    cy.contains('Correr 5KM').should('be.visible');
  });

  it('toggle the habit', () => {
    cy.contains('Correr 5KM').should('be.visible');
    cy.get('button[role="checkbox"]').first().as('firstCheckbox');

    cy.get('@firstCheckbox').should('be.visible').and('not.be.disabled');
    cy.get('@firstCheckbox').should('have.attr', 'aria-checked', 'false');

    cy.get('@firstCheckbox').click();
    cy.wait(500);
    cy.get('@firstCheckbox').should('have.attr', 'aria-checked', 'true');

    cy.get('@firstCheckbox').click();
    cy.wait(500);
    cy.get('@firstCheckbox').should('have.attr', 'aria-checked', 'false');
  });

  it('remove the habit', () => {
    cy.contains('Correr 5KM').click();
    cy.get('[role="menu"]').should('be.visible');
    cy.get('[role="menu"]').find('[role="menuitem"]').contains('Remover').should('be.visible').click();
    cy.contains('Correr 5KM').should('not.exist');
  });
});
