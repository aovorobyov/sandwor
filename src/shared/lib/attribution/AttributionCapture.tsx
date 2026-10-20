'use client';

import { useEffect } from 'react';
import { rememberAttribution } from './attribution';

/** Ставится в layout: на первой странице визита запоминает, откуда пришёл человек. */
export const AttributionCapture = () => {
  useEffect(() => {
    rememberAttribution();
  }, []);

  return null;
};
