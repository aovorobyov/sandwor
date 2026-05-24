'use client';

import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/Button';
import type { CourseCompletionProps } from './CourseCompletion.types';
import s from './CourseCompletion.module.css';

export const CourseCompletion: FC<CourseCompletionProps> = ({ name, courseTitle, lessons, onBackToCourse }) => {
    const t = useTranslations('course');
    const [visibleSkills, setVisibleSkills] = useState<number[]>([]);

    useEffect(() => {
        lessons.forEach((_, index) => {
            setTimeout(() => {
                setVisibleSkills((prev) => [...prev, index]);
            }, 150 * index);
        });
    }, [lessons]);

    const handleDownloadPDF = () => {
        const date = new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });

        const skillsHtml = lessons
            .map((l) => `<li>✓ ${l.skill}</li>`)
            .join('');

        const promptsHtml = lessons
            .map((l, i) => `
                <div class="prompt-item">
                    <p class="prompt-title">${i + 1}. ${l.shortTitle}</p>
                    <p class="prompt-text">${l.promptTemplate}</p>
                </div>
            `)
            .join('');

        const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${t('pdf.headerTitle')}</title>
<style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; color: #1c1c1e; font-size: 13px; line-height: 1.6; }
    .header { background: #fe752b; color: #fff; padding: 24px 32px; }
    .header h1 { font-size: 22px; font-weight: 700; margin-bottom: 4px; }
    .header p { font-size: 12px; opacity: 0.85; }
    .body { padding: 28px 32px; }
    .meta { color: #6e6e73; font-size: 12px; margin-bottom: 20px; }
    .meta p { margin-bottom: 4px; }
    hr { border: none; border-top: 1px solid #d1d1d6; margin: 20px 0; }
    h2 { font-size: 15px; font-weight: 700; margin-bottom: 14px; }
    ul { list-style: none; padding: 0; }
    ul li { padding: 4px 0; font-size: 13px; }
    .prompt-item { margin-bottom: 14px; }
    .prompt-title { font-weight: 700; color: #fe752b; margin-bottom: 4px; }
    .prompt-text { background: #f5f5f7; border-radius: 6px; padding: 8px 12px; font-size: 12px; color: #3a3a3c; }
    .services li { margin-bottom: 10px; }
    .service-name { font-weight: 700; }
    .service-url { color: #fe752b; font-size: 11px; }
    .service-desc { color: #6e6e73; font-size: 12px; }
    @media print {
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
</style>
</head>
<body>
<div class="header">
    <h1>${t('pdf.headerTitle')}</h1>
    <p>${courseTitle}</p>
</div>
<div class="body">
    <div class="meta">
        <p><strong>${t('pdf.nameLabel')}:</strong> ${name || '—'}</p>
        <p><strong>${t('pdf.dateLabel')}:</strong> ${date}</p>
    </div>
    <hr>
    <h2>${t('pdf.skillsTitle')}</h2>
    <ul>${skillsHtml}</ul>
    <hr>
    <h2>${t('pdf.promptsTitle')}</h2>
    ${promptsHtml}
    <hr>
    <h2>${t('pdf.servicesTitle')}</h2>
    <ul class="services">
        <li>
            <span class="service-name">${t('pdf.service1Title')}</span>
            <span class="service-url"> — ${t('pdf.service1Url')}</span>
            <br><span class="service-desc">${t('pdf.service1Desc')}</span>
        </li>
        <li>
            <span class="service-name">${t('pdf.service2Title')}</span>
            <span class="service-url"> — ${t('pdf.service2Url')}</span>
            <br><span class="service-desc">${t('pdf.service2Desc')}</span>
        </li>
        <li>
            <span class="service-name">${t('pdf.service3Title')}</span>
            <span class="service-url"> — ${t('pdf.service3Url')}</span>
            <br><span class="service-desc">${t('pdf.service3Desc')}</span>
        </li>
    </ul>
</div>
</body>
</html>`;

        const win = window.open('', '_blank');
        if (!win) { return; }
        win.document.write(html);
        win.document.close();
        setTimeout(() => win.print(), 300);
    };

    const title = name ? t('completion.titleWithName', { name }) : t('completion.titleNoName');

    return (
        <div className={s.inner}>
            <div className={s.emoji} aria-hidden="true">🎉</div>

            <h1 className={s.title}>{title}</h1>

            <p className={s.sub}>{t('completion.sub')}</p>

            <div className={s.divider} />

            <p className={s.skillsHeading}>{t('completion.skillsHeading')}</p>

            <ul className={s.skillsList}>
                {lessons.map((lesson, index) => (
                    <li
                        key={index}
                        className={`${s.skillItem} ${visibleSkills.includes(index) ? s.skillItemVisible : ''}`}
                    >
                        <span className={s.skillCheck} aria-hidden="true">✓</span>

                        <span className={s.skillText}>{lesson.skill}</span>
                    </li>
                ))}
            </ul>

            <div className={s.actions}>
                <Button type="button" variant="primary" className={s.actionBtn} onClick={handleDownloadPDF}>
                    {t('completion.downloadPdf')}
                </Button>

                <Button type="button" variant="secondary" className={s.actionBtn} onClick={onBackToCourse}>
                    {t('completion.backToCourse')}
                </Button>
            </div>
        </div>
    );
};
