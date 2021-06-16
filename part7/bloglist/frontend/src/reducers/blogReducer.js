import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'CREATE':
      return [...state, action.data];
    case 'LIKE':
      return state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      );
    case 'DELETE':
      return state.filter((blog) => blog.id !== action.data.id);
    default:
      return state;
  }
};

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT',
      data: blogs,
    });
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch({
      type: 'CREATE',
      data: newBlog,
    });
    dispatch(setNotification('success', `${newBlog.title} created`, 3000));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = { ...blog, likes: blog.likes + 1 };
    const updatedBlog = await blogService.update(blog.id, newBlog);
    dispatch({
      type: 'LIKE',
      data: updatedBlog,
    });
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id);
    dispatch({
      type: 'DELETE',
      data: blog,
    });
    dispatch(setNotification('success', `${blog.title} removed`, 3000));
  };
};

export default blogReducer;
