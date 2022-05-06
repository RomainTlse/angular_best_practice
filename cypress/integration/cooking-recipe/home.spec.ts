describe('Home cookingrecipe Test', () => {
  it('Access Page', () => {
    cy.visit('/cookingrecipe');
    cy.contains('home works!');
    cy.contains('Bonjour tout le monde !');
  });
});
