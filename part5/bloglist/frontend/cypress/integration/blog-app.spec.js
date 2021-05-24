/// <reference types="Cypress" />

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    const user1 = {
      name: 'cypress',
      username: 'cy1',
      password: 'password',
    };

    const user2 = {
      name: 'cypress2',
      username: 'cy2',
      password: 'password2',
    };
    cy.request('POST', 'http://localhost:3001/api/users', user1);
    cy.request('POST', 'http://localhost:3001/api/users', user2);

    cy.visit('http://localhost:3000');
  });

  it('login form shown ', function () {
    cy.contains('login');
  });

  describe('login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('cy1');
      cy.get('#password').type('password');
      cy.get('#submitBtn').click();
      cy.contains('cypress logged in');
    });

    it('fails with the incorrect credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('cy1');
      cy.get('#password').type('wrong');
      cy.get('#submitBtn').click();

      cy.get('.error')
        .should('contain', 'wrong username / password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');
    });
  });

  describe('when user 1 logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'cy1', password: 'password' });
    });

    it('a blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('cypress test title');
      cy.get('#author').type('cypress test author');
      cy.get('#url').type('cypress test url');
      cy.get('#submitBlogBtn').click();

      cy.contains('cypress test title | by: cypress test author');
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.addBlog({
          title: 'cy title',
          author: 'cy author',
          url: 'cy url',
        });
      });

      it('a blog can be liked', function () {
        cy.get('#toDetailed').click();
        cy.get('#likeBtn').click();
        cy.get('#likes').contains('1');
      });

      it('a blog can be deleted by the creator', function () {
        cy.get('#toDetailed').click();
        cy.get('#deleteBtn').click();

        cy.get('html').should(
          'not.contain',
          'cypress test title | by: cypress test author'
        );
      });

      it.only('a blog can`t be deleted by another user', function () {
        cy.get('#logOutBtn').click();
        cy.login({ username: 'cy2', password: 'password2' });
        cy.contains('cypress2 logged in');

        cy.get('#toDetailed').click();
        cy.get('html').should('not.contain', 'delete');
      });
    });
  });
});
