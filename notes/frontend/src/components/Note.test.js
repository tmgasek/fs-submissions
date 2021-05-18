import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
// import { prettyDOM } from '@testing-library/dom';
import Note from './Note';

test('renders content', () => {
  const note = {
    content: 'test content',
    important: true,
  };
  const component = render(<Note note={note} />);
  // const li = component.container.querySelector('li');
  // console.log(prettyDOM(li));
  expect(component.container).toHaveTextContent('test content');
});

test('clicking the button calls event handler once', () => {
  const note = {
    content: 'testing button',
    important: true,
  };
  const mochHandler = jest.fn();
  const component = render(<Note note={note} toggleImportance={mochHandler} />);
  const button = component.getByText('make not important');
  fireEvent.click(button);
  expect(mochHandler.mock.calls).toHaveLength(1);
});
