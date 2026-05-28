'use client';

import type {
  ChangeEvent,
  FC,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/cn';
import type { PaletteCommand } from './CommandPalette.types';
import { useCommands } from './lib/useCommands';
import s from './CommandPalette.module.css';

const COMMAND_KEY = 'k';

const matchesQuery = (cmd: PaletteCommand, query: string): boolean => {
  if (!query) {
    return true;
  }

  const haystack = `${cmd.label} ${cmd.keywords || ''}`.toLowerCase();
  return haystack.includes(query.toLowerCase());
};

export const CommandPalette: FC = () => {
  const t = useTranslations('palette');
  const commands = useCommands();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    return commands.filter((cmd) => {
      return matchesQuery(cmd, query);
    });
  }, [commands, query]);

  useEffect(() => {
    const handleGlobalKey = (event: KeyboardEvent) => {
      const isTrigger = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === COMMAND_KEY;
      if (isTrigger) {
        event.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery('');
        setSelectedIndex(0);
        return;
      }
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleGlobalKey);
    return () => {
      document.removeEventListener('keydown', handleGlobalKey);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex((prev) => {
      const max = Math.max(filtered.length - 1, 0);
      return Math.min(prev, max);
    });
  }, [filtered.length]);

  const runCommand = (cmd: PaletteCommand) => {
    setIsOpen(false);
    cmd.onSelect();
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setSelectedIndex(0);
  };

  const handleInputKey = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    const total = filtered.length;
    if (total === 0) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex((i) => (i + 1) % total);
        return;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex((i) => (i - 1 + total) % total);
        return;
      case 'Enter': {
        event.preventDefault();
        const cmd = filtered[selectedIndex];
        if (cmd) {
          runCommand(cmd);
        }
        return;
      }
    }
  };

  const handleBackdropClick = () => {
    setIsOpen(false);
  };

  const handlePanelClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const createItemClickHandler = (cmd: PaletteCommand) => {
    return () => {
      runCommand(cmd);
    };
  };

  const createItemHoverHandler = (idx: number) => {
    return () => {
      setSelectedIndex(idx);
    };
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={s.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div className={s.panel} onClick={handlePanelClick}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleQueryChange}
          onKeyDown={handleInputKey}
          placeholder={t('placeholder')}
          className={s.input}
          aria-label={t('placeholder')}
        />

        {filtered.length === 0 ? (
          <p className={s.empty}>{t('empty')}</p>
        ) : (
          <ul className={s.list}>
            {filtered.map((cmd, idx) => (
              <li
                key={cmd.id}
                className={cn(s.item, idx === selectedIndex && s.itemActive)}
                onClick={createItemClickHandler(cmd)}
                onMouseEnter={createItemHoverHandler(idx)}
              >
                {cmd.icon && <span className={s.itemIcon}>{cmd.icon}</span>}

                <span className={s.itemLabel}>{cmd.label}</span>

                <span className={s.itemGroup}>{t(`group.${cmd.group}`)}</span>
              </li>
            ))}
          </ul>
        )}

        <div className={s.hints}>
          <span>↑↓ {t('hintNavigate')}</span>

          <span>Enter {t('hintSelect')}</span>

          <span>Esc {t('hintClose')}</span>
        </div>
      </div>
    </div>
  );
};
