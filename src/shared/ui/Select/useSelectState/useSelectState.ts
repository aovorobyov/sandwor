import { useEffect, useRef, useState } from 'react';

/** Состояние выпадающего списка: открытие/закрытие, клик мимо и Escape. */
export const useSelectState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setIsOpen((prev) => {
      return !prev;
    });
  };

  const close = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleOutsideMouseDown = (event: MouseEvent) => {
      // target события — всегда Node; сужение типа EventTarget → Node
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideMouseDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsideMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return { isOpen, rootRef, toggle, close };
};
