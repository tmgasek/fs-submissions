const dummy = (blogs) => {
  console.log(blogs);
  return 1;
};
const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

const totalLikes = (blogs) => {
  if (!blogs) return 0;
  return blogs.reduce((accumulator, current) => {
    return accumulator + current.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs) return 0;

  const sortedBlogs = blogs.sort((a, b) => {
    const aLikes = a.likes;
    const bLikes = b.likes;

    if (aLikes > bLikes) return -1;
    if (bLikes > aLikes) return 1;
    return 0;
  });
  const topBlog = sortedBlogs[0];
  return {
    title: topBlog.title,
    author: topBlog.author,
    likes: topBlog.likes,
  };
};

const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => blog.author);

  const authorCount = authors.reduce((author, count) => {
    if (!author[count]) {
      author[count] = 0;
    }
    author[count]++;
    return author;
  }, {});

  const topAuthor = Object.keys(authorCount).reduce((a, b) =>
    authorCount[a] > authorCount[b] ? a : b
  );

  return {
    author: topAuthor,
    blogs: authorCount[topAuthor],
  };
};

const mostLikes = (blogs) => {
  const authors = blogs.map((blog) => {
    return [blog.author, blog.likes];
  });

  const likesCount = authors.reduce((author, count) => {});
};

mostLikes(blogs);
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
