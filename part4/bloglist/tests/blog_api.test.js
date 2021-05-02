const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
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

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'valid title',
    author: 'author',
    url: 'valid url',
    likes: 5,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const notesAtEnd = await helper.blogsInDb();
  expect(notesAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = notesAtEnd.map((blog) => blog.title);
  expect(titles).toContain('valid title');
});

test('likes property defaults to 0 if missing', async () => {
  const newBlog = {
    title: 'valid title',
    author: 'author',
    url: 'valid url',
  };

  await api.post('/api/blogs').send(newBlog).expect(200);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  expect(blogsAtEnd[helper.initialBlogs.length].likes).toBe(0);
});

test('if title and url properties are missing from req data, responds with 400', async () => {
  const newBlog = {
    author: 'valid author',
    likes: 4,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);
});

test('deletes a blog with correct id', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const urls = blogsAtEnd.map((blog) => blog.url);
  expect(urls).not.toContain(blogToDelete.url);
});

test('updates blog`s likes correctly', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];

  const newBlog = {
    ...blogToUpdate,
    likes: 20,
  };

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(200);

  const blogsAtEnd = await helper.blogsInDb();
  console.log(blogsAtEnd[0]);
  expect(blogsAtEnd[0].likes).toEqual(20);
});

afterAll(() => {
  mongoose.connection.close();
});
