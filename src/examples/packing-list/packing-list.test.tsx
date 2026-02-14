import { render as _render, screen } from 'test/utilities';
import { PackingList } from '.';
import { createStore } from './store';
import { Provider } from 'react-redux';

const render = (ui: React.ReactElement) => {
  return _render(
    <Provider store={createStore()}>
      <PackingList />
    </Provider>,
  );
};

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  screen.getByLabelText(/new item name/i);
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<PackingList />);
  const button = screen.getByRole('button', { name: /new item/i });
  const input = screen.getByLabelText('New Item Name');

  expect(input).toHaveValue('');
  expect(button).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user } = render(<PackingList />);
  const button = screen.getByRole('button', { name: /new item/i });
  const input = screen.getByLabelText('New Item Name');

  await user.type(input, 'Calcetines');

  expect(button).not.toBeDisabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = render(<PackingList />);
  const button = screen.getByRole('button', { name: /new item/i });
  const input = screen.getByLabelText('New Item Name');

  await user.type(input, 'Fortasec');
  await user.click(button);

  expect(screen.getByLabelText('Fortasec')).not.toBeChecked();
});
