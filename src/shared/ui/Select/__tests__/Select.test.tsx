import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '../Select';

const OPTIONS = [
  { value: 'primary', label: 'primary' },
  { value: 'secondary', label: 'secondary' },
  { value: 'ghost', label: 'ghost' },
];

describe('Select', () => {
  it('renders trigger with selected option label and closed list', () => {
    render(<Select name="variant" value="primary" options={OPTIONS} onChange={jest.fn()} />);

    const trigger = screen.getByRole('combobox');

    expect(trigger).toHaveTextContent('primary');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('opens list on trigger click and marks selected option', async () => {
    render(<Select name="variant" value="ghost" options={OPTIONS} onChange={jest.fn()} />);

    await userEvent.click(screen.getByRole('combobox'));

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'ghost' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('option', { name: 'primary' })).toHaveAttribute(
      'aria-selected',
      'false',
    );
  });

  it('calls onChange with value and name, then closes the list', async () => {
    const handleChange = jest.fn();

    render(<Select name="variant" value="primary" options={OPTIONS} onChange={handleChange} />);

    await userEvent.click(screen.getByRole('combobox'));

    await userEvent.click(screen.getByRole('option', { name: 'secondary' }));

    expect(handleChange).toHaveBeenCalledWith('secondary', 'variant');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes on Escape', async () => {
    render(<Select name="variant" value="primary" options={OPTIONS} onChange={jest.fn()} />);

    await userEvent.click(screen.getByRole('combobox'));

    await userEvent.keyboard('{Escape}');

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes on outside click without calling onChange', async () => {
    const handleChange = jest.fn();

    render(
      <div>
        <Select name="variant" value="primary" options={OPTIONS} onChange={handleChange} />

        <button type="button">outside</button>
      </div>,
    );

    await userEvent.click(screen.getByRole('combobox'));

    await userEvent.click(screen.getByRole('button', { name: 'outside' }));

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(handleChange).not.toHaveBeenCalled();
  });
});
