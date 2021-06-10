const listHelper = require('../utils/list_helper');
const testHelper = require('./test_helper');

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(testHelper.listWithOneBlog);
    expect(result).toBe(5);
  });
  test('of bigger list calculated right', () => {
    const result = listHelper.totalLikes(testHelper.initialBlogs);
    expect(result).toBe(36);
  });
  test('of empty list is 0', () => {
    const result = listHelper.totalLikes(testHelper.emptyBlogList);
    expect(result).toBe(0);
  });
});

describe('favorite blog', () => {
  test('of list of blogs', () => {
    const result = listHelper.favoriteBlog(testHelper.initialBlogs);
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });
});

describe('most blogs', () => {
  test('displays author with most blogs', () => {
    const result = listHelper.mostBlogs(testHelper.initialBlogs);
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });
});

describe('most liked blog', () => {
  test('display author with most likes across all blogs, as well as total likes', () => {
    const result = listHelper.mostLikes(testHelper.initialBlogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});
