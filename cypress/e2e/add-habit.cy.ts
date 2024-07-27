describe('Add habit', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clerkSignIn({
      strategy: 'password',
      identifier: Cypress.env('test_user'),
      password: Cypress.env('test_password'),
    });
    cy.visit('/habits');
  });

  it('add habit successfully', () => {
    cy.get('button').contains('Novo hábito').click();
    cy.get('input[placeholder="Nome do hábito"]').type('Correr 1KM');
    cy.get('button').contains('Adicionar').click();
    cy.get('button').contains('Cancelar').click();

    cy.contains('Hábito adicionado com sucesso!').should('be.visible');
    cy.contains('Correr 3KM').should('be.visible');
  });

  it('do not add habit if input title is empty', () => {
    cy.get('button').contains('Novo hábito').click();
    cy.get('button').contains('Adicionar').click();
    cy.get('button').contains('Cancelar').click();

    cy.contains('Informe o nome do hábito!').should('be.visible');
  });
});
