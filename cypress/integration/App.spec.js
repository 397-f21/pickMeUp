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

  it('create an basketball event using form', () => {
    cy.visit('/')
    cy.login();
    cy.get('[data-cy=sport-select-idS1]').click();
    cy.get('[data-test-id="create_event"]').click();
    cy.get('[data-cy=select-court]').select('SPAC');
    cy.get('[data-cy=select-date]').type('2021-12-24');
    cy.get('[data-cy=select-time]').select('15:00');
    cy.get('[data-cy=select-capacity]').clear().type('6');
    cy.get('[data-test-id="create-eventFinal"]').click();
  })
});