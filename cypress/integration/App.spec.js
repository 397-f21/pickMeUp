describe ('Test App', () => {

  it ('launches', () => {
    cy.visit ('/');
  });


  it ('opens with sport selection', () => {
    cy.visit ('/');
    cy.get('[data-cy=sport-select]').should('contain', 'Choose your sports!');
  });

  it('shows tennis when tennis is selected', () => {
    cy.visit ('/');
    cy.get('[data-cy=sport-select-idS0]').click();
    cy.get('[data-cy=sport-header]').should('contain' ,'Tennis');
  });

  it('google login', () => {
    cy.visit ('/');
    cy.login();
  });
});