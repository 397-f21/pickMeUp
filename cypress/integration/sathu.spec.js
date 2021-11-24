describe ('Sathvik\'s Test', () => {
    
    
    it ('launches', () => {
      cy.visit ('/');
    });
  
  
    it ('opens with sport selection', () => {
      cy.visit ('/');
      cy.get('[data-cy=sport-select]').should('contain', 'Choose your sports!');
    });
  
    it('shows filter modal when filter events button is selected', () => {
      cy.visit ('/');
      cy.get('[data-cy=sport-select-idS0]').click();
      cy.get('[data-cy=sport-header]').should('contain' ,'Tennis');
      cy.get('[data-cy=filter-events-button]').click();
    });

    it('Select BasketBall in the sports and save the filter', () => {
        cy.get('[data-cy=filter-input-sport]').select('Basketball');
        cy.get('[data-cy=filter-submit-button]').click();
    });

    it('event list now has only basketball related events', () =>{
        cy.get('[data-cy=sport-header]').should('contain' ,'Basketball');
    });


    
  
});
