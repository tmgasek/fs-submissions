import Blog from './Blog';

const BlogList = ({ blogs, updateBlog, deleteBlog }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  );
};

export default BlogList;
