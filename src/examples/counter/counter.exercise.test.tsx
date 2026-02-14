// @vitest-environment happy-dom
import Counter from '.';
import { render, screen } from 'test/utilities';

test('it should render the component', () => {
  render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = render(<Counter />);

  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  await user.click(incrementButton);

  expect(currentCount).toHaveTextContent('1');
});

test('it should render the component with an initial count', () => {
  render(<Counter initialCount={2} />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('2');
});

test('it should reset the count when the "Reset" button is pressed', async () => {
  const { user } = render(<Counter initialCount={2} />);
  const currentCount = screen.getByTestId('current-count');
  const button = screen.getByRole('button', { name: /reset/i });

  expect(currentCount).toHaveTextContent('2');

  await user.click(button);
  expect(currentCount).toHaveTextContent('0');
});
