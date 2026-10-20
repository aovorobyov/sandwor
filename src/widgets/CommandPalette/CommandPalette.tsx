'use client';

import type { ChangeEvent, FC, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Modal } from '@sw/components/Modal';
import { TextField } from '@sw/components/TextField';
import { Icon } from '@sw/components/Icon';
import { cx } from '@sw/utils';
import type { PaletteCommand } from './CommandPalette.types';
import { useCommands } from './lib/useCommands';
import { fetchPalettePosts, type PaletteSearchPost } from './lib/paletteApi';
import { PALETTE_OPEN_EVENT } from './lib/paletteEvents';
import s from './CommandPalette.module.css';

const COMMAND_KEY = 'k';

const matchesQuery = (cmd: PaletteCommand, query: string): boolean => {
  if (!query) {
    return true;
  }

  const haystack = `${cmd.label} ${cmd.keywords || ''}`.toLowerCase();
  return haystack.includes(query.toLowerCase());
};

/**
 * Поиск и навигация по ⌘K / Ctrl+K: Modal дизайн-системы с полем поиска и
 * списком команд. Стрелки выбирают пункт, Enter выполняет, Esc закрывает.
 */
export const CommandPalette: FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const listId = useId();
  const [posts, setPosts] = useState<PaletteSearchPost[]>([]);
  // Статьи грузим при первом открытии — и заново после смены языка.
  const [fetchedLocale, setFetchedLocale] = useState<string | null>(null);
  const commands = useCommands(posts);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = useMemo(() => {
    return commands.filter((cmd) => matchesQuery(cmd, query));
  }, [commands, query]);

  useEffect(() => {
    const open = () => {
      setIsOpen(true);
      setQuery('');
      setSelectedIndex(0);
    };

    const handleGlobalKey = (event: KeyboardEvent) => {
      const isTrigger = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === COMMAND_KEY;
      if (isTrigger) {
        event.preventDefault();
        open();
      }
    };

    document.addEventListener('keydown', handleGlobalKey);
    document.addEventListener(PALETTE_OPEN_EVENT, open);
    return () => {
      document.removeEventListener('keydown', handleGlobalKey);
      document.removeEventListener(PALETTE_OPEN_EVENT, open);
    };
  }, []);

  useEffect(() => {
    if (!isOpen || fetchedLocale === locale) {
      return;
    }

    setFetchedLocale(locale);
    fetchPalettePosts(locale).then(setPosts);
  }, [isOpen, fetchedLocale, locale]);

  useEffect(() => {
    setSelectedIndex((prev) => Math.min(prev, Math.max(filtered.length - 1, 0)));
  }, [filtered.length]);

  useEffect(() => {
    const active = listRef.current?.querySelector('[aria-selected="true"]');
    active?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  const close = () => {
    setIsOpen(false);
  };

  const runCommand = (cmd: PaletteCommand) => {
    setIsOpen(false);
    cmd.onSelect();
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuery(event.target.value);
    setSelectedIndex(0);
  };

  const handleInputKey = (event: ReactKeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const total = filtered.length;
    if (total === 0) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedIndex((i) => (i + 1) % total);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedIndex((i) => (i - 1 + total) % total);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const cmd = filtered[selectedIndex];
      if (cmd) {
        runCommand(cmd);
      }
    }
  };

  const activeId = filtered[selectedIndex] ? `${listId}-${selectedIndex}` : undefined;

  return (
    <Modal
      open={isOpen}
      onClose={close}
      label={t('palette.placeholder')}
      closeLabel={t('common.close')}
      initialFocus={inputRef as React.RefObject<HTMLElement>}
      hideClose
      footer={
        <div className={s.hints} aria-hidden="true">
          <span>
            <kbd className={s.kbd}>↑↓</kbd> {t('palette.hintNavigate')}
          </span>
          <span>
            <kbd className={s.kbd}>Enter</kbd> {t('palette.hintSelect')}
          </span>
          <span>
            <kbd className={s.kbd}>Esc</kbd> {t('palette.hintClose')}
          </span>
        </div>
      }
    >
      <TextField
        icon="search"
        value={query}
        onChange={handleQueryChange}
        onKeyDown={handleInputKey}
        placeholder={t('palette.placeholder')}
        aria-label={t('palette.placeholder')}
        role="combobox"
        aria-expanded="true"
        aria-controls={listId}
        aria-activedescendant={activeId}
        autoComplete="off"
        inputRef={inputRef}
        size="l"
      />

      {filtered.length === 0 ? (
        <p className={s.empty}>{t('palette.empty')}</p>
      ) : (
        <ul ref={listRef} id={listId} role="listbox" className={s.list}>
          {filtered.map((cmd, idx) => (
            <li
              key={cmd.id}
              id={`${listId}-${idx}`}
              role="option"
              aria-selected={idx === selectedIndex}
              className={cx(s.item, idx === selectedIndex && s.itemActive)}
              onClick={() => runCommand(cmd)}
              onMouseEnter={() => setSelectedIndex(idx)}
            >
              <span className={s.itemIcon} aria-hidden="true">
                <Icon name={cmd.icon} size={16} />
              </span>

              <span className={s.itemLabel}>{cmd.label}</span>

              <span className={s.itemGroup}>{t(`palette.group.${cmd.group}`)}</span>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
};
