import React, { useState } from 'react';
const Blog = ({ blog, updateLikes, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const [initialView, setInitialView] = useState(true);

  const handleLikeClick = () => {
    const id = blog.id;

    updateLikes(id, {
      ...blog,
      likes: blog.likes + 1,
    });
  };

  const handleDetailClick = () => {
    setInitialView(!initialView);
  };

  const handleDeleteClick = () => {
    if (
      window.confirm(`do you want to delete ${blog.title} by ${blog.author}?`)
    ) {
      deleteBlog(blog.id);
    }
  };

  const simplerView = () => {
    return (
      <div className="blog" style={blogStyle}>
        {blog.title} | by: {blog.author}
        <button id="toDetailed" onClick={handleDetailClick}>
          view details
        </button>
      </div>
    );
  };

  const detailedView = () => {
    return (
      <div className="blog" style={blogStyle}>
        {blog.title} | by: {blog.author}{' '}
        <button id="toSimple" onClick={handleDetailClick}>
          view simple
        </button>
        <br /> {blog.url}
        <br /> <span id="likes">{blog.likes}</span>{' '}
        <button id="likeBtn" onClick={handleLikeClick}>
          like
        </button>
        {user.name === blog.user.name && (
          <button id="deleteBtn" onClick={handleDeleteClick}>
            delete
          </button>
        )}
      </div>
    );
  };

  return (
    <div>
      {initialView === false ? (
        <div>{detailedView()} </div>
      ) : (
        <div>{simplerView()} </div>
      )}
    </div>
  );
};

export default Blog;
