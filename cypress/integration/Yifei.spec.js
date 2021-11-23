describe ('Test App', () => {

    it ('launches', () => {
      cy.visit ('/');
    });
    it('my events', () => {
        cy.visit ('/');
        cy.login();
        cy.visit('/PersonalEvents');
        cy.get('[data-cy=personal-name]').should('contain' ,"S. Assign's Events");
        cy.visit('/PersonalEvents');
        cy.get('[data-cy=empty-header]').should('contain' ,"You have no events. Go join some!");
      });
      
    it('should have specific class names for elements', () => {
        cy.visit('/Layout');    
        cy.get('.navbar-brand')      
            .should('contain', 'PickMeUp')       
        cy.get('.navbar-collapse')      
            .should('contain', "My Events")      
        cy.get('.navbar-collapse')      
            .should('contain', "Home") 
    })
    
    it('can navigate around the website', () => {
        cy.visit ('/Layout');

        cy.get('.navbar-brand').click();
        cy.contains('Choose your sports!')
        cy.get('.navbar-collapse').click('topLeft');
        cy.contains('Choose your sports!')
        cy.get('a[href*="/PersonalEvents"]').click();
        cy.contains("S. Assign's Events")
        
      
    });
})