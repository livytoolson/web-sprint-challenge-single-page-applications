describe('Lambda Eats', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/pizzaform')
    })

    const nameInput = () => cy.get('input[name="name"]')
    const specialInput = () => cy.get('input[name="specialInstructions"]')
    const submitBtn = () => cy.get('#submitBtn')
    
    it('test that you can add text to the name input box', () => {
        nameInput().type('Olivia')
        nameInput().should('have.value', 'Olivia')
    })

    it('test that you can select multiple toppings', () => {

    })

    it('test that you can submit the form', () => {
        submitBtn().should('exist')
        nameInput().type('Olivia')
        specialInput().type('Gluten Free')
        submitBtn().click()
    })
})