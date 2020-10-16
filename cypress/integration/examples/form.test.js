/* eslint-disable no-undef */
describe('Lambda Eats', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/pizzaform')
    })

    const nameInput = () => cy.get('input[name="name"]')
    const specialInput = () => cy.get('input[name="specialInstructions"]')
    const checkboxes = () => cy.get('[type="checkbox"]').check()
    const submitBtn = () => cy.get('#submitBtn')
    const selectSmall = () => cy.get('select')
    
    it('test that you can add text to the name input box', () => {
        nameInput().type('Olivia')
        nameInput().should('have.value', 'Olivia')
    })

    it('test that you can select multiple toppings', () => {
        checkboxes().check()
    })

    it('test that you can submit the form', () => {
        submitBtn().should('exist')
        nameInput().type('Olivia')
        selectSmall().select('s')
        checkboxes().check()
        specialInput().type('Gluten Free')
        submitBtn().click()
    })
})