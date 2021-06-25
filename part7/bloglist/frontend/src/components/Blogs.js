import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  Container,
  Grid,
  Typography,
  CardHeader,
  CardContent,
} from '@material-ui/core';

const BlogCard = ({ blog }) => {
  return (
    <div>
      <Card elevation={2}>
        <CardContent>
          <Typography variant="body1">{blog.title}</Typography>
        </CardContent>
        <Link to={`/blogs/${blog.id}`}>
          <Button variant="contained" color="primary" size="small">
            view
          </Button>
        </Link>
      </Card>
    </div>
  );
};

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      <h2>blogs</h2>
      <Grid container spacing={3}>
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

// return (
//   <Container>
//     <h2>blogs</h2>
//     <Grid container>
//       {blogs
//         .sort((a, b) => b.likes - a.likes)
//         .map((blog) => (
//           <Grid item className="blog" key={blog.id} xs={12} md={6} lg={4}>
//             <Card variant="outlined">
//               <Link to={`/blogs/${blog.id}`}>
//                 <Typography variant="h5">{blog.title}</Typography>
//               </Link>
//               <Typography variant="body2">by: {blog.author}</Typography>
//             </Card>
//           </Grid>
//         ))}
//     </Grid>
//   </Container>
// );
