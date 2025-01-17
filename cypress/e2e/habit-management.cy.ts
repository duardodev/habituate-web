import { setupClerkTestingToken } from '@clerk/testing/cypress';

describe('Habit Management', () => {
  beforeEach(() => {
    setupClerkTestingToken();
    cy.visit('/');

    cy.clerkSignIn({
      strategy: 'password',
      identifier: Cypress.env('test_user'),
      password: Cypress.env('test_password'),
    });

    cy.visit('/management');

    cy.intercept('http://localhost:3333/habits', req => {
      req.headers['cache-control'] = 'no-store, no-cache, must-revalidate, proxy-revalidate';
      req.on('response', res => {
        res.headers['cache-control'] = 'no-store, no-cache, must-revalidate, proxy-revalidate';
        res.headers['pragma'] = 'no-cache';
        res.headers['expires'] = '0';
      });
    }).as('getHabits');

    cy.wait('@getHabits');
  });

  describe('Creating New Habit', () => {
    it('should successfully create a new habit', () => {
      cy.get('button').contains('Adicionar hábito').click();
      cy.get('input[placeholder="Meditar, exercitar-se, estudar inglês..."]').type('Correr 1KM');
      cy.get('button').contains('Confirmar').click();
      cy.get('button').contains('Cancelar').click();

      cy.contains('Hábito adicionado com sucesso!').should('be.visible');
      cy.contains('Correr 1KM').should('be.visible');
    });

    it('should display an error when trying to add a habit with an empty title', () => {
      cy.get('button').contains('Adicionar hábito').click();
      cy.get('button').contains('Confirmar').click();
      cy.get('button').contains('Cancelar').click();

      cy.contains('Informe o novo hábito!').should('be.visible');
    });
  });

  describe('Toggling Habit Status', () => {
    it('should set the habit status to completed', () => {
      cy.contains('Correr 1KM').should('be.visible');

      cy.get('button[role="checkbox"]').filter(':enabled').last().as('checkbox');
      cy.get('@checkbox').should('be.visible');
      cy.get('@checkbox').should('have.attr', 'aria-checked', 'false');

      cy.get('@checkbox').click();
      cy.wait(500);
      cy.get('@checkbox').should('have.attr', 'aria-checked', 'true');

      cy.get('[data-testid="habits-metric"]').within(() => {
        cy.get('[data-testid="metric-value"]').should('contain', '1');
        cy.get('[data-testid="metric-percentage"]').should('contain', '100%');
      });
    });

    it('should set the habit status to not completed', () => {
      cy.contains('Correr 1KM').should('be.visible');

      cy.get('button[role="checkbox"]').filter(':enabled').last().as('checkbox');
      cy.get('@checkbox').should('be.visible');

      cy.get('@checkbox').click();
      cy.wait(500);
      cy.get('@checkbox').should('have.attr', 'aria-checked', 'false');

      cy.get('[data-testid="habits-metric"]').within(() => {
        cy.get('[data-testid="metric-value"]').should('contain', '0');
        cy.get('[data-testid="metric-percentage"]').should('contain', '0%');
      });
    });
  });

  describe('Managing Habit Actions', () => {
    it('should edit the habit title', () => {
      cy.contains('Correr 1KM').should('be.visible').click();
      cy.wait(500);

      cy.get('[role="menu"]').should('be.visible');
      cy.get('[role="menu"]').find('[role="menuitem"]').contains('Renomear').should('be.visible').click();

      cy.get('input[type="text"]').should('be.visible').clear().type('Correr 5KM').type('{enter}');
      cy.wait(500);
      cy.contains('Correr 5KM').should('be.visible');
    });

    it('should remove the habit', () => {
      cy.contains('Correr 5KM').should('be.visible').click();
      cy.wait(500);

      cy.get('[role="menu"]').should('be.visible');
      cy.get('[role="menu"]').find('[role="menuitem"]').contains('Remover').should('be.visible').click();
      cy.contains('Correr 5KM').should('not.exist');
    });
  });
});
