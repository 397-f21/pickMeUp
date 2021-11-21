describe('Spencer\'s Tests', () => {
  it ('adds event to personal events when user joins', () => {

    cy.visit('/PersonalEvents');
    cy.login()
    // Wait for data to load in
    cy.contains(/loading/i, { timeout: 10000 })
      .should('not.exist');

    // Check that no basketball events already joined
    cy.contains(/basketball/i)
      .should('not.exist');
    
    // Open basketball events
    cy.visit('/');
    cy.get('[data-cy=sport-select-idS1]')
      .should('be.visible')
      .click();
    cy.contains(/basketball/i)
      .should('be.visible');

    // Select join button on any basketball event
    cy.contains(/join/i)
      .should('exist')
      .click();

    // Go back to personal events page and check for joined event
    cy.visit('/PersonalEvents');
    cy.contains(/basketball/i)
      .should('exist');

    // Clean up joined events
    cy.contains(/leave/i).each(() => 
      cy.contains(/leave/i).click()
    );
  });

})