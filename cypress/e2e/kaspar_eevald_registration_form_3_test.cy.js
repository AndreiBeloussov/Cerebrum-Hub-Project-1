beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})
//Workshop #8 add visual tests for registration form 3
/*
Task list:
* Create first test suite for visual tests
* Create tests to verify visual parts of the page:
    * radio button and its content
    * dropdown and dependencies between 2 dropdowns
    * checkbox, its content and link in it
    * email format
 */

describe('Section 1: visual tests', ()=> {
    it('This is my first test', () => {
        // Check radio button and it's content
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'Daily').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'Weekly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'Monthly').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'Never').and('not.be.checked')

})

    it('This is my second test about dropdown', () => {
        // Check dropdowns

        cy.get('#country').find('option').should('have.length', 4)
        cy.get('#country').find('option').eq(0).should('not.have.text')
        cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
        cy.get('#country').find('option').eq(2).should('have.text', 'Estonia')
        cy.get('#country').find('option').eq(3).should('have.text', 'Austria')

})

    it('This is my second point two test to check dependencies', () => {
        // Check dependencies between 2 dropdowns
      
        cy.get('#country').select('Spain').invoke('val')
        cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
        cy.get('#city').find('option').eq(2).should('have.text', 'Madrid')
        cy.get('#city').find('option').eq(3).should('have.text', 'Valencia')
        cy.get('#city').find('option').eq(4).should('have.text', 'Corralejo')

        cy.get('#country').select('Estonia').invoke('val')
        cy.get('#city').find('option').eq(1).should('have.text', 'Tallinn')
        cy.get('#city').find('option').eq(2).should('have.text', 'Haapsalu')
        cy.get('#city').find('option').eq(3).should('have.text', 'Tartu')

        cy.get('#country').select('Austria').invoke('val')
        cy.get('#city').find('option').eq(1).should('have.text', 'Vienna')
        cy.get('#city').find('option').eq(2).should('have.text', 'Salzburg')
        cy.get('#city').find('option').eq(3).should('have.text', 'Innsbruck')

    });

    it('Verify checkbox and its content', () => {
        // Check the checkboxes and related content

        cy.get(':nth-child(15) > .ng-pristine').should('not.be.selected')
        cy.get(':nth-child(15)').contains('Accept our privacy policy ',)
        cy.get(':nth-child(15) > :nth-child(2)').should('not.be.selected')
        cy.get(':nth-child(15)').contains('Accept our cookie policy',).should('have.attr', 'href', 'cookiePolicy.html')
        
    });

    it('Verify email format', () => {
        // Check and verify the email correct format

        cy.get('.email').type('kaspar@ifb.ee')
        cy.get('.email').should('contain.value', '@')
        cy.get('.email').should('contain.value', '.')

        // Check if the email can be entered without the "@"
        cy.get('.email').clear()
        cy.get('.email').type('kasparatifb.ee')
        cy.get('[ng-show="myForm.email.$error.email"]').should('be.visible')

        /* Check if the email can be entered without the "." / dot in the address
        
        cy.get('.email').clear()
        cy.get('.email').type('kaspar@ifbee')
        cy.get('[ng-show="myForm.email.$error.email"]').should('be.visible')
        
        QA comment: The email input accepts the address without .ee, so it shall be improved for both cases, i.e missing @ or .ee.

        */
    });

});

//Workshop #9 add functional tests for registration form 3
/*
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + validation
    * only mandatory fields are filled in + validations
    * mandatory fields are absent + validations (use function)
    * If city is already chosen and country is updated, then city choice should be removed
    * Bonus task: add file (google yourself for solution)
* Rename file registration_form_3_test.cy.js to contain your name - JohnSmith_form_3_test.cy.js and upload your individual result to  team confluence
 */

describe('Section 2: functional tests', ()=> {

it('All fields are filled in and validated', () => {

    cy.get('#name').clear();
    cy.get('#name').type('Kasutajanimi')
    cy.get('.email').type('Kaspar@test.ee')

    cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
    cy.get('#country').select('Spain').invoke('val')
    cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
    cy.get('#city').select('Malaga').invoke('val')

    cy.get(':nth-child(8) > input').clear().type('2022-11-05')
    cy.get(':nth-child(9) > :nth-child(4)')
    cy.get('[type="radio"]').check('Monthly').invoke('val')

    cy.get('#birthday').clear().type('1989-04-08')

    cy.get(':nth-child(1) > .w3-teal > h1')
    cy.get('input[type=file]').selectFile('Upload.txt')

    // QA comment: While hitting the submit button and navigating back, some of the previously filled fields are empty.
    // The code to click the upload submit button: cy.get('.w3-container > [type="submit"]').click()
    // The code to navigate back from the page after being submitted: cy.go('back')

    cy.get('.ng-pristine').check().invoke('val')
    cy.get(':nth-child(15) > :nth-child(2)').check().invoke('val')
    cy.get(':nth-child(2) > input').click()
    cy.get('h1').should('have.text', 'Submission received')
})

it('Only mandatory fields are filled', () => {
    
    cy.get('.email').type('Kaspar@test.ee')
    cy.get('#birthday').clear().type('1989-04-08')

    cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
    cy.get('#country').select('Spain').invoke('val')
    cy.get('#city').find('option').eq(1).should('have.text', 'Malaga')
    cy.get('#city').select('Malaga').invoke('val')

    cy.get(':nth-child(15) > .ng-pristine').check().invoke('val')
    cy.get(':nth-child(2) > input').click()
    cy.get('h1').should('have.text', 'Submission received')
    
});

it('Mandatory fields are absent using functions', () => {
    
    fillInAllMandatoryFields()

});

    function fillInAllMandatoryFields() {

    cy.get('#name').clear();
    cy.get('#name').type('Kasutajanimi')
    
    cy.get(':nth-child(8) > input').clear().type('2022-11-05')
    cy.get(':nth-child(9) > :nth-child(4)')
    cy.get('[type="radio"]').check('Monthly').invoke('val')
    
    cy.get(':nth-child(15) > :nth-child(2)').check().invoke('val')
    cy.get(':nth-child(2) > input').should('be.disabled')

}

it('If city is already chosen and country is updated, then city choice should be removed', () => {
    
    cy.get('#country').select('Estonia').invoke('val')
    cy.get('#city').select('Haapsalu').invoke('val')
    cy.get('#country').select('Spain').invoke('val')
    cy.get('#city').should('not.have.text', 'Haapsalu')

});

});

