const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');
const bcrypt = require('bcrypt');

const api = supertest(app);

describe('when there are 2 blogs and 1 user', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('password', 10);
    const user = new User({
      username: 'testing_username',
      name: 'Joe',
      passwordHash,
    });
    await user.save();

    await Blog.deleteMany({});

    await Blog.insertMany(helper.initialBlogs);
  });

  test('blogs returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all notes are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('all blogs have a unique identifier property named "id" ', async () => {
    const response = await api.get('/api/blogs');
    const ids = response.body.map((blog) => blog.id);
    expect(ids).toHaveLength(helper.initialBlogs.length);
  });

  // test('a valid blog can be added', async () => {
  //   const newBlog = {
  //     title: 'valid title',
  //     author: 'author',
  //     url: 'valid url',
  //     likes: 5,
  //   };

  //   await api
  //     .post('/api/blogs')
  //     .send(newBlog)
  //     .expect(200)
  //     .expect('Content-Type', /application\/json/);

  //   const notesAtEnd = await helper.blogsInDb();
  //   expect(notesAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  //   const titles = notesAtEnd.map((blog) => blog.title);
  //   expect(titles).toContain('valid title');
  // });

  // test('likes property defaults to 0 if missing', async () => {
  //   const newBlog = {
  //     title: 'valid title',
  //     author: 'author',
  //     url: 'valid url',
  //   };

  //   await api.post('/api/blogs').send(newBlog).expect(200);

  //   const blogsAtEnd = await helper.blogsInDb();
  //   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  //   expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0);
  // });

  // test('if title and url properties are missing from req data, responds with 400', async () => {
  //   const newBlog = {
  //     author: 'valid author',
  //     likes: 4,
  //   };

  //   await api.post('/api/blogs').send(newBlog).expect(400);
  // });

  // test('deletes a blog with correct id', async () => {
  //   const blogsAtStart = await helper.blogsInDb();
  //   const blogToDelete = blogsAtStart[0];

  //   await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  //   const blogsAtEnd = await helper.blogsInDb();
  //   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  //   const urls = blogsAtEnd.map((blog) => blog.url);
  //   expect(urls).not.toContain(blogToDelete.url);
  // });

  // test('updates blog`s likes correctly', async () => {
  //   const blogsAtStart = await helper.blogsInDb();
  //   const blogToUpdate = blogsAtStart[0];

  //   const newBlog = {
  //     ...blogToUpdate,
  //     likes: 20,
  //   };

  //   await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(200);

  //   const blogsAtEnd = await helper.blogsInDb();
  //   expect(blogsAtEnd[0].likes).toEqual(20);
  // });

  // test('a valid user is created', async () => {
  //   const usersAtStart = await helper.usersInDb();

  //   const newValidUser = {
  //     username: 'valid user',
  //     name: 'Greg',
  //     password: 'password2',
  //   };
  //   await api
  //     .post('/api/users')
  //     .send(newValidUser)
  //     .expect(200)
  //     .expect('Content-Type', /application\/json/);

  //   const usersAtEnd = await helper.usersInDb();
  //   expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
  //   const usernames = usersAtEnd.map((user) => user.username);
  //   expect(usernames).toContain('valid user');
  // });

  // test('an invalid user is not created if username < 3 with 400', async () => {
  //   const usersAtStart = await helper.usersInDb();

  //   const newInvalidUser = {
  //     username: 'f',
  //     name: 'failure',
  //     password: 'password',
  //   };

  //   const result = await api
  //     .post('/api/users')
  //     .send(newInvalidUser)
  //     .expect(400);

  //   const usersAtEnd = await helper.usersInDb();
  //   expect(result.body.error).toContain('is shorter than the minimum');
  //   expect(usersAtEnd.length).toEqual(usersAtStart.length);
  // });

  // test('an invalid user is not created if password < 3 with 400', async () => {
  //   const usersAtStart = await helper.usersInDb();

  //   const newInvalidUser = {
  //     username: 'valid username',
  //     name: 'failure',
  //     password: 'p',
  //   };

  //   const result = await api
  //     .post('/api/users')
  //     .send(newInvalidUser)
  //     .expect(400);

  //   const usersAtEnd = await helper.usersInDb();
  //   expect(result.body.error).toContain('password too short');
  //   expect(usersAtEnd.length).toEqual(usersAtStart.length);
  // });
});

afterAll(() => {
  mongoose.connection.close();
});
