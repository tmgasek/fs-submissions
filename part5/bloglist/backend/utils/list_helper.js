const dummy = (blogs) => {
  console.log(blogs);
  return 1;
};

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
    author[count] = author[count] || 0;
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
  const likesCount = blogs.reduce((op, { author, likes }) => {
    op[author] = op[author] || 0;
    op[author] += likes;
    return op;
  }, {});

  const topAuthor = Object.keys(likesCount).reduce((a, b) =>
    likesCount[a] > likesCount[b] ? a : b
  );
  return {
    author: topAuthor,
    likes: likesCount[topAuthor],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
