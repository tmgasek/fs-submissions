import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

test('form calls event handler with the right details upon new blog creation', () => {
  const createBlog = jest.fn();
  const component = render(<BlogForm createBlog={createBlog} />);
  const titleInput = component.container.querySelector('#title');
  const authorInput = component.container.querySelector('#author');
  const urlInput = component.container.querySelector('#url');
  const form = component.container.querySelector('form');

  fireEvent.change(titleInput, {
    target: { value: 'testing title' },
  });
  fireEvent.change(authorInput, {
    target: { value: 'testing author' },
  });
  fireEvent.change(urlInput, {
    target: { value: 'testing url' },
  });
  fireEvent.submit(form);
  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('testing title');
  expect(createBlog.mock.calls[0][0].author).toBe('testing author');
  expect(createBlog.mock.calls[0][0].url).toBe('testing url');
});
