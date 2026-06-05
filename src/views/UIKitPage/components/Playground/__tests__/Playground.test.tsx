import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { Playground } from '../Playground';

const messages = require('messages/ru.json') as Record<string, string>;

const renderPlayground = () => {
  return render(
    <NextIntlClientProvider locale="ru" messages={messages}>
      <Playground />
    </NextIntlClientProvider>,
  );
};

const getSnippetText = () => {
  return document.querySelector('code')?.textContent || '';
};

describe('Playground', () => {
  it('renders Button preview and snippet by default', () => {
    renderPlayground();

    expect(screen.getByRole('button', { name: 'Основное действие' })).toBeInTheDocument();
    expect(getSnippetText()).toBe(
      '<Button variant="primary" size="md">\n  Основное действие\n</Button>',
    );
  });

  it('updates snippet when a select prop changes', async () => {
    renderPlayground();

    await userEvent.click(screen.getByRole('combobox', { name: 'variant' }));

    await userEvent.click(screen.getByRole('option', { name: 'secondary' }));

    expect(getSnippetText()).toContain('variant="secondary"');
  });

  it('adds boolean prop to snippet only when enabled', async () => {
    renderPlayground();

    expect(getSnippetText()).not.toContain('disabled');

    await userEvent.click(screen.getByRole('checkbox', { name: 'disabled' }));

    expect(getSnippetText()).toContain('disabled');
    expect(screen.getByRole('button', { name: 'Основное действие' })).toBeDisabled();
  });

  it('switches component via tabs and renders self-closing snippet', async () => {
    renderPlayground();

    await userEvent.click(screen.getByRole('tab', { name: 'DotIcon' }));

    expect(getSnippetText()).toBe('<DotIcon name="search" size={32} />');
  });

  it('keeps overridden props after switching tabs back', async () => {
    renderPlayground();

    await userEvent.click(screen.getByRole('combobox', { name: 'variant' }));

    await userEvent.click(screen.getByRole('option', { name: 'ghost' }));

    await userEvent.click(screen.getByRole('tab', { name: 'Badge' }));

    await userEvent.click(screen.getByRole('tab', { name: 'Button' }));

    expect(getSnippetText()).toContain('variant="ghost"');
  });

  it('copies snippet to clipboard', async () => {
    const user = userEvent.setup();

    renderPlayground();

    await user.click(screen.getByRole('button', { name: 'Скопировать' }));

    expect(screen.getByRole('button', { name: 'Скопировано ✓' })).toBeInTheDocument();
    expect(await window.navigator.clipboard.readText()).toContain('<Button variant="primary"');
  });
});
