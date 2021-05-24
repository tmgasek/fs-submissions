/// <reference types="Cypress" />

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    const user = {
      name: 'cypress',
      username: 'cypress-username',
      password: 'password',
    };
    cy.request('POST', 'http://localhost:3001/api/users', user);

    cy.visit('http://localhost:3000');
  });

  it('login form shown ', function () {
    cy.contains('login');
  });

  describe('login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('cypress-username');
      cy.get('#password').type('password');
      cy.get('#submitBtn').click();
      cy.contains('cypress logged in');
    });

    it('fails with the incorrect credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('cypress-username');
      cy.get('#password').type('wrong');
      cy.get('#submitBtn').click();

      cy.get('.error')
        .should('contain', 'wrong username / password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'cypress-username', password: 'password' });
    });

    it('a blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('cypress test title');
      cy.get('#author').type('cypress test author');
      cy.get('#url').type('cypress test url');
      cy.get('#submitBlogBtn').click();

      cy.contains('cypress test title | by: cypress test author');
    });
  });
});
