const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
// const bcrypt = require('bcrypt');

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  await Blog.insertMany(helper.initialBlogs);
});

describe('when some blogs are saved', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(helper.initialBlogs.length);
  });

  test('id field is properly names', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });
});

test('a blog can be edited', async () => {
  const [aBlog] = await helper.blogsInDb();

  const editedBlog = { ...aBlog, likes: aBlog.likes + 1 };

  await api.put(`/api/blogs/${aBlog.id}`).send(editedBlog).expect(200);

  const blogsAtEnd = await helper.blogsInDb();
  const edited = blogsAtEnd.find((blog) => blog.url === aBlog.url);
  expect(edited.likes).toBe(aBlog.likes + 1);
});

describe('when a blog is posted to api', () => {
  let headers;

  beforeEach(async () => {
    const newUser = {
      username: 'newuser',
      name: 'Johno',
      password: 'password123',
    };

    await api.post('/api/users').send(newUser);

    const result = await api.post('/api/login').send(newUser);

    headers = {
      Authorization: `bearer ${result.body.token}`,
    };
  });

  test('it is saved to the db', async () => {
    const newBlog = {
      title: 'test title',
      author: 'test author',
      url: 'test url',
      likes: 5,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain('test title');
  });

  test('likes get value 0 as default', async () => {
    const newBlog = {
      title: 'test title',
      author: 'test author',
      url: 'test url',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const added = blogsAtEnd.find((blog) => blog.title === 'test title');
    expect(added.likes).toBe(0);
  });

  test('operation fails with url missing', async () => {
    const newBlog = {
      title: 'test title',
      author: 'test author',
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('operation fails with proper errror if token is missing', async () => {
    const newBlog = {
      title: 'test title',
      author: 'test author',
      url: 'test url',
      likes: 5,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
// describe('when there are 2 blogs and 1 user', () => {
//   beforeEach(async () => {
//     await User.deleteMany({});

//     const passwordHash = await bcrypt.hash('password', 10);
//     const user = new User({
//       blogs: [],
//       username: 'tester',
//       name: 'Joe',
//       passwordHash,
//       _id: '6091811702505c3056a6df44',
//     });

//     await user.save();
//     await Blog.deleteMany({});
//     await Blog.insertMany(helper.initialBlogs);
//   });

//   test('blogs returned as json', async () => {
//     await api
//       .get('/api/blogs')
//       .expect(200)
//       .expect('Content-Type', /application\/json/);
//   });

//   test('all notes are returned', async () => {
//     const response = await api.get('/api/blogs');
//     expect(response.body).toHaveLength(helper.initialBlogs.length);
//   });

//   test('all blogs have a unique identifier property named "id" ', async () => {
//     const response = await api.get('/api/blogs');
//     const ids = response.body.map((blog) => blog.id);
//     expect(ids).toHaveLength(helper.initialBlogs.length);
//   });

//   test('a valid blog can be added', async () => {
//     const users = await helper.usersInDb();
//     const userId = users[0].id;

//     const postTokenRequest = await api.post('/api/login').send({
//       username: 'tester',
//       password: 'password',
//     });

//     const userToken = postTokenRequest.body.token;

//     const newBlog = {
//       title: 'valid title',
//       author: 'author',
//       url: 'valid url',
//       likes: 5,
//       user: userId,
//     };

//     await api
//       .post('/api/blogs')
//       .send(newBlog)
//       .set('Authorization', `bearer ${userToken}`)
//       .expect(201)
//       .expect('Content-Type', /application\/json/);

//     const notesAtEnd = await helper.blogsInDb();
//     expect(notesAtEnd).toHaveLength(helper.initialBlogs.length + 1);

//     const titles = notesAtEnd.map((blog) => blog.title);
//     expect(titles).toContain('valid title');
//   });

//   test('likes property defaults to 0 if missing', async () => {
//     const users = await helper.usersInDb();
//     const userId = users[0].id;

//     const postTokenRequest = await api.post('/api/login').send({
//       username: 'tester',
//       password: 'password',
//     });

//     const userToken = postTokenRequest.body.token;

//     const newBlog = {
//       title: 'valid title',
//       author: 'author',
//       url: 'valid url',
//       user: userId,
//     };

//     await api
//       .post('/api/blogs')
//       .send(newBlog)
//       .set('Authorization', `bearer ${userToken}`)
//       .expect(201)
//       .expect('Content-Type', /application\/json/);

//     const blogsAtEnd = await helper.blogsInDb();
//     expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
//     expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0);
//   });

//   test('if title and url properties are missing from req data, responds with 400', async () => {
//     const users = await helper.usersInDb();
//     const userId = users[0].id;

//     const postTokenRequest = await api.post('/api/login').send({
//       username: 'tester',
//       password: 'password',
//     });

//     const userToken = postTokenRequest.body.token;

//     const newBlog = {
//       author: 'valid author',
//       likes: 4,
//       user: userId,
//     };

//     await api
//       .post('/api/blogs')
//       .send(newBlog)
//       .set('Authorization', `bearer ${userToken}`)
//       .expect(400);
//   });

//   test('if no token, adding a blog fails with 401', async () => {
//     const users = await helper.usersInDb();
//     const userId = users[0].id;

//     const newBlog = {
//       title: 'valid title',
//       author: 'author',
//       url: 'valid url',
//       likes: 5,
//       user: userId,
//     };

//     await api
//       .post('/api/blogs')
//       .send(newBlog)
//       .expect(401)
//       .expect('Content-Type', /application\/json/);
//   });
//   // test('deletes a blog with correct id', async () => {
//   //   const blogsAtStart = await helper.blogsInDb();
//   //   const blogToDelete = blogsAtStart[0];

//   //   const users = await helper.usersInDb();
//   //   const userId = users[0].id;

//   //   const postTokenRequest = await api.post('/api/login').send({
//   //     username: 'tester',
//   //     password: 'password',
//   //   });

//   //   const userToken = postTokenRequest.body.token;

//   //   await api
//   //     .delete(`/api/blogs/${blogToDelete.id}`)
//   //     .set('Authorization', `bearer ${userToken}`)
//   //     .expect(204);

//   //   const blogsAtEnd = await helper.blogsInDb();
//   //   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

//   //   const urls = blogsAtEnd.map((blog) => blog.url);
//   //   expect(urls).not.toContain(blogToDelete.url);
//   // });

//   test('updates blog`s likes correctly', async () => {
//     const blogsAtStart = await helper.blogsInDb();
//     const blogToUpdate = blogsAtStart[0];

//     const newBlog = {
//       ...blogToUpdate,
//       likes: 20,
//     };

//     await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(200);

//     const blogsAtEnd = await helper.blogsInDb();
//     expect(blogsAtEnd[0].likes).toEqual(20);
//   });

//   test('a valid user is created', async () => {
//     const usersAtStart = await helper.usersInDb();

//     const newValidUser = {
//       username: 'valid user',
//       name: 'Greg',
//       password: 'password2',
//     };
//     await api
//       .post('/api/users')
//       .send(newValidUser)
//       .expect(200)
//       .expect('Content-Type', /application\/json/);

//     const usersAtEnd = await helper.usersInDb();
//     expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
//     const usernames = usersAtEnd.map((user) => user.username);
//     expect(usernames).toContain('valid user');
//   });

//   test('an invalid user is not created if username < 3 with 400', async () => {
//     const usersAtStart = await helper.usersInDb();

//     const newInvalidUser = {
//       username: 'f',
//       name: 'failure',
//       password: 'password',
//     };

//     const result = await api
//       .post('/api/users')
//       .send(newInvalidUser)
//       .expect(400);

//     const usersAtEnd = await helper.usersInDb();
//     expect(result.body.error).toContain('is shorter than the minimum');
//     expect(usersAtEnd.length).toEqual(usersAtStart.length);
//   });

//   // test('an invalid user is not created if password < 3 with 400', async () => {
//   //   const usersAtStart = await helper.usersInDb();

//   //   const newInvalidUser = {
//   //     username: 'valid username',
//   //     name: 'failure',
//   //     password: 'p',
//   //   };

//   //   const result = await api
//   //     .post('/api/users')
//   //     .send(newInvalidUser)
//   //     .expect(400);

//   //   const usersAtEnd = await helper.usersInDb();
//   //   expect(result.body.error).toContain('password too short');
//   //   expect(usersAtEnd.length).toEqual(usersAtStart.length);
//   // });
// });

afterAll(() => {
  mongoose.connection.close();
});
