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

  it('user can login', function () {
    cy.contains('log in').click();
    cy.get('#username').type('cypress-username');
    cy.get('#password').type('password');
    cy.get('#login-btn').click();

    cy.contains('cypress logged in');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('log in').click();
      cy.get('#username').type('cypress-username');
      cy.get('#password').type('password');
      cy.get('#login-btn').click();
    });

    it('a new note can be created', function () {
      cy.contains('new note').click();
      cy.get('input').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.contains('new note').click();
        cy.get('input').type('another note by cypress');
        cy.contains('save').click();
      });

      it('it can be made important', function () {
        cy.contains('another note by cypress')
          .contains('make important')
          .click();
        cy.contains('another note by cypress').contains('make not important');
      });
    });
  });
});
