beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

// Workshop #6 create following tests:

describe('Section 1: Functional tests', () => {
    it('User can submit form with valid data and only mandatory fields added', ()=>{
        // Add test steps for filling in ONLY mandatory fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system show successful message
        cy.get('#username').type('AndreiTest')
        cy.get('#email').type('myemail@emal.com')
        cy.get('#applicationForm > input:nth-child(10)').type('Andrei')
        cy.get('#lastName').type('Beloussov')
        cy.get('#applicationForm > input:nth-child(17)').type('123456')
        cy.get('#applicationForm > h2:nth-child(43)').click()
        cy.get('button[class="submit_button"]').should('be.enabled')
        cy.get('button[class="submit_button"]').click()
        cy.get('#success_message').should('be.visible')
    })

    it('User can submit form with all fields added', ()=>{
        // Add test steps for filling in ALL fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system show successful message
        cy.get('#username').type('AndreiTest')
        cy.get('#email').type('myemail@emal.com')
        cy.get('#applicationForm > input:nth-child(10)').type('Andrei')
        cy.get('#lastName').type('Beloussov')
        cy.get('#applicationForm > input:nth-child(17)').type('123456')
        cy.get('#cssFavLanguage').click()
        cy.get('#cars').select('Saab')
        cy.get('#password').type('1234')
        cy.get('#confirm').type('1234')
        cy.get('#applicationForm > h2:nth-child(43)').click()
        cy.get('button[class="submit_button"]').should('be.enabled')
        cy.get('button[class="submit_button"]').click()
        cy.get('#success_message').should('be.visible')


    })

    it('User can use only same both first and validation passwords', ()=>{
        // Add test steps for filling in only mandatory fields
        // Type confirmation password which is different from first password
        // Assert that submit button is not enabled
        // Assert that successful message is not visible
        // Assert that error message is visible
        cy.get('#username').type('AndreiTest')
        cy.get('#email').type('myemail@emal.com')
        cy.get('#applicationForm > input:nth-child(10)').type('Andrei')
        cy.get('#lastName').type('Beloussov')
        cy.get('#applicationForm > input:nth-child(17)').type('123456')
        cy.get('#password').type('1234')
        cy.get('#confirm').type('5678')
        cy.get('#applicationForm > h2:nth-child(43)').click()
        cy.get('button[class="submit_button"]').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#password_error_message').should('be.visible')

    })

    it('Check that submit button cannot be selected if username is empty', () => {
        // Submit button by default is disabled and cannot be clicked
        cy.get('button[class="submit_button"]').should('be.disabled')

        // use function in order to fill the form with correct data
        function inputValidData() {
            return cy.get('#username').type('AndreiTest')
            cy.get('#email').type('myemail@emal.com')
            cy.get('#applicationForm > input:nth-child(10)').type('Andrei')
            cy.get('#lastName').type('Beloussov')
            cy.get('#applicationForm > input:nth-child(17)').type('123456')
        }

        // Add steps for emptying username input field
        cy.get('#username').clear().should('be.empty')
        // Assert that submit button is still disabled
        cy.get('button[class="submit_button"]').should('be.disabled')
    })

    //Add more similar tests for checking other mandatory field's absence

})

// Workshop #7 create more visual tests 
describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to be equal 178
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })


    // Create similar test for checking second picture

    it('Check that 2 logo is correct and has correct size', () => {
        cy.log('Will check 2 logo source and size')
        cy.get('img').eq(1).should('have.attr', 'src').should('include', 'cypress')
        // get element and check its parameter height, to be equal 88
        cy.get('img').eq(1).invoke('height').should('be.lessThan', 89)
            .and('be.greaterThan', 87)

    })

    // Navigation part.

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        // Check that currently opened URL is value:
        cy.url().should('contain', '/registration_form_1.html')
        // Visit previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it.skip('Check that URL to Cerebrum Hub page is correct and clickable', () => {
        //Create similar test for checking second link to Cerebrum Hub homepage
        


    })

    it('Check that radio button list is correct', () => {
        // Array has totally 4 elements
        cy.get('input[type="radio"]').should('have.length', 4)
        /*
        .next() is needed because of HTML structure:
        <input type="radio" id="htmlFavLanguage" name="fav_language" value="HTML">
        <label for="htmlFavLanguage">HTML</label><br>
         */
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that checkbox list is correct', () => {
        // Create test similar to previous one

        //  Verify, that there are 3 checkboxes buttons present and unchecked
        cy.get('input[type="checkbox"]').should('have.length', 3).and('not.be.checked')

        //  Verify label of each checbox
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat')




    })

    it('Car dropdown is correct', () => {
        // Select second element and create screenshot for this area, and full page
        // Don't forget to delete files and comment back if not using
        // cy.get('#cars').select(1).screenshot('Cars drop-down')
        // cy.screenshot('Full page screenshot')

        // Different solutions how get array length of elements in Cars dropdown
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Favourite animal dropdown is correct', () => {
        // Create test similar to previous one

        //Verify, that there is Animal dropdown with 6 choices.
        cy.get('#animal').children().should('have.length', 6)

        //Verify all values in dropdown

        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')


    })
})

function inputValidData() {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('Something')
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type('MyPass')
    // To get multiple classes user .class1.class2 selector
    cy.get('#confirm').type('MyPass')
    cy.get('[name="confirm"]').type('InvalidMyPass')
    cy.get('h2').contains('Password').click()
}

