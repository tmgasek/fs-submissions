import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';
import { addBlogToUser, removeBlogFromUser } from './usersReducer';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
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
      type: 'INIT_BLOGS',
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
    dispatch(addBlogToUser(newBlog));
    dispatch(setNotification('success', `${newBlog.title} created`, 3000));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = { ...blog, likes: blog.likes + 1 };
    blogService.update(newBlog);
    dispatch({
      type: 'LIKE',
      data: newBlog,
    });
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id);
      dispatch({
        type: 'DELETE',
        data: blog,
      });
      dispatch(removeBlogFromUser(blog));
      dispatch(setNotification('success', `${blog.title} removed`, 3000));
    } catch (exception) {
      dispatch(setNotification('error', 'you are not the OP', 3000));
    }
  };
};

export default blogReducer;
