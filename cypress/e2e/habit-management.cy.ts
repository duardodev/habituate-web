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
      cy.get('button').contains('Add new habit').click();
      cy.get('input[placeholder="Meditate, exercise, read a book..."]').type('Correr 10KM');
      cy.get('button').contains('Confirm').click();
      cy.get('button').contains('Cancel').click();

      cy.contains('Habit successfully added!').should('be.visible');
      cy.wait(500);
      cy.contains('Correr 10KM').should('be.visible');
    });

    it('should display an error when trying to add a habit with an empty title', () => {
      cy.get('button').contains('Add new habit').click();
      cy.get('button').contains('Confirm').click();
      cy.get('button').contains('Cancel').click();

      cy.contains('Enter the new habit!').should('be.visible');
    });
  });

  describe('Toggling Habit Status', () => {
    it('should set the habit status to completed', () => {
      cy.contains('Correr 10KM').should('be.visible');

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
      cy.contains('Correr 10KM').should('be.visible');

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

  describe('Updating Habit Emoji', () => {
    it('should update the habit emoji and persist after reload', () => {
      cy.contains('Correr 10KM').should('be.visible');

      cy.get('button[aria-label="Open emoji picker"]').as('emojiButton');
      cy.get('@emojiButton').click();

      cy.get('.epr-main').as('emojiPicker');
      cy.get('@emojiPicker').should('be.visible');

      cy.get('[data-unified="1f600"] > .epr-emoji-img').as('selectedEmoji');
      cy.get('@selectedEmoji')
        .invoke('attr', 'src')
        .then(selectedEmojiUrl => {
          if (!selectedEmojiUrl) throw new Error('Emoji URL não encontrada');

          cy.get('[data-unified="1f600"]').click();
          cy.wait(500);

          cy.get('@emojiButton')
            .find('img')
            .should('have.attr', 'src')
            .and('include', encodeURIComponent(selectedEmojiUrl));

          cy.reload();
          cy.wait(1000);

          cy.get('@emojiButton')
            .find('img')
            .should('have.attr', 'src')
            .and('include', encodeURIComponent(selectedEmojiUrl));
        });
    });
  });

  describe('Managing Habit Actions', () => {
    it('should edit the habit title', () => {
      cy.contains('Correr 10KM').should('be.visible').click();
      cy.wait(500);

      cy.get('[role="menu"]').should('be.visible');
      cy.get('[role="menu"]').find('[role="menuitem"]').contains('Rename').should('be.visible').click();

      cy.get('input[type="text"]').should('be.visible').clear().type('Correr 15KM').type('{enter}');
      cy.wait(1500);
      cy.contains('Correr 15KM').should('be.visible');
    });

    it('should remove the habit', () => {
      cy.contains('Correr 15KM').should('be.visible').click();
      cy.wait(500);

      cy.get('[role="menu"]').should('be.visible');
      cy.get('[role="menu"]').find('[role="menuitem"]').contains('Remove').should('be.visible').click();
      cy.contains('Correr 15KM').should('not.exist');
    });
  });
});
