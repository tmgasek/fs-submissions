// const dummy = (blogs) => {
//   return 1;
// };

// module.exports = {
//   dummy,
// };

const totalLikes = (blogs) => {
  if (!blogs) return 0;
  return blogs.reduce((accumulator, current) => {
    return accumulator + current.likes;
  }, 0);
};

module.exports = {
  // dummy,
  totalLikes,
};
