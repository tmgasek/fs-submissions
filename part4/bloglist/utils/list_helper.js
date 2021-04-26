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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
