import { getTranslations } from 'next-intl/server';
import { Icon } from '@sw/components/Icon';
import s from './HeroActivity.module.css';

interface Chip {
  id: 'speed' | 'smm' | 'ai';
  icon: string;
}

/** Плашки вокруг сайта: скорость, SMM и ИИ. */
const CHIPS: Chip[] = [
  { id: 'speed', icon: 'gauge' },
  { id: 'smm', icon: 'brand-telegram' },
  { id: 'ai', icon: 'sparkles' },
];

/** Уведомления о заявках приходят по очереди (CSS-цикл, без JS). */
const LEADS = [
  { id: 'brief', icon: 'inbox' },
  { id: 'chat', icon: 'message-circle' },
  { id: 'tg', icon: 'brand-telegram' },
] as const;

/** Колонки мини-воронки CRM; сделка переезжает слева направо. */
const STAGES = ['new', 'work', 'deal'] as const;

/**
 * Иллюстрация первого экрана главной: обобщённый сайт в окне браузера, вокруг —
 * то, что происходит с ним после запуска: заявки уходят в CRM, растёт скорость,
 * выходят посты, отвечает ИИ, копится аналитика. Не кейс и не данные клиента —
 * схема работы. Масштабируется по ширине контейнера (единица --u).
 */
export const HeroActivity = async () => {
  const t = await getTranslations('home.activity');

  return (
    <div className={s.root} role="img" aria-label={t('label')} data-hero-activity="">
      <div className={s.stage}>
        <svg
          className={s.links}
          viewBox="0 0 560 460"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <path d="M150 112 C 120 112, 110 80, 110 62" />
          <path d="M430 96 C 436 84, 440 72, 444 58" />
          <path d="M450 196 C 456 202, 460 208, 462 214" />
          <path d="M150 318 C 120 330, 110 340, 104 352" />
          <path d="M360 334 C 370 350, 380 362, 388 372" />
        </svg>

        <div className={s.site} aria-hidden="true">
          <div className={s.bar}>
            <span className={s.dots}>
              <i />
              <i />
              <i />
            </span>
            <span className={s.url}>{t('domain')}</span>
          </div>

          <div className={s.page}>
            <div className={s.nav}>
              <span className={s.logo} />
              <span className={s.navLinks}>
                <i />
                <i />
                <i />
              </span>
            </div>

            <div className={s.hero}>
              <span className={s.h1} />
              <span className={s.h1Short} />
              <span className={s.text} />
              <span className={s.text} style={{ width: '58%' }} />
              <span className={s.button} />
            </div>

            <div className={s.cards}>
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>

        {/* Заявки: три уведомления сменяют друг друга в одном месте. */}
        <div className={s.leads} aria-hidden="true">
          {LEADS.map((lead) => (
            <div key={lead.id} className={s.toast}>
              <span className={s.chipIcon}>
                <Icon name={lead.icon} size={16} />
              </span>
              <span className={s.chipBody}>
                <span className={s.chipTitle}>{t('lead.title')}</span>
                <span className={s.chipText}>{t(`lead.${lead.id}`)}</span>
              </span>
              <span className={s.time}>{t('lead.time')}</span>
            </div>
          ))}
        </div>

        {CHIPS.map((chip) => (
          <div key={chip.id} className={`${s.chip} ${s[chip.id]}`} aria-hidden="true">
            <span className={s.chipIcon}>
              <Icon name={chip.icon} size={16} />
            </span>

            <span className={s.chipBody}>
              <span className={s.chipTitle}>{t(`${chip.id}.title`)}</span>
              <span className={s.chipText}>{t(`${chip.id}.text`)}</span>
            </span>

            {chip.id === 'speed' && <span className={s.score}>{t('speed.value')}</span>}
          </div>
        ))}

        {/* Воронка CRM: сделка проходит этапы. */}
        <div className={s.board} aria-hidden="true">
          <span className={s.boardHead}>
            <Icon name="layout-kanban" size={14} />
            {t('crm.title')}
          </span>

          <div className={s.columns}>
            {STAGES.map((stage) => (
              <div key={stage} className={s.column}>
                <span className={s.columnName}>{t(`crm.${stage}`)}</span>
                <i className={s.ghost} />
              </div>
            ))}

            <span className={s.deal}>
              <b />
              <i />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
