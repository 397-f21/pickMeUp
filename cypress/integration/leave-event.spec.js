describe ('Caspar\'s tests', () => {

    it ('removes an event from the personal event list when user leaves the event', () => {
      cy.visit ('/');
      // go to Tennis and join one of the events
      cy.get('[data-cy=sport-select-idS0]').click();
      let unclicked = true;
      cy.contains('Join').each( ($el, index, $list) => {
          if (unclicked) {
            cy.wrap($el).click();
            unclicked = false;
          }
      });
      // go to the personal events page and look at the events
      cy.get('[data-cy=navbar-personal]').click();
      cy.contains('Tennis').should('exist');
      cy.get('[data-cy=navbar-personal]').click();
      cy.contains('Leave').each( ($el, index, $list) => {
        cy.wrap($el).click();
      });
      cy.contains('Tennis').should('not.exist');
    });
});