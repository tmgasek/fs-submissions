const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are 10 notes', async () => {
  const response = await api.get('/api/notes');

  //the execution gets here only after the HTTP req is complete.
  //the result of HTTP req is saved in variable response.
  expect(response.body).toHaveLength(2);
});

test('second note says two', async () => {
  const response = await api.get('/api/notes');
  expect(response.body[1].content).toBe('two');
});

afterAll(() => {
  mongoose.connection.close();
});
