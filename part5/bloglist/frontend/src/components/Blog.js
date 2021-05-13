import React, { useState } from 'react';
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const [initialView, setInitialView] = useState(true);

  const handleClick = () => {
    setInitialView(!initialView);
  };

  const simplerView = () => {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={handleClick}>view details</button>
      </div>
    );
  };

  const detailedView = () => {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <br /> {blog.url}
        <br />
        {blog.likes} <br />
        {blog.user.username}
        <button onClick={handleClick}>view simple</button>
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
