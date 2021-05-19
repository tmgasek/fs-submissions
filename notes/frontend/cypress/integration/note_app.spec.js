describe('Note app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000/');
  });

  it('front page can be opened', function () {
    cy.contains('Notes');
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2021'
    );
  });

  it('login form can be opened', function () {
    cy.contains('log in').click();
  });

  it('user can login', function () {
    cy.contains('log in').click();
    cy.get('#username').type('frontend');
    cy.get('#password').type('password');
    cy.get('#login-btn').click();

    cy.contains('tester3 logged in');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('log in').click();
      cy.get('#username').type('frontend');
      cy.get('#password').type('password');
      cy.get('#login-btn').click();
    });

    it('a new note can be created', function () {
      cy.contains('new note').click();
      cy.get('input').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });
  });
});
