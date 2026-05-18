import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import s from './UIKitPage.module.css';

export const UIKitPage = async () => {
    const t = await getTranslations('uikit');

    return (
        <div className={s.root}>
            <section className={s.header}>
                <div className={s.container}>
                    <h1 className={s.title}>{t('title')}</h1>

                    <p className={s.description}>{t('description')}</p>
                </div>
            </section>

            <div className={s.container}>
                <div className={s.grid}>
                    <section className={s.lightSection}>
                        <div className={s.sectionLabel}>
                            <span className={s.sectionLabelText}>{t('light-mode')}</span>

                            <div className={s.sectionLabelLine} />
                        </div>

                        <div className={s.sectionContent}>
                            <div className={s.group}>
                                <h3 className={s.groupTitle}>{t('buttons')}</h3>

                                <div className={s.row}>
                                    <span className={s.rowItem}><Button variant="primary">{t('btn-primary')}</Button></span>

                                    <span className={s.rowItem}><Button variant="secondary">{t('btn-secondary')}</Button></span>

                                    <span className={s.rowItem}><Button variant="ghost">{t('btn-ghost')}</Button></span>
                                </div>
                            </div>

                            <div className={s.group}>
                                <h3 className={s.groupTitle}>{t('badges')}</h3>

                                <div className={s.rowSmall}>
                                    <span className={s.rowSmallItem}><Badge variant="neutral">{t('badge-neutral')}</Badge></span>

                                    <span className={s.rowSmallItem}><Badge variant="accent">{t('badge-accent')}</Badge></span>
                                </div>
                            </div>

                            <div className={s.group}>
                                <h3 className={s.groupTitle}>{t('cards')}</h3>

                                <div className={s.cardsStack}>
                                    <div className={s.blogCard}>
                                        <span className={s.blogCardDate}>{t('card-date')}</span>

                                        <h4 className={s.blogCardTitle}>{t('card-title')}</h4>

                                        <p className={s.blogCardDescription}>{t('card-description')}</p>
                                    </div>

                                    <div className={s.projectCard}>
                                        <Image
                                            className={s.projectCardImage}
                                            src="https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=800&q=80"
                                            alt=""
                                            width={800}
                                            height={600}
                                        />

                                        <div className={s.projectCardBody}>
                                            <h4 className={s.projectCardTitle}>{t('project-title')}</h4>

                                            <p className={s.projectCardCategory}>{t('project-category')}</p>

                                            <span className={s.projectCardLink}>
                                                {t('view-case')} <span className={s.projectCardLinkArrow} aria-hidden>→</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={s.group}>
                                <h3 className={s.groupTitle}>{t('form-elements')}</h3>

                                <div className={s.formFields}>
                                    <div className={s.fieldWrapper}>
                                        <label className={s.fieldLabel}>{t('form-label')}</label>

                                        <input
                                            type="text"
                                            className={s.fieldInput}
                                            placeholder={t('form-placeholder')}
                                            readOnly
                                        />
                                    </div>

                                    <div className={s.fieldWrapper}>
                                        <label className={s.fieldLabel}>{t('form-message')}</label>

                                        <textarea
                                            className={s.fieldTextarea}
                                            placeholder={t('form-message-placeholder')}
                                            rows={4}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={s.group}>
                                <h3 className={s.groupTitle}>{t('note-entry')}</h3>

                                <div className={s.noteEntry}>
                                    <p className={s.noteQuote}>&ldquo;{t('note-quote')}&rdquo;</p>

                                    <div className={s.noteSeparator} />

                                    <p className={s.noteMeta}>{t('note-meta')}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className={s.darkSection}>
                        <div className={s.sectionLabel}>
                            <span className={s.sectionLabelText}>{t('dark-mode')}</span>

                            <div className={s.sectionLabelLine} />
                        </div>

                        <div className={s.sectionContent}>
                            <div className={s.group}>
                                <h3 className={s.groupTitle}>{t('buttons')}</h3>

                                <div className={s.row}>
                                    <span className={s.rowItem}><Button variant="primary">{t('btn-primary')}</Button></span>

                                    <span className={s.rowItem}><Button variant="secondary">{t('btn-secondary')}</Button></span>

                                    <span className={s.rowItem}><Button variant="ghost">{t('btn-ghost')}</Button></span>
                                </div>
                            </div>

                            <div className={s.group}>
                                <h3 className={s.groupTitle}>{t('badges')}</h3>

                                <div className={s.rowSmall}>
                                    <span className={s.rowSmallItem}><Badge variant="neutral">{t('badge-neutral')}</Badge></span>

                                    <span className={s.rowSmallItem}><Badge variant="accent">{t('badge-accent')}</Badge></span>
                                </div>
                            </div>

                            <div className={s.group}>
                                <h3 className={s.groupTitle}>{t('cards')}</h3>

                                <div className={s.cardsStack}>
                                    <div className={s.blogCard}>
                                        <span className={s.blogCardDate}>{t('card-date')}</span>

                                        <h4 className={s.blogCardTitle}>{t('card-title')}</h4>

                                        <p className={s.blogCardDescription}>{t('card-description')}</p>
                                    </div>

                                    <div className={s.projectCard}>
                                        <Image
                                            className={s.projectCardImage}
                                            src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800&q=80"
                                            alt=""
                                            width={800}
                                            height={600}
                                        />

                                        <div className={s.projectCardBody}>
                                            <h4 className={s.projectCardTitle}>{t('project-title')}</h4>

                                            <p className={s.projectCardCategory}>{t('project-category')}</p>

                                            <span className={s.projectCardLink}>
                                                {t('view-case')} <span className={s.projectCardLinkArrow} aria-hidden>→</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={s.group}>
                                <h3 className={s.groupTitle}>{t('form-elements')}</h3>

                                <div className={s.formFields}>
                                    <div className={s.fieldWrapper}>
                                        <label className={s.fieldLabel}>{t('form-label')}</label>

                                        <input
                                            type="text"
                                            className={s.fieldInput}
                                            placeholder={t('form-placeholder')}
                                            readOnly
                                        />
                                    </div>

                                    <div className={s.fieldWrapper}>
                                        <label className={s.fieldLabel}>{t('form-message')}</label>

                                        <textarea
                                            className={s.fieldTextarea}
                                            placeholder={t('form-message-placeholder')}
                                            rows={4}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={s.group}>
                                <h3 className={s.groupTitle}>{t('note-entry')}</h3>

                                <div className={s.noteEntry}>
                                    <p className={s.noteQuote}>&ldquo;{t('note-quote')}&rdquo;</p>

                                    <div className={s.noteSeparator} />

                                    <p className={s.noteMeta}>{t('note-meta')}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
