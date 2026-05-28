'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { cycleAccent } from '@/features/accent-toggle';
import { useLocaleSwitch } from '@/features/locale-switch';
import { locales, type Locale } from '@/i18n-routing';
import type { PaletteCommand } from '../CommandPalette.types';

interface NavLink {
    id: string;
    href: string;
    labelKey: string;
}

const NAV_LINKS: NavLink[] = [
    { id: 'nav-home', href: '/', labelKey: 'nav.home' },
    { id: 'nav-blog', href: '/blog', labelKey: 'nav.blog' },
    { id: 'nav-projects', href: '/projects', labelKey: 'nav.projects' },
    { id: 'nav-notes', href: '/notes', labelKey: 'nav.notes' },
    { id: 'nav-course', href: '/course/ai-basics', labelKey: 'nav.course' },
    { id: 'nav-contact', href: '/contact', labelKey: 'nav.contact' },
    { id: 'nav-uikit', href: '/uikit', labelKey: 'nav.uikit' },
];

const LOCALE_LABELS: Record<Locale, string> = {
    ru: 'Русский',
    en: 'English',
};

export const useCommands = (): PaletteCommand[] => {
    const t = useTranslations();
    const router = useRouter();
    const { setTheme } = useTheme();
    const { switchLocale, currentLocale } = useLocaleSwitch();

    const navCommands: PaletteCommand[] = NAV_LINKS.map(({ id, href, labelKey }) => {
        return {
            id,
            label: t(labelKey),
            group: 'navigation',
            icon: '→',
            onSelect: () => router.push(href),
        };
    });

    const themeCommands: PaletteCommand[] = [
        {
            id: 'theme-light',
            label: t('palette.themeLight'),
            group: 'theme',
            icon: '☀',
            keywords: 'light светлая day',
            onSelect: () => setTheme('light'),
        },
        {
            id: 'theme-dark',
            label: t('palette.themeDark'),
            group: 'theme',
            icon: '☾',
            keywords: 'dark тёмная темная night',
            onSelect: () => setTheme('dark'),
        },
        {
            id: 'theme-system',
            label: t('palette.themeSystem'),
            group: 'theme',
            icon: '⚙',
            keywords: 'system auto системная',
            onSelect: () => setTheme('system'),
        },
    ];

    const localeCommands: PaletteCommand[] = locales
        .filter((locale) => {
            return locale !== currentLocale;
        })
        .map((locale) => {
            return {
                id: `locale-${locale}`,
                label: t('palette.switchLocale', { locale: LOCALE_LABELS[locale] }),
                group: 'locale',
                icon: '◌',
                keywords: `language локаль язык ${locale} ${LOCALE_LABELS[locale]}`,
                onSelect: () => switchLocale(locale),
            };
        });

    const accentCommand: PaletteCommand = {
        id: 'accent-cycle',
        label: t('palette.accentChange'),
        group: 'accent',
        icon: '◉',
        keywords: 'color цвет акцент палитра',
        onSelect: () => cycleAccent(),
    };

    return [...navCommands, ...themeCommands, ...localeCommands, accentCommand];
};
