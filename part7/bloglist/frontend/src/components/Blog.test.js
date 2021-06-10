import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('singular blog tests', () => {
  let component;
  let updateLikes;
  beforeEach(() => {
    const blog = {
      title: 'test title',
      author: 'test author',
      url: 'test url',
      likes: 5,
    };

    updateLikes = jest.fn();

    component = render(<Blog blog={blog} updateLikes={updateLikes} />);
  });

  test('renders content', () => {
    expect(component.container).toHaveTextContent('test title');
    expect(component.container).not.toHaveTextContent('5');
    expect(component.container).not.toHaveTextContent('test url');
  });

  test('details shown on click', () => {
    const button = component.getByText('view details');
    fireEvent.click(button);
    expect(component.container).toHaveTextContent('5');
    expect(component.container).toHaveTextContent('test url');
  });

  test('likes work correctly if clicked twice', () => {
    const detailBtn = component.getByText('view details');
    fireEvent.click(detailBtn);
    const likeBtn = component.getByText('like');
    fireEvent.click(likeBtn);
    fireEvent.click(likeBtn);
    expect(updateLikes.mock.calls).toHaveLength(2);
  });
});
