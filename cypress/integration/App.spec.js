describe ('Test App', () => {

it ('launches', () => {
    cy.visit ('/');
  });
});

it ('opens with sport selection', () => {
  cy.visit ('/');
  cy.get('[data-cy=sport-select]').should('contain', 'Choose your sports!');
});