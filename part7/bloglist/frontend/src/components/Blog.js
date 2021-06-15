import React from 'react';
const Blog = ({ blog, handleLike, handleRemove, own }) => {
  // const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleDeleteClick = () => {
    if (
      window.confirm(`do you want to delete ${blog.title} by ${blog.author}?`)
    ) {
      handleRemove(blog.id);
    }
  };
  return (
    <div className="blog" style={blogStyle}>
      {blog.title} | by: {blog.author} <br /> {blog.url} by {blog.user.name}
      <br /> <span id="likes">{blog.likes}</span>{' '}
      <button id="likeBtn" onClick={() => handleLike(blog.id)}>
        like
      </button>
      {own && (
        <button id="deleteBtn" onClick={handleDeleteClick}>
          delete
        </button>
      )}
    </div>
  );
};

export default Blog;
