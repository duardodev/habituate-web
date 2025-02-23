import { setupClerkTestingToken } from '@clerk/testing/cypress';

describe('Task Management', () => {
  beforeEach(() => {
    setupClerkTestingToken();

    cy.restoreLocalStorage();
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

  afterEach(() => {
    cy.saveLocalStorage();
  });

  describe('Adding New Habit', () => {
    it('should successfully create a new task with priority', () => {
      cy.get('button').contains('Add new task').click();
      cy.get('input[placeholder="Pay electricity bill, buy groceries..."]').type('Pick up dry cleaning');
      cy.get('#select-28').click();
      cy.get('div[role="option"]').contains('Low').click();

      cy.get('button').contains('Confirm').click();
      cy.get('button').contains('Cancel').click();

      cy.contains('Task added successfully!').should('be.visible');
      cy.contains('Pick up dry cleaning').should('be.visible');
      cy.contains('Low').should('be.visible');
      cy.get('span[data-testid="amount-tasks"]').should('contain', '0/1 done');
    });

    it('should display an error when trying to add a task with an empty title', () => {
      cy.get('button').contains('Add new task').click();
      cy.get('button').contains('Confirm').click();
      cy.get('button').contains('Cancel').click();
      cy.contains('Enter the new task!').should('be.visible');
    });
  });

  describe('Toggling Task Status', () => {
    it('should set the task status to completed', () => {
      cy.contains('Pick up dry cleaning').should('be.visible');

      cy.get('button[aria-label=\'Task "Pick up dry cleaning" marked as incomplete\']').as('toggleButton');
      cy.get('@toggleButton').should('be.visible');
      cy.get('@toggleButton').click();
      cy.wait(500);

      cy.get('button[aria-label=\'Task "Pick up dry cleaning" marked as complete\']').should('be.visible');
      cy.get('span[data-testid="amount-tasks"]').should('contain', '1/1 done');

      cy.get('[data-testid="tasks-metric"]').within(() => {
        cy.get('[data-testid="metric-value"]').should('contain', '1');
        cy.get('[data-testid="metric-percentage"]').should('contain', '100%');
      });
    });

    it('should set the status to not completed', () => {
      cy.contains('Pick up dry cleaning').should('be.visible');

      cy.get('button[aria-label=\'Task "Pick up dry cleaning" marked as complete\']').as('toggleButton');
      cy.get('@toggleButton').should('be.visible');
      cy.get('@toggleButton').click();
      cy.wait(500);

      cy.get('button[aria-label=\'Task "Pick up dry cleaning" marked as incomplete\']').should('be.visible');
      cy.get('span[data-testid="amount-tasks"]').should('contain', '0/1 done');

      cy.get('[data-testid="tasks-metric"]').within(() => {
        cy.get('[data-testid="metric-value"]').should('contain', '0');
        cy.get('[data-testid="metric-percentage"]').should('contain', '0%');
      });
    });
  });

  describe('Managing Task Actions', () => {
    beforeEach(() => {
      cy.get('button').contains('Add new task').click();
      cy.get('input[placeholder="Pay electricity bill, buy groceries..."]').type('Pay electricity bill');

      cy.get('button').contains('Confirm').click();
      cy.get('button').contains('Cancel').click();

      cy.contains('Task added successfully!').should('be.visible');
      cy.contains('Pay electricity bill').should('be.visible');
    });

    it('should remove all tasks', () => {
      cy.get('span[data-testid="amount-tasks"]').should('contain', '0/2 done');

      cy.get('button[aria-label="Remove all tasks"]').should('be.visible').as('removeAllTasksButton');
      cy.get('@removeAllTasksButton').click();

      cy.get('span[data-testid="amount-tasks"]').should('contain', '0/0 done');
    });

    it('should remove a single task', () => {
      cy.get('button[aria-label="Open the task actions menu"]').should('be.visible').as('menuTrigger');
      cy.get('@menuTrigger').click();

      cy.get('[role="menu"]').should('be.visible');
      cy.get('[role="menu"]').find('[role="menuitem"]').contains('Remove').should('be.visible').as('removeOption');
      cy.get('@removeOption').click();

      cy.get('Pay electricity bill').should('not.exist');
    });

    it('should edit the task title', () => {
      cy.contains('Pay electricity bill').should('be.visible');

      cy.get('button[aria-label="Open the task actions menu"]').should('be.visible').as('menuTrigger');
      cy.get('@menuTrigger').click();

      cy.get('[role="menu"]').should('be.visible');
      cy.get('[role="menu"]').find('[role="menuitem"]').contains('Rename').should('be.visible').as('renameOption');
      cy.get('@renameOption').click();

      cy.get('input[type="text"]').should('be.visible').clear().type('Buy groceries').type('{enter}');
      cy.contains('Buy groceries').should('be.visible');
    });
  });
});
