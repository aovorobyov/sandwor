// Сгенерировано scripts/sandwor-dts.mjs — не редактировать руками.
import type { ServiceId } from '../types';

export declare function cx(...parts: unknown[]): string;
export declare const SERVICES: Record<ServiceId, { id: ServiceId; label: string; icon: string }>;
export declare function formatNumber(n: number): string;
export declare function plural(n: number, forms: [string, string, string]): string;
export declare function formatRub(n: number): string;
