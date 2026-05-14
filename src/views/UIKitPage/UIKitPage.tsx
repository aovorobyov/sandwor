import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import styles from './UIKitPage.module.css';

export async function UIKitPage() {
  const t = await getTranslations('uikit');

  return (
    <div className={styles.root}>
      {/* Header */}
      <section className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.description}>{t('description')}</p>
        </div>
      </section>

      {/* Components Grid */}
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* ─── Light Mode ──────────────────────────── */}
          <section className={styles.lightSection}>
            <div className={styles.sectionLabel}>
              <span className={styles.sectionLabelText}>{t('light-mode')}</span>
              <div className={styles.sectionLabelLine} />
            </div>

            <div className={styles.sectionContent}>
              {/* Buttons */}
              <div className={styles.group}>
                <h3 className={styles.groupTitle}>{t('buttons')}</h3>
                <div className={styles.row}>
                  <Button variant="primary">{t('btn-primary')}</Button>
                  <Button variant="secondary">{t('btn-secondary')}</Button>
                  <Button variant="ghost">{t('btn-ghost')}</Button>
                </div>
              </div>

              {/* Badges */}
              <div className={styles.group}>
                <h3 className={styles.groupTitle}>{t('badges')}</h3>
                <div className={styles.rowSmall}>
                  <Badge variant="neutral">{t('badge-neutral')}</Badge>
                  <Badge variant="accent">{t('badge-accent')}</Badge>
                </div>
              </div>

              {/* Cards */}
              <div className={styles.group}>
                <h3 className={styles.groupTitle}>{t('cards')}</h3>
                <div className={styles.cardsStack}>
                  {/* Blog Card */}
                  <div className={styles.blogCard}>
                    <span className={styles.blogCardDate}>{t('card-date')}</span>
                    <h4 className={styles.blogCardTitle}>{t('card-title')}</h4>
                    <p className={styles.blogCardDescription}>{t('card-description')}</p>
                  </div>

                  {/* Project Card */}
                  <div className={styles.projectCard}>
                    <Image
                      className={styles.projectCardImage}
                      src="https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=800&q=80"
                      alt=""
                      width={800}
                      height={600}
                    />
                    <div className={styles.projectCardBody}>
                      <h4 className={styles.projectCardTitle}>{t('project-title')}</h4>
                      <p className={styles.projectCardCategory}>{t('project-category')}</p>
                      <span className={styles.projectCardLink}>
                        {t('view-case')} <span aria-hidden>→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Elements */}
              <div className={styles.group}>
                <h3 className={styles.groupTitle}>{t('form-elements')}</h3>
                <div className={styles.formFields}>
                  <div className={styles.fieldWrapper}>
                    <label className={styles.fieldLabel}>{t('form-label')}</label>
                    <input
                      type="text"
                      className={styles.fieldInput}
                      placeholder={t('form-placeholder')}
                      readOnly
                    />
                  </div>
                  <div className={styles.fieldWrapper}>
                    <label className={styles.fieldLabel}>{t('form-message')}</label>
                    <textarea
                      className={styles.fieldTextarea}
                      placeholder={t('form-message-placeholder')}
                      rows={4}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Note Entry */}
              <div className={styles.group}>
                <h3 className={styles.groupTitle}>{t('note-entry')}</h3>
                <div className={styles.noteEntry}>
                  <p className={styles.noteQuote}>&ldquo;{t('note-quote')}&rdquo;</p>
                  <div className={styles.noteSeparator} />
                  <p className={styles.noteMeta}>{t('note-meta')}</p>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Dark Mode ───────────────────────────── */}
          <section className={styles.darkSection}>
            <div className={styles.sectionLabel}>
              <span className={styles.sectionLabelText}>{t('dark-mode')}</span>
              <div className={styles.sectionLabelLine} />
            </div>

            <div className={styles.sectionContent}>
              {/* Buttons */}
              <div className={styles.group}>
                <h3 className={styles.groupTitle}>{t('buttons')}</h3>
                <div className={styles.row}>
                  <Button variant="primary">{t('btn-primary')}</Button>
                  <Button variant="secondary">{t('btn-secondary')}</Button>
                  <Button variant="ghost">{t('btn-ghost')}</Button>
                </div>
              </div>

              {/* Badges */}
              <div className={styles.group}>
                <h3 className={styles.groupTitle}>{t('badges')}</h3>
                <div className={styles.rowSmall}>
                  <Badge variant="neutral">{t('badge-neutral')}</Badge>
                  <Badge variant="accent">{t('badge-accent')}</Badge>
                </div>
              </div>

              {/* Cards */}
              <div className={styles.group}>
                <h3 className={styles.groupTitle}>{t('cards')}</h3>
                <div className={styles.cardsStack}>
                  {/* Blog Card */}
                  <div className={styles.blogCard}>
                    <span className={styles.blogCardDate}>{t('card-date')}</span>
                    <h4 className={styles.blogCardTitle}>{t('card-title')}</h4>
                    <p className={styles.blogCardDescription}>{t('card-description')}</p>
                  </div>

                  {/* Project Card */}
                  <div className={styles.projectCard}>
                    <Image
                      className={styles.projectCardImage}
                      src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800&q=80"
                      alt=""
                      width={800}
                      height={600}
                    />
                    <div className={styles.projectCardBody}>
                      <h4 className={styles.projectCardTitle}>{t('project-title')}</h4>
                      <p className={styles.projectCardCategory}>{t('project-category')}</p>
                      <span className={styles.projectCardLink}>
                        {t('view-case')} <span aria-hidden>→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Elements */}
              <div className={styles.group}>
                <h3 className={styles.groupTitle}>{t('form-elements')}</h3>
                <div className={styles.formFields}>
                  <div className={styles.fieldWrapper}>
                    <label className={styles.fieldLabel}>{t('form-label')}</label>
                    <input
                      type="text"
                      className={styles.fieldInput}
                      placeholder={t('form-placeholder')}
                      readOnly
                    />
                  </div>
                  <div className={styles.fieldWrapper}>
                    <label className={styles.fieldLabel}>{t('form-message')}</label>
                    <textarea
                      className={styles.fieldTextarea}
                      placeholder={t('form-message-placeholder')}
                      rows={4}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Note Entry */}
              <div className={styles.group}>
                <h3 className={styles.groupTitle}>{t('note-entry')}</h3>
                <div className={styles.noteEntry}>
                  <p className={styles.noteQuote}>&ldquo;{t('note-quote')}&rdquo;</p>
                  <div className={styles.noteSeparator} />
                  <p className={styles.noteMeta}>{t('note-meta')}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
