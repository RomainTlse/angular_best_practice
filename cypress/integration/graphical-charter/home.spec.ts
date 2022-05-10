describe('Home graphicalcharter Test', () => {
  it('Access Page', () => {
    cy.visit('/graphicalcharter');
    cy.contains('home works!');
  });
});
