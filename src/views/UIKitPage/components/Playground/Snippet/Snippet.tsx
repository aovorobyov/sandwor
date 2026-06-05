import { useState } from 'react';
import type { FC } from 'react';
import { useTranslations } from 'next-intl';
import type { SnippetProps } from './Snippet.types';
import s from './Snippet.module.css';

/** Через сколько сбрасывать подсветку «Скопировано». */
const COPIED_RESET_MS = 2000;

export const Snippet: FC<SnippetProps> = (props) => {
  const { code } = props;
  const t = useTranslations('uikit');
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);

    window.setTimeout(() => {
      setIsCopied(false);
    }, COPIED_RESET_MS);
  };

  return (
    <div className={s.root}>
      <div className={s.toolbar}>
        <button type="button" className={s.copy} onClick={handleCopyClick}>
          {isCopied ? t('playground-copied') : t('playground-copy')}
        </button>
      </div>

      <pre className={s.code}>
        <code>{code}</code>
      </pre>
    </div>
  );
};
