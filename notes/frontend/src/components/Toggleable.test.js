import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Toggleable from './Toggleable';

describe('<Toggleable />', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Toggleable buttonLabel="show...">
        <div className="testDiv"></div>
      </Toggleable>
    );
  });

  test('renders its children', () => {
    expect(component.container.querySelector('.testDiv')).toBeDefined();
  });

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.toggleableContent');
    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button, childten are displayed', () => {
    const button = component.getByText('show...');
    fireEvent.click(button);

    const div = component.container.querySelector('.toggleableContent');
    expect(div).not.toHaveStyle('display: none');
  });

  test('toggled content can be closed', () => {
    const button = component.getByText('show...');
    fireEvent.click(button);

    const closeButton = component.getByText('cancel');
    fireEvent.click(closeButton);

    const div = component.container.querySelector('.toggleableContent');
    expect(div).toHaveStyle('display: none');
  });
});
