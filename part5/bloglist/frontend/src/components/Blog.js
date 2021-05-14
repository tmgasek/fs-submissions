import React, { useState } from 'react';
const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const [initialView, setInitialView] = useState(true);
  const [updated, setUpdated] = useState(false);

  const handleEditClick = () => {
    const id = blog.id;

    updateBlog(id, {
      ...blog,
      likes: blog.likes + 1,
    });
    setUpdated(!updated);
  };

  const handleDetailClick = () => {
    setInitialView(!initialView);
  };

  const handleDeleteClick = () => {
    deleteBlog(blog.id);
  };

  const simplerView = () => {
    return (
      <div style={blogStyle}>
        {blog.title} | by: {blog.author}
        <button onClick={handleDetailClick}>view details</button>
        <button onClick={handleEditClick}>like</button>
        <button onClick={handleDeleteClick}>delete</button>
      </div>
    );
  };

  const detailedView = () => {
    return (
      <div style={blogStyle}>
        {blog.title} | by: {blog.author}
        <br /> {blog.url}
        <br /> {blog.likes}
        <br /> {blog.user.username}
        <button onClick={handleDetailClick}>view simple</button>
        <button onClick={handleEditClick}>like</button>
        <button onClick={handleDeleteClick}>delete</button>
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
