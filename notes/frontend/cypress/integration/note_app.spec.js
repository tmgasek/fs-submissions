/// <reference types="Cypress" />

describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'cypress',
      username: 'cypress-username',
      password: 'password',
    };

    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:3000/');
  });

  it('front page can be opened', function () {
    cy.contains('Notes');
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2021'
    );
  });

  // it('then example', function () {
  //   cy.get('button').then((buttons) => {
  //     console.log('number of buttons', buttons.length);
  //     cy.wrap(buttons[0]).click();
  //   });
  // });

  it('login fails with wrong password', function () {
    cy.contains('log in').click();
    cy.get('#username').type('cypress-username');
    cy.get('#password').type('wrong');
    cy.get('#login-btn').click();

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');

    cy.get('html').should('not.contain', 'cypress logged in');
  });

  it('user can login', function () {
    cy.contains('log in').click();
    cy.get('#username').type('cypress-username');
    cy.get('#password').type('password');
    cy.get('#login-btn').click();

    cy.contains('cypress logged in');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'cypress-username', password: 'password' });
    });

    it('a new note can be created', function () {
      cy.contains('new note').click();
      cy.get('input').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });

    describe('and several notes exists', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false });
        cy.createNote({ content: 'second note', important: false });
        cy.createNote({ content: 'third note', important: false });
      });

      it('one can be made important', function () {
        cy.contains('second note').parent().find('button').as('impBtn');
        cy.get('@impBtn').click();
        cy.get('@impBtn').should('contain', 'make not important');
      });
    });
  });
});
