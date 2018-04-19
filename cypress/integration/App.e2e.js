describe('App E2E', () => {
  before(() => {
    cy.visit('/');
  });

  it('should shave a header', () => {
    cy.get('h1')
      .should('have.text', 'My Counter');
  });

  it('should increment and decrement the counter', () => {
    cy.get('p')
      .should('have.text', '0');

    cy.contains('Increment').click();
    cy.get('p')
      .should('have.text', '1');

    cy.contains('Increment').click();
    cy.get('p')
      .should('have.text', '2');

    cy.contains('Decrement').click();
    cy.get('p')
      .should('have.text', '1');
  });
});