import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Grid, CardHeader } from '@material-ui/core';

const BlogCard = ({ blog }) => {
  return (
    <div>
      <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none' }}>
        <Card elevation={3}>
          <CardHeader title={blog.title}></CardHeader>
        </Card>
      </Link>
    </div>
  );
};

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      <h2>blogs</h2>
      <Grid container spacing={2}>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Grid item className="blog" key={blog.id} xs={12} md={6} lg={4}>
              <BlogCard blog={blog}></BlogCard>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default Blogs;
