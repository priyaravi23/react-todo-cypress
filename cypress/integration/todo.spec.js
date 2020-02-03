describe('todo', () => {
    beforeEach(() => {
        cy.visit('/')
    });

    it('it focuses the input', () => {
        cy.focused().should('have.class', 'new-todo')
    });

    it('accepts input', () => {
        const input = "Learn Cypress";
        cy.get('.new-todo')
            .type(input)
            .should('have.value', input)
    });

    it('displays list of todo', () => {
        cy.get('.todo-list li')
            .should('have.length', 3)
    });

    it('adds a new todo', () => {
        const input = "Write end-to-end tests";
        cy.get('.new-todo')
            .type(input)
            .type('{enter}')
            .get('.todo-list li')
            .should('have.length', 4)
    });

    it('deletes a todo', () => {
        cy.get('.todo-list li')
            .first()
            .find('.destroy')
            .click({force: true})
            .get('.todo-list li')
            .should('have.length', 2)
    });
});