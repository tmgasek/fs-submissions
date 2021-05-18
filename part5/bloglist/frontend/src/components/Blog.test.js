import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

test('renders content', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 5,
  };

  const component = render(<Blog blog={blog} />);
  expect(component.container).toHaveTextContent('test title');
  expect(component.container).not.toHaveTextContent('5');
  expect(component.container).not.toHaveTextContent('test url');
});

test('details shown on click', () => {
  const button = component;
});
