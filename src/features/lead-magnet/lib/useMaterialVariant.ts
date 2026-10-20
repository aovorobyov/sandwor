'use client';

import { useEffect, useState } from 'react';
import { MATERIAL_IDS, MATERIAL_WINNER, isMaterialId, type MaterialId } from '@/entities/material';

const STORAGE_KEY = 'sw-material';

/** Случайный материал из списка — равные шансы. */
const pickRandom = (): MaterialId => {
  const [byte] = crypto.getRandomValues(new Uint8Array(1));
  return MATERIAL_IDS[byte % MATERIAL_IDS.length];
};

/**
 * Какой материал показывать этому посетителю. Выбирается случайно один раз и
 * запоминается (localStorage), чтобы человек на всех страницах и в повторных визитах
 * видел один вариант — иначе сравнение вариантов не имеет смысла.
 * `?material=site-law` в адресе — посмотреть конкретный вариант.
 * До монтирования — null: на сервере выбор не делаем (иначе расхождение при гидрации).
 */
export const useMaterialVariant = (): MaterialId | null => {
  const [variant, setVariant] = useState<MaterialId | null>(null);

  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).get('material');
    if (isMaterialId(forced)) {
      setVariant(forced);
      return;
    }

    if (MATERIAL_WINNER) {
      setVariant(MATERIAL_WINNER);
      return;
    }

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (isMaterialId(saved)) {
        setVariant(saved);
        return;
      }

      const picked = pickRandom();
      window.localStorage.setItem(STORAGE_KEY, picked);
      setVariant(picked);
    } catch {
      setVariant(pickRandom());
    }
  }, []);

  return variant;
};
