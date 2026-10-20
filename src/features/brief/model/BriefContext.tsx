'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import type { ServiceId } from '@/entities/service';
import dynamic from 'next/dynamic';

// Окно брифа (форма, чипы, поля) грузится при первом открытии, а не на каждой странице.
const BriefModal = dynamic(() => import('../ui/BriefModal').then((mod) => mod.BriefModal), {
  ssr: false,
});

export interface OpenBriefOptions {
  /** Услуги, отмеченные на первом шаге (из калькулятора или страницы услуги). */
  services?: ServiceId[];
}

interface BriefApi {
  openBrief: (options?: OpenBriefOptions) => void;
}

const BriefContext = createContext<BriefApi | null>(null);

interface BriefState {
  isOpen: boolean;
  services?: ServiceId[];
  /** Новый ключ на каждое открытие — бриф начинается с первого шага. */
  session: number;
}

/**
 * Один бриф на всё приложение: его открывают кнопка в шапке, CTA подвала,
 * калькулятор и тарифы. Модальное окно живёт здесь, а не в каждой кнопке.
 */
export const BriefProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<BriefState>({ isOpen: false, session: 0 });

  const openBrief = useCallback((options?: OpenBriefOptions) => {
    setState((prev) => ({ isOpen: true, services: options?.services, session: prev.session + 1 }));
  }, []);

  const closeBrief = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const api = useMemo(() => ({ openBrief }), [openBrief]);

  return (
    <BriefContext.Provider value={api}>
      {children}

      {state.session > 0 && (
        <BriefModal
          key={state.session}
          open={state.isOpen}
          onClose={closeBrief}
          services={state.services}
        />
      )}
    </BriefContext.Provider>
  );
};

export const useBrief = (): BriefApi => {
  const api = useContext(BriefContext);

  if (!api) {
    throw new Error('useBrief: оберните приложение в <BriefProvider>');
  }

  return api;
};
