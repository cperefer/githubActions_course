// @vitest-environment happy-dom

import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';
import { render } from 'test/utilities';

test('it should render the component', () => {
  render(<Counter />);
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = render(<Counter />);

  const button = screen.getByRole('button', { name: 'Increment' });
  const counter = screen.getByTestId('current-count');
  expect(counter).toHaveTextContent('0');

  fireEvent.click(button);
  expect(counter).toHaveTextContent('1');

  await user.click(button);
  expect(counter).toHaveTextContent('2');
});
