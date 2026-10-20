import type * as React from 'react';

export type ServiceId = 'crm' | 'sites' | 'smm' | 'ai';

export interface LogoProps extends React.HTMLAttributes<HTMLElement> {
  /** Кегль в px: 18 — шапка сайта, 24 — футер, 40+ — обложки. Не меньше 16. */
  size?: number;
  /** Ссылка на главную: рендерит <a>. */
  href?: string;
  /** Одноцветный: точка в цвет текста (гравировка, печать в одну краску). */
  mono?: boolean;
}
export declare function Logo(props: LogoProps): React.ReactElement;

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /** Имя из набора: iconNames. Сервисы: layout-kanban (CRM), browser (Сайты), message-circle (SMM), cpu (ИИ). */
  name: string;
  /** Размер в px; без него иконка равна font-size родителя. */
  size?: number;
  /** Вращение — только для loader-2. */
  spin?: boolean;
  /** Текст для скринридера, если иконка несёт смысл без подписи. Без него иконка aria-hidden. */
  label?: string;
}
export declare function Icon(props: IconProps): React.ReactElement | null;
export declare const iconNames: string[];

export interface CanvasProps extends React.HTMLAttributes<HTMLElement> {
  /** Тег-обёртка, по умолчанию div. */
  as?: keyof JSX.IntrinsicElements;
  /** Граница line и радиус radius-lg. */
  bordered?: boolean;
  children?: React.ReactNode;
}
export declare function Canvas(props: CanvasProps): React.ReactElement;

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Полное имя: «Андрей Сомов». Из него берутся инициалы и подпись для скринридера. */
  name?: string;
  /** Инициалы вручную, если из имени получается не то: «АС». */
  initials?: string;
  /** Фото (на будущее). Квадрат, object-fit: cover. Если не загрузилось — показываются инициалы. */
  src?: string;
  /** Описание фото для скринридера; по умолчанию — name. */
  alt?: string;
  /** s = 28px (radius-md), m = 44px (по умолчанию), l = 72px. */
  size?: 's' | 'm' | 'l';
  /** default — surface-raised + line-strong; founder — accent-soft + accent-line + accent-text, только для основателя. */
  tone?: 'default' | 'founder';
  /** online — зелёная точка в правом нижнем углу, скринридер добавляет «в сети». */
  status?: 'online';
  /** Подпись статуса для скринридера. По умолчанию «в сети». */
  statusLabel?: string;
  /** На чём стоит аватар — этим цветом рисуется кольцо вокруг точки «в сети». По умолчанию surface. */
  ring?: 'surface' | 'bg';
  /** Имя уже написано рядом — аватар скрывается от скринридера (aria-hidden). */
  decorative?: boolean;
}
export declare function Avatar(props: AvatarProps): React.ReactElement;

export interface AvatarGroupPerson {
  id?: string;
  name: string;
  initials?: string;
  src?: string;
  alt?: string;
  tone?: 'default' | 'founder';
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Люди по порядку; основатель — первым. */
  people: AvatarGroupPerson[];
  /** Сколько плиток показать; остальные уходят в «+3». По умолчанию 4. */
  max?: number;
  /** Сколько всего людей, если в people передана только часть. */
  total?: number;
  /** Размер плиток, как у Avatar. Нахлёст −8px; у s — без нахлёста, зазор 4px. */
  size?: 's' | 'm' | 'l';
  /** Цвет кольца между плитками: bg (по умолчанию) или surface — если группа стоит на карточке. */
  ring?: 'bg' | 'surface';
  /** Подпись группы для скринридера: «Команда проекта». */
  label?: string;
  /** Подпись плитки «+N» для скринридера. По умолчанию n => `и ещё ${n}`. */
  moreLabel?: (n: number) => string;
}
export declare function AvatarGroup(props: AvatarGroupProps): React.ReactElement;

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** primary — главное действие (одно на экран); secondary — альтернатива; ghost — «Подробнее →»; quiet — служебное. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'quiet';
  /** s = 32px, m = 40px (по умолчанию), l = 48px. */
  size?: 's' | 'm' | 'l';
  /** Имя иконки слева (см. Icon). */
  icon?: string;
  /** Имя иконки справа; для ghost — 'arrow-right'. */
  iconEnd?: string;
  /** Кнопка-иконка без текста; обязательно передайте aria-label. */
  iconOnly?: boolean;
  /** Спиннер + loadingText, aria-busy. */
  loading?: boolean;
  loadingText?: string;
  /** На всю ширину контейнера. */
  block?: boolean;
  /** Если задан — рендерится <a href>. */
  href?: string;
  /** Атрибуты ссылки — уходят на <a>, когда задан href. [sandwor.ru] */
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): React.ReactElement;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * service — иконка + метка услуги из SERVICES; status — статус работы с глифом;
   * feature — янтарная метка на карточке («Чаще всего выбирают»); tag — нейтральный моно-тег;
   * count — янтарный счётчик. Без variant: есть service → service, есть tone → status, иначе tag.
   */
  variant?: 'service' | 'status' | 'feature' | 'tag' | 'count';
  /** Для variant="service": id услуги. Иконка и метка берутся из SERVICES. */
  service?: 'crm' | 'sites' | 'smm' | 'ai';
  /** Для variant="status": work — «В работе», ok — «Запущено», pause — «На паузе», new — «Новое» (по умолчанию). */
  tone?: 'work' | 'ok' | 'pause' | 'new';
  /** s = 20px, m = 24px (по умолчанию). Счётчик: m = 20px, s = 18px. */
  size?: 's' | 'm';
  /** Иконка слева (см. Icon). Для status заменяет глиф, для service — иконку услуги. */
  icon?: string;
  /** Для count: больше этого числа показывается «99+». По умолчанию 99. */
  max?: number;
  /** Текст для скринридера. Для count обязателен: «12 новых заявок». */
  label?: string;
  /** Текст бейджа. Для service и status необязателен — есть метка по умолчанию. Для count — число. */
  children?: React.ReactNode;
}
export declare function Badge(props: BadgeProps): React.ReactElement;

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'content'> {
  /** Текст подсказки: одна-две короткие фразы, без ссылок и кнопок. */
  content: React.ReactNode;
  /**
   * description (по умолчанию) — подсказка дополняет имя триггера (aria-describedby);
   * label — подсказка и есть имя кнопки-иконки (aria-labelledby), aria-label тогда не нужен.
   */
  type?: 'description' | 'label';
  /** Сторона: top (по умолчанию), bottom, left, right. У края экрана left/right переворачиваются, top/bottom сдвигаются. */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Задержка перед показом по наведению, мс. По умолчанию 300. Фокус с клавиатуры открывает сразу. */
  delay?: number;
  /** Управляемое состояние; open={true} держит подсказку открытой (для превью и онбординга). */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Не показывать подсказку. */
  disabled?: boolean;
  /** id пузыря; по умолчанию генерируется. */
  id?: string;
  /** Триггер — один элемент, который умеет получать фокус (кнопка, ссылка, TooltipInfo). Строка оборачивается в фокусируемый span с пунктиром. */
  children: React.ReactNode;
}
export declare function Tooltip(props: TooltipProps): React.ReactElement;

export interface TooltipInfoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Что объясняет подсказка, для скринридера: «Что такое сквозная аналитика». */
  label: string;
  /** Иконка; по умолчанию info-circle. */
  icon?: string;
}
/** Кнопка «i» 24×24 рядом с термином — триггер для Tooltip. */
export declare function TooltipInfo(props: TooltipInfoProps): React.ReactElement;

export type ToastTone = 'success' | 'error' | 'neutral';

export interface ToastAction {
  /** Глагол: «Повторить», «Отменить». */
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** success — circle-check success; error — alert-circle danger, role="alert"; neutral (по умолчанию) — info-circle text-secondary. */
  tone?: ToastTone;
  /** Что произошло: «Заявка отправлена». label 500 14/20. */
  title?: React.ReactNode;
  /** Что дальше: «Ответим в течение часа». body-s, text-secondary. */
  description?: React.ReactNode;
  /** Одно действие под текстом — маленькая ghost-кнопка. */
  action?: ToastAction;
  /** Показывает крестик и вызывается по нему, по Esc и по таймеру. */
  onClose?: () => void;
  /** aria-label крестика. По умолчанию «Закрыть». */
  closeLabel?: string;
  /** Автозакрытие, мс; 0 — не закрывать самому (по умолчанию для одиночного Toast). Наведение и фокус ставят таймер на паузу. */
  duration?: number;
  /** Внешняя пауза таймера (ToastProvider ставит её, пока курсор или фокус в стопке). */
  paused?: boolean;
  /** Анимация ухода; ставит ToastProvider. */
  leaving?: boolean;
  children?: React.ReactNode;
}
export declare function Toast(props: ToastProps): React.ReactElement;

export interface ToastViewportProps extends React.HTMLAttributes<HTMLDivElement> {
  /** position: absolute внутри ближайшего позиционированного родителя вместо fixed (превью, демо). */
  contained?: boolean;
  /** aria-label области. По умолчанию «Уведомления». */
  label?: string;
  children?: React.ReactNode;
}
/** Область-стопка: справа снизу, на мобильном — во всю ширину снизу. role="region", aria-live="polite". */
export declare function ToastViewport(props: ToastViewportProps): React.ReactElement;

export interface ToastProviderProps {
  children?: React.ReactNode;
  /** Автозакрытие по умолчанию, мс. 5000. */
  duration?: number;
  /** Сколько тостов видно одновременно; старые уходят. 3. */
  max?: number;
  /** Передаётся в ToastViewport. */
  contained?: boolean;
  label?: string;
}
/** Один раз у корня приложения; рендерит children и ToastViewport. */
export declare function ToastProvider(props: ToastProviderProps): React.ReactElement;

export interface ToastOptions {
  /** Свой id — повторный show с тем же id заменит тост, а не добавит второй. */
  id?: string;
  tone?: ToastTone;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Клик по действию вызывает onClick и закрывает тост. */
  action?: ToastAction;
  /** мс; 0 — не закрывать самому. По умолчанию — duration провайдера. */
  duration?: number;
  closeLabel?: string;
}
export interface ToastApi {
  /** Показать тост; возвращает id. */
  show(options: ToastOptions): string;
  /** Закрыть тост по id. */
  dismiss(id: string): void;
}
/** Доступ к тостам внутри ToastProvider. */
export declare function useToast(): ToastApi;

export interface TabsItem {
  /** Уникальный id вкладки: его получают value, onChange, panels и children(activeId). */
  id: string;
  /** Подпись: одно-два слова, с заглавной только первое («Все», «CRM», «Результаты»). */
  label: React.ReactNode;
  /** Счётчик справа от подписи, моноширинный (число кейсов, заявок). */
  count?: number | string;
  /** Иконка слева из набора Icon (например, SERVICES.crm.icon). */
  icon?: string;
  /** Недоступная вкладка: пропускается стрелками. */
  disabled?: boolean;
  /** Класс на кнопку вкладки (для превью состояний: is-hover, is-focus). */
  className?: string;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'children' | 'defaultValue'> {
  /** Вкладки по порядку. */
  items: TabsItem[];
  /** Активная вкладка (контролируемый режим). */
  value?: string;
  /** Активная вкладка при первом рендере; по умолчанию — первая доступная. */
  defaultValue?: string;
  /** Вызывается с id новой вкладки — по клику и стрелками. */
  onChange?: (id: string) => void;
  /** Панели по id вкладки. Неактивные остаются в DOM со скрытием (hidden). */
  panels?: Record<string, React.ReactNode>;
  /** Или функция, которая рисует панель активной вкладки. */
  children?: (activeId: string) => React.ReactNode;
  /** m = 40px (по умолчанию), s = 32px — для плотных карточек и тулбаров. */
  size?: 'm' | 's';
  /** Подпись списка для скринридера, например «Кейсы по услугам». */
  label?: string;
}

/** Табы с подчёркиванием: role=tablist, роуминг tabindex, ←/→/Home/End. */
export declare function Tabs(props: TabsProps): React.ReactElement;

export interface SegmentedControlOption {
  /** Значение варианта: его получают value и onChange. */
  value: string;
  /** Подпись: одно слово или короткая величина («Месяц», «6–20»). */
  label?: React.ReactNode;
  /** Иконка слева из набора Icon. */
  icon?: string;
  /** Подпись для скринридера — обязательна, если label не передан (только иконка). */
  ariaLabel?: string;
  /** Недоступный вариант. */
  disabled?: boolean;
  /** Класс на кнопку варианта (для превью состояний: is-hover, is-focus). */
  className?: string;
}

export interface SegmentedControlProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** 2–4 варианта. Больше — используйте Tabs или выпадающий список. */
  options: SegmentedControlOption[];
  /** Выбранное значение (контролируемый режим). */
  value?: string;
  /** Значение при первом рендере; по умолчанию — первый доступный вариант. */
  defaultValue?: string;
  /** Вызывается с новым значением — по клику и стрелками. */
  onChange?: (value: string) => void;
  /** m — трек 40px (control-m, в ряд с Button M), варианты 32px; s — трек 32px (control-s), варианты 24px. */
  size?: 'm' | 's';
  /** Подпись группы для скринридера: «Период», «Размер команды». */
  label?: string;
  /** Растянуть на всю ширину, варианты делят её поровну (мобильный). */
  block?: boolean;
  /** Отключить всю группу. */
  disabled?: boolean;
}

/** Сегментированный переключатель: role=radiogroup, одна остановка Tab, стрелки выбирают. */
export declare function SegmentedControl(props: SegmentedControlProps): React.ReactElement;

/** Пункт навигации шапки (тот же формат передаётся в MobileMenu). */
export interface SiteHeaderNavItem {
  /** «Услуги», «Кейсы», «Тарифы», «Команда», «Блог», «Контакты». */
  label: string;
  href?: string;
  /** Текущий раздел: цвет text, янтарная точка 4px под подписью, aria-current="page". */
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Для демо-состояний: 'is-hover', 'is-focus'. */
  className?: string;
}

/** Главное действие шапки — primary S. */
export interface SiteHeaderCta {
  /** «Обсудить проект». */
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

/** Необязательная кнопка-иконка перед CTA (quiet S), например Telegram. */
export interface SiteHeaderSecondary {
  /** Имя иконки: 'brand-telegram'. */
  icon: string;
  /** Имя ссылки и текст подсказки: «Написать в Telegram». */
  label: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface SiteHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Разделы сайта. Пустой список — без навигации и без бургера. */
  nav?: SiteHeaderNavItem[];
  /** Главная кнопка справа. */
  cta?: SiteHeaderCta;
  /** Кнопка-иконка перед CTA; скрывается уже 760px ширины шапки. */
  secondary?: SiteHeaderSecondary;
  /** position: sticky; top: 0. По умолчанию true. */
  sticky?: boolean;
  /**
   * Фон bg + backdrop-filter blur(12px) + линия line снизу.
   * undefined (по умолчанию) — следить за прокруткой окна самостоятельно (порог 4px).
   */
  scrolled?: boolean;
  /** Для превью: MobileMenu рендерится внутри ближайшего позиционированного родителя, окно не слушается. */
  contained?: boolean;
  /** Ссылка логотипа, по умолчанию «/». */
  logoHref?: string;
  /** Что ещё показать в мобильном меню. cta по умолчанию — тот же, что в шапке; null — без кнопки. */
  menu?: {
    services?: MobileMenuProps['services'];
    servicesTitle?: string;
    contacts?: MobileMenuProps['contacts'];
    cta?: MobileMenuProps['cta'] | null;
    /** aria-label крестика меню. [sandwor.ru] */
    closeLabel?: string;
    /** aria-label навигации меню. [sandwor.ru] */
    navLabel?: string;
    /** Имя диалога меню. [sandwor.ru] */
    label?: string;
  };
  /** Управляемое состояние мобильного меню. */
  menuOpen?: boolean;
  /** Начальное состояние меню без управления (превью). */
  defaultMenuOpen?: boolean;
  /** Вызывается при открытии меню бургером. */
  onMenuOpen?: () => void;
  /** Любая смена состояния меню. */
  onMenuOpenChange?: (open: boolean) => void;
  /** aria-label навигации, по умолчанию «Основная навигация». */
  navLabel?: string;
  /** aria-label бургера, по умолчанию «Открыть меню». */
  menuLabel?: string;
}
/** Шапка сайта: логотип, разделы, одна primary-кнопка; уже 880px — бургер и MobileMenu. */
export declare function SiteHeader(props: SiteHeaderProps): React.ReactElement;

/** Пункт навигации меню. */
export interface MobileMenuNavItem {
  /** Название раздела: «Услуги», «Кейсы». */
  label: string;
  href?: string;
  /** Текущий раздел: шеврон accent-text и aria-current="page". */
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Для демо-состояний: 'is-hover', 'is-focus'. */
  className?: string;
}

/** Строка группы «Услуги»: id из SERVICES или объект с подписью и ссылкой. */
export type MobileMenuService =
  | ServiceId
  | {
      id: ServiceId;
      /** Подпись; по умолчанию короткая из SERVICES («CRM»). Лучше полная: «Внедрение CRM». */
      label?: string;
      /** Без href строка не кликается. */
      href?: string;
      /** Иконка; по умолчанию из SERVICES. */
      icon?: string;
      onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
      className?: string;
    };

/** Контакт внизу меню: подпись и значение моноширинным. */
export interface MobileMenuContact {
  /** «Почта», «Telegram». */
  label: string;
  /** «hello@sandwor.ru», «@sandwor». */
  value: string;
  href?: string;
}

/** Главное действие меню — primary L на всю ширину. */
export interface MobileMenuCta {
  /** «Обсудить проект». */
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  icon?: string;
  iconEnd?: string;
}

export interface MobileMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Открыто ли меню. Компонент управляемый: без open ничего не рендерит. */
  open?: boolean;
  /** Закрыть: крестик, Esc, тап по scrim, переход по ссылке (см. closeOnNavigate). */
  onClose?: () => void;
  /** Разделы сайта — крупные ссылки Unbounded 20/25 с шевроном. */
  nav?: MobileMenuNavItem[];
  /** Необязательная группа «Услуги» — строки с иконкой в плитке. */
  services?: MobileMenuService[];
  /** Подпись группы услуг, по умолчанию «Услуги». */
  servicesTitle?: string;
  /** Кнопка, прижатая к низу экрана. */
  cta?: MobileMenuCta;
  /** Контакты под кнопкой, Fira Code. */
  contacts?: MobileMenuContact[];
  /** Ссылка логотипа, по умолчанию «/». */
  logoHref?: string;
  /** Рендерить position:absolute внутри ближайшего позиционированного родителя (превью), без блокировки прокрутки body. */
  contained?: boolean;
  /** Закрывать меню после клика по ссылке (если обработчик не вызвал preventDefault). По умолчанию true. */
  closeOnNavigate?: boolean;
  /** Колбэк перехода по пункту nav или услуге. */
  onNavigate?: (item: MobileMenuNavItem | Exclude<MobileMenuService, ServiceId>, e: React.MouseEvent) => void;
  /** aria-label крестика, по умолчанию «Закрыть меню». */
  closeLabel?: string;
  /** aria-label навигации, по умолчанию «Разделы сайта». */
  navLabel?: string;
  /** Имя диалога, по умолчанию «Меню». */
  'aria-label'?: string;
}
/** Полноэкранное мобильное меню: role="dialog", ловушка фокуса, Esc закрывает, фокус возвращается. */
export declare function MobileMenu(props: MobileMenuProps): React.ReactElement | null;

export interface BreadcrumbsItem {
  /** Название раздела так, как оно написано в меню: «Главная», «Кейсы», «Кедр». */
  label: React.ReactNode;
  /** Ссылка на раздел. У последнего пункта (текущая страница) игнорируется. Без href пункт — просто текст. */
  href?: string;
  /** Класс на пункт (для превью состояний: is-hover, is-focus). */
  className?: string;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  /** Путь от главной до текущей страницы; последний пункт — текущая страница. */
  items: BreadcrumbsItem[];
  /** Подпись навигации для скринридера. По умолчанию «Навигационная цепочка». */
  label?: string;
  /**
   * Сворачивание середины в «…», когда пунктов больше трёх:
   * auto — только на экранах до 760px (по умолчанию), always — всегда, never — никогда.
   */
  collapse?: 'auto' | 'always' | 'never';
  /** Подпись кнопки «…» для скринридера. По умолчанию «Показать весь путь». */
  expandLabel?: string;
  /** Компонент ссылки вместо <a>, например Link из next/link. Получает href и className. */
  linkAs?: React.ElementType;
}

/** Хлебные крошки: nav > ol, шеврон-разделители, текущая страница с aria-current="page". */
export declare function Breadcrumbs(props: BreadcrumbsProps): React.ReactElement;

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Текущая страница, с 1 (контролируемый режим). */
  page?: number;
  /** Страница при первом рендере (неконтролируемый режим). По умолчанию 1. */
  defaultPage?: number;
  /** Всего страниц. */
  total: number;
  /** Вызывается с номером новой страницы. */
  onChange?: (page: number) => void;
  /** Сколько соседних страниц показывать вокруг текущей. По умолчанию 1: «1 … 4 5 6 … 12». */
  siblings?: number;
  /** Адрес страницы — тогда номера и стрелки рендерятся ссылками <a href> (для SEO и открытия в новой вкладке). */
  getHref?: (page: number) => string;
  /** Всегда компактный вид «3 из 8» — для узких колонок. На экранах до 760px он включается сам. */
  compact?: boolean;
  /** Подпись навигации для скринридера. По умолчанию «Страницы». */
  label?: string;
  /** По умолчанию «Предыдущая страница». */
  prevLabel?: string;
  /** По умолчанию «Следующая страница». */
  nextLabel?: string;
}

/** Постраничная навигация: стрелки, номера с «…», текущая страница с aria-current="page". */
export declare function Pagination(props: PaginationProps): React.ReactElement;

export interface LoadMoreProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Сколько элементов уже показано. */
  shown: number;
  /** Сколько всего. Когда shown ≥ total, кнопка скрывается, остаётся подпись. */
  total: number;
  /** Загрузить следующую порцию. Во время loading повторные нажатия игнорируются. */
  onLoadMore?: () => void;
  /** Идёт загрузка: спиннер и loadingText в кнопке, aria-busy. */
  loading?: boolean;
  /** Текст кнопки с числом и существительным: «Показать ещё 6 кейсов». По умолчанию «Показать ещё». */
  label?: React.ReactNode;
  /** Текст кнопки во время загрузки. По умолчанию «Загружаем…». */
  loadingText?: string;
  /** Подпись под кнопкой; по умолчанию «Показано 6 из 24». */
  caption?: React.ReactNode;
}

/** «Показать ещё»: secondary-кнопка на всю ширину (до 360px на десктопе) и моно-счётчик под ней. */
export declare function LoadMore(props: LoadMoreProps): React.ReactElement;

/** Колонка ссылок. */
export interface FooterColumn {
  /** Подпись mono-s: «Услуги», «Компания». */
  title: string;
  links: { label: string; href?: string; className?: string }[];
}

/** Контакт в колонке «Связаться». */
export interface FooterContact {
  /** «Почта», «Telegram». */
  label: string;
  /** «hello@sandwor.ru», «@sandwor» — Fira Code 13. */
  value: string;
  href?: string;
}

/** Соцсеть — secondary кнопка-иконка S с подсказкой. */
export interface FooterSocial {
  /** 'brand-telegram', 'brand-vk', 'brand-github'. */
  icon: string;
  /** Имя ссылки и текст подсказки: «Telegram», «ВКонтакте». */
  label: string;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
}

/** CTA-полоса над футером: панель на канве. */
export interface FooterCta {
  /** heading-1: «Обсудим ваш проект». */
  title: React.ReactNode;
  /** body-s, одна-две строки: «Ответим в течение часа в рабочее время». */
  text?: React.ReactNode;
  /** Кнопка primary L из { label, href, onClick } или свой элемент. */
  action?: { label: string; href?: string; onClick?: (e: React.MouseEvent<HTMLElement>) => void; iconEnd?: string } | React.ReactElement;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Колонки ссылок (обычно две: «Услуги», «Компания»); третья колонка — contacts. */
  columns?: FooterColumn[];
  /** Контакты — последняя колонка. */
  contacts?: FooterContact[];
  /** Заголовок колонки контактов, по умолчанию «Связаться». */
  contactsTitle?: string;
  /** Соцсети под слоганом. */
  socials?: FooterSocial[];
  /** Слоган под логотипом, body-s, до 32ch. */
  tagline?: React.ReactNode;
  /** Левая часть нижней строки; по умолчанию «© 2026 sandwor». */
  legal?: React.ReactNode;
  /** Ссылки справа в нижней строке: «Политика конфиденциальности». */
  legalLinks?: { label: string; href?: string }[];
  /** Необязательная CTA-полоса сверху. */
  cta?: FooterCta;
  /** Ссылка логотипа, по умолчанию «/». */
  logoHref?: string;
}
/** Подвал сайта: CTA-полоса, логотип со слоганом и соцсетями, колонки ссылок, юридическая строка. */
export declare function Footer(props: FooterProps): React.ReactElement;

export interface TextFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'size' | 'value' | 'defaultValue' | 'onChange'
  > {
  /** Подпись над полем (label-s, text-secondary): «Как вас зовут». Без неё передайте aria-label. */
  label?: React.ReactNode;
  /** Подсказка под полем (text-muted). Скрывается, пока показана ошибка. */
  hint?: React.ReactNode;
  /** Ошибка: строка — красная рамка, текст danger с иконкой alert-circle, aria-invalid; true — только рамка. */
  error?: React.ReactNode | boolean;
  /** Пометка «необязательно» справа от подписи (mono-xs, text-muted). Обязательные поля не помечаются. */
  optional?: boolean;
  /** Текст пометки, по умолчанию «необязательно». */
  optionalLabel?: string;
  /** Иконка слева в поле (имя из Icon), например 'search'. Только для однострочного поля. */
  icon?: string;
  /** Единица справа в поле: «₽», «шт.». Только для однострочного поля; озвучивается через aria-describedby. */
  suffix?: React.ReactNode;
  /** m = 40px (по умолчанию), l = 48px. */
  size?: 'm' | 'l';
  /** Многострочное поле: <textarea>, растёт по содержимому, минимум 96px, максимум 320px. */
  multiline?: boolean;
  /** Начальное число строк textarea, по умолчанию 3. */
  rows?: number;
  /** Лимит символов; в multiline показывает счётчик «120 / 500». */
  maxLength?: number;
  disabled?: boolean;
  /** Только чтение: без подложки, рамка line-strong, текст можно выделить и скопировать. */
  readOnly?: boolean;
  /** id поля; по умолчанию генерируется через useId. */
  id?: string;
  /** Контролируемое значение. Без него поле неконтролируемое (defaultValue). */
  value?: string;
  defaultValue?: string;
  /** Нативное событие: значение — event.target.value. */
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** Ref на нативный <input>/<textarea> (для фокуса и библиотек форм). */
  inputRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
  /** Класс обёртки; is-hover / is-focus — статичные состояния для превью. */
  className?: string;
  /** Стиль обёртки. */
  style?: React.CSSProperties;
}
/** Поле ввода с подписью, подсказкой или ошибкой. className/style — на обёртку, остальные пропсы — на <input>/<textarea>. */
export declare function TextField(props: TextFieldProps): React.ReactElement;

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Текст рядом с флажком (body 15/23): «Удобнее в Telegram». Можно передать children. */
  label?: React.ReactNode;
  /** Пояснение под текстом (body-s, text-secondary): «Позвоним в удобное время, 15 минут». */
  description?: React.ReactNode;
  /** Частично выбрано: янтарная заливка и минус. Для родителя, у которого отмечена часть дочерних. */
  indeterminate?: boolean;
  /** Ошибка: строка — красная рамка и текст под подписью; true — только рамка. */
  error?: React.ReactNode | boolean;
  /** checked + onChange — контролируемый, defaultChecked — неконтролируемый. onChange нативный: event.target.checked. */
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  /** id инпута; по умолчанию useId. */
  id?: string;
  /** Ref на нативный <input>. */
  inputRef?: React.Ref<HTMLInputElement>;
  /** Класс корневого <label>; is-hover / is-focus — статичные состояния для превью. */
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
export interface RadioProps extends Omit<CheckboxProps, 'indeterminate'> {
  /** Общее имя для всех радиокнопок набора — обязательно. */
  name?: string;
  /** Значение, которое уйдёт в форму. */
  value?: string;
}
/** Флажок: независимое «да/нет». className/style — на <label>, остальные пропсы — на <input type="checkbox">. */
export declare function Checkbox(props: CheckboxProps): React.ReactElement;
/** Радиокнопка: один вариант из нескольких. Набор оборачивайте в <fieldset> + <legend>. */
export declare function Radio(props: RadioProps): React.ReactElement;

export interface ChipGroupOption {
  /** Значение, которое вернёт onChange и уйдёт в форму. */
  value: string;
  /** Текст чипа: «до 100 тыс.». Для service по умолчанию — метка из SERVICES. */
  label?: React.ReactNode;
  /** Иконка слева (имя из Icon). При выборе её место занимает галочка. */
  icon?: string;
  /** Услуга: иконка и метка из SERVICES (crm, sites, smm, ai). */
  service?: ServiceId;
  disabled?: boolean;
  /** Класс чипа; is-hover / is-focus / is-pressed — статичные состояния для превью. */
  className?: string;
}
export interface ChipGroupBaseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Варианты по порядку показа. */
  options: ChipGroupOption[];
  /** s = 28px (плотные фильтры, мобильные формы), m = 32px (по умолчанию). */
  size?: 's' | 'm';
  /** Название группы для скринридера (aria-label): «Что нужно». Видимую подпись свяжите через aria-labelledby. */
  label?: string;
  /** Имя поля формы: выбранные значения уходят скрытыми <input> (для нативного submit и server actions). */
  name?: string;
  /** Отключить всю группу. */
  disabled?: boolean;
  /** Ошибка: строка — красная граница у невыбранных чипов и сообщение с alert-circle сразу после группы (role="alert", связано через aria-describedby); true — только граница. */
  error?: React.ReactNode | boolean;
  /** Ref на корневой div группы — например, чтобы перевести фокус на первый чип: `groupRef.current.querySelector('button')`. */
  groupRef?: React.Ref<HTMLDivElement>;
}
export interface ChipGroupSingleProps extends ChipGroupBaseProps {
  /** Один вариант (по умолчанию): role="radiogroup", стрелки переключают выбор. */
  multiple?: false;
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string) => void;
}
export interface ChipGroupMultipleProps extends ChipGroupBaseProps {
  /** Несколько вариантов: role="group", каждый чип — кнопка с aria-pressed. */
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  /** Выбранные значения в порядке options. */
  onChange?: (value: string[]) => void;
}
export type ChipGroupProps = ChipGroupSingleProps | ChipGroupMultipleProps;
/** Группа выбираемых чипов: один вариант (radiogroup) или несколько (кнопки aria-pressed). */
export declare function ChipGroup(props: ChipGroupProps): React.ReactElement;

export interface SliderMark {
  value: number;
  /** Подпись деления (mono-xs); по умолчанию число с разрядами. */
  label?: React.ReactNode;
}
export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue' | 'onChange' | 'min' | 'max' | 'step'> {
  /** Подпись слева над шкалой (label-s): «Менеджеров в отделе продаж». Без неё передайте aria-label. */
  label?: React.ReactNode;
  /** Контролируемое значение. Без него — неконтролируемый слайдер (defaultValue, по умолчанию min). */
  value?: number;
  defaultValue?: number;
  /** Новое значение числом и нативное событие. */
  onChange?: (value: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Значение → строка для табло справа и aria-valuetext: v => v + ' менеджеров'. По умолчанию formatNumber. */
  format?: (value: number) => string;
  /** Деления под шкалой с подписями mono-xs. Если заданы, заменяют подписи min/max. */
  marks?: Array<number | SliderMark>;
  /** Подписи краёв шкалы вместо чисел min/max. */
  minLabel?: React.ReactNode;
  maxLabel?: React.ReactNode;
  disabled?: boolean;
  /** id инпута; по умолчанию useId. */
  id?: string;
  /** Ref на нативный <input type="range">. */
  inputRef?: React.Ref<HTMLInputElement>;
  /** Класс обёртки; is-hover / is-focus — статичные состояния для превью. */
  className?: string;
  /** Стиль обёртки; --sw-slider-ring задаёт цвет кольца бегунка (по умолчанию bg). */
  style?: React.CSSProperties;
}
/** Слайдер на нативном range: клавиатура и скринридер работают как в браузере. */
export declare function Slider(props: SliderProps): React.ReactElement;

/** Услуга калькулятора — те же id, что в SERVICES. */
export type CalculatorService = 'crm' | 'sites' | 'smm' | 'ai';

export interface CalculatorValue {
  /** Выбранные услуги в порядке crm → sites → smm → ai. Пустой массив — «ничего не выбрано». */
  services: CalculatorService[];
  /** Менеджеров в CRM, 1–50 (по умолчанию 8). Учитывается только с crm. */
  managers: number;
  /** value выбранных интеграций: 'forms' | 'telephony' | 'erp' (или ваши из integrations). Только с crm. */
  integrations: string[];
  /** Срок ведения SMM в месяцах. Только со smm. */
  months: '1' | '3' | '6';
}

export interface CalculatorLine {
  key: string;
  /** «Внедрение CRM», «Формы сайта и квизы». */
  label: string;
  /** Уточнение после «·»: «8 менеджеров», «3 месяца». */
  meta?: string;
  /** Сумма строки в рублях. */
  value: number;
  /** Вложенная строка (интеграция CRM). */
  sub?: boolean;
}

export interface CalculatorEstimate {
  /** Итог в рублях (показывается как «от 49 500 ₽»). */
  total: number;
  /** «7–10 дней»; для нескольких услуг — самый долгий срок с «≈». null, если ничего не выбрано. */
  term: string | null;
  lines: CalculatorLine[];
  services: CalculatorService[];
}

export interface CalculatorPrices {
  /** База CRM, по умолчанию 45 000. */
  crmBase?: number;
  /** За каждого менеджера сверх crmIncluded, по умолчанию 1 500. */
  crmPerManager?: number;
  /** Менеджеров в базе, по умолчанию 5. */
  crmIncluded?: number;
  /** Сайт, по умолчанию 60 000. */
  sites?: number;
  /** SMM за месяц, по умолчанию 35 000. */
  smmMonth?: number;
  /** ИИ, по умолчанию 30 000. */
  ai?: number;
}

export interface CalculatorIntegration {
  value: string;
  /** «IP-телефония». */
  label: string;
  /** Надбавка в рублях: 12000. */
  price: number;
}

export interface CalculatorCopy {
  services?: string;
  servicesHint?: string;
  managers?: string;
  integrations?: string;
  months?: string;
  /** Подпись панели итога, по умолчанию «Предварительная оценка». */
  caption?: string;
  from?: string;
  term?: string;
  approx?: string;
  /** Текст кнопки, по умолчанию «Обсудить расчёт». */
  cta?: string;
  /** Строка под кнопкой, по умолчанию «Точная цена — после бесплатного аудита». */
  note?: string;
  /** Текст панели, когда ничего не выбрано. */
  empty?: string;
  /** Итог для скринридера, когда ничего не выбрано. */
  emptyTotal?: string;
  /** Названия строк расшифровки по услугам. */
  lines?: Partial<Record<CalculatorService, string>>;
  /** Подписи чипов услуг вместо меток из SERVICES. [sandwor.ru] */
  serviceLabels?: Partial<Record<CalculatorService, string>>;
  /** «8 менеджеров» — табло слайдера и строка расшифровки. [sandwor.ru] */
  managersText?: (n: number) => string;
  /** «3 месяца» — варианты срока SMM и строка расшифровки. [sandwor.ru] */
  monthsText?: (n: string | number) => string;
  /** Подсказка под слайдером менеджеров. [sandwor.ru] */
  managersHint?: (included: number, perManager: number) => string;
  /** «35 000 ₽ в месяц» рядом со сроком SMM. [sandwor.ru] */
  perMonth?: (price: number) => string;
}

export interface CalculatorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Контролируемое значение (частичное — недостающее берётся из значений по умолчанию). */
  value?: Partial<CalculatorValue>;
  /** Начальное значение; по умолчанию { services: ['crm'], managers: 8, integrations: [], months: '3' }. */
  defaultValue?: Partial<CalculatorValue>;
  /** Любое изменение: новое значение и пересчитанная оценка. */
  onChange?: (value: CalculatorValue, estimate: CalculatorEstimate) => void;
  /** Клик по «Обсудить расчёт» — например, открыть бриф с выбранными услугами. */
  onCta?: (estimate: CalculatorEstimate, value: CalculatorValue) => void;
  /** Ссылка для кнопки вместо onCta (рендерится <a>). */
  ctaHref?: string;
  /** Переопределить цены. */
  prices?: CalculatorPrices;
  /** Список интеграций CRM; по умолчанию формы и квизы +8 000, IP-телефония +12 000, 1С и склад +18 000. */
  integrations?: CalculatorIntegration[];
  /** Сроки запуска по услугам: { crm: { text: '7–10 дней', days: 10 } }; days — только для сравнения. */
  terms?: Partial<Record<CalculatorService, { text: string; days: number }>>;
  /** Тексты интерфейса. */
  copy?: CalculatorCopy;
  /** Панель итога липнет к верху при прокрутке (desktop). Отступ сверху — CSS-переменная --sw-calc-sticky-top. По умолчанию true. */
  sticky?: boolean;
  className?: string;
}

/** Калькулятор стоимости: слева параметры, справа липкая панель с итогом «от 49 500 ₽», сроком и расшифровкой. */
export declare function Calculator(props: CalculatorProps): React.ReactElement;

export interface BriefFormValues {
  /** Шаг 1 — услуги (id из SERVICES: crm, sites, smm, ai). Обязательно хотя бы одна. */
  services: string[];
  /** Шаг 2 — «Компания», необязательно. */
  company: string;
  /** Шаг 2 — «Сколько человек в продажах»: '1-5' | '6-20' | '20+'; null — не выбрано. */
  teamSize: string | null;
  /** Шаг 3 — «Коротко о задаче», до 500 символов. */
  task: string;
  /** Шаг 3 — «Бюджет»: 'lt100' | '100-300' | 'gt300' | 'unknown'; null — не выбрано. */
  budget: string | null;
  /** Шаг 4 — «Как вас зовут», обязательно. */
  name: string;
  /** Шаг 4 — «Телефон или Telegram», обязательно: не меньше 10 цифр или ник (@kedr_mebel, t.me/…). */
  contact: string;
  /** Шаг 4 — «Удобнее в Telegram». */
  telegram: boolean;
  /** Шаг 4 — согласие на обработку ПД; есть, только если передан проп consent. [sandwor.ru] */
  consent?: boolean;
}

export interface BriefFormResult {
  /** Номер заявки для экрана успеха: «Номер заявки #1284». */
  number?: string | number;
  id?: string | number;
}

export interface BriefFormOption {
  value: string;
  label?: React.ReactNode;
  icon?: string;
  /** Для услуг: иконка и подпись из SERVICES. */
  service?: 'crm' | 'sites' | 'smm' | 'ai';
}

export interface BriefFormCopy {
  /** Названия четырёх шагов: «Что нужно», «О компании», «Задача», «Контакты». */
  steps?: [string, string, string, string];
  /** «Шаг 2 из 4». */
  stepOf?: (n: number, total: number) => string;
  stepsLabel?: string;
  stepDone?: string;
  servicesHint?: string;
  company?: string;
  companyPlaceholder?: string;
  teamSize?: string;
  task?: string;
  taskPlaceholder?: string;
  budget?: string;
  name?: string;
  namePlaceholder?: string;
  contact?: string;
  contactPlaceholder?: string;
  telegram?: string;
  back?: string;
  next?: string;
  submit?: string;
  sending?: string;
  /** Мелкий текст под кнопкой на последнем шаге (можно со ссылкой). [sandwor.ru: ReactNode] */
  fine?: React.ReactNode;
  errServices?: string;
  errName?: string;
  /** По умолчанию «Укажите телефон или ник в Telegram». */
  errContact?: string;
  /** Ошибка, если не отмечено согласие (при пропе consent). [sandwor.ru] */
  errConsent?: string;
  /** [sandwor.ru] Подпись необязательного поля, по умолчанию «необязательно». */
  optional?: string;
  /** Ошибка отправки (onSubmit отклонил промис). */
  errSubmit?: string;
  successTitle?: string;
  /** Текст успеха по значениям: «Андрей, ответим в Telegram в течение часа.» */
  successText?: (values: BriefFormValues) => string;
  successNumber?: (n: string | number) => string;
  successAction?: string;
}

export interface BriefFormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** Отправка: вернуть промис. Пока он не выполнен, кнопка показывает «Отправляем…»; resolve → экран успеха, reject → ошибка над кнопками. */
  onSubmit?: (values: BriefFormValues) => Promise<BriefFormResult | void> | BriefFormResult | void;
  /** «Вернуться на сайт» на экране успеха. Без onReturn и returnHref кнопка начинает бриф заново. */
  onReturn?: () => void;
  /** Ссылка для «Вернуться на сайт» (рендерится <a>). */
  returnHref?: string;
  /** С какого шага начать, 1–4 (по умолчанию 1). */
  initialStep?: number;
  /** Начальные значения — например, услуги из калькулятора. */
  initialValues?: Partial<BriefFormValues>;
  /** 'success' — сразу экран успеха (для превью и после перезагрузки). */
  initialState?: 'form' | 'success';
  /** Сразу проверить начальный шаг и показать ошибки (для превью состояний). */
  validateOnMount?: boolean;
  /** Номер заявки, если onSubmit его не вернул. */
  requestNumber?: string | number;
  /** card — surface, рамка line, radius-lg, отступ 24px; bare — без подложки (внутри Modal). */
  container?: 'card' | 'bare';
  /** Уровень заголовка шага, по умолчанию 2 (h2). В модальном окне с заголовком — 3. */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Варианты «Что нужно»; по умолчанию CRM, Сайт, SMM, ИИ. */
  services?: BriefFormOption[];
  /** Варианты «Сколько человек в продажах»; по умолчанию 1–5, 6–20, 20+. */
  teamOptions?: BriefFormOption[];
  /** Варианты «Бюджет»; по умолчанию «до 100 тыс.», «100–300 тыс.», «300 тыс. и больше», «Пока не знаю». */
  budgetOptions?: BriefFormOption[];
  /** Тексты интерфейса. */
  copy?: BriefFormCopy;
  /**
   * Подпись обязательного чекбокса согласия на обработку ПД на шаге «Контакты»
   * (не отмечен заранее; без него заявка не уходит). Не передан — чекбокса нет. [sandwor.ru]
   */
  consent?: React.ReactNode;
  className?: string;
}

/** Бриф в четыре шага со степпером, проверкой на «Дальше», отправкой через промис и экраном успеха. */
export declare function BriefForm(props: BriefFormProps): React.ReactElement;

export interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Открыто ли окно. Компонент контролируемый: закрывайте его сами в onClose. */
  open?: boolean;
  /** Просьба закрыть: Esc, клик по фону, кнопка «Закрыть». Поставьте open = false. */
  onClose?: () => void;
  /** Заголовок (heading-2, Unbounded 600 20/25): «Обсудим ваш проект». Связан с диалогом через aria-labelledby. */
  title?: React.ReactNode;
  /** Подзаголовок (body-s, text-secondary): «Ответим в течение часа в рабочее время». Связан через aria-describedby. */
  description?: React.ReactNode;
  /** Иконка над заголовком (имя из Icon) в плитке 40px: 'circle-check' для «Заявка отправлена». */
  icon?: string;
  /** Тон плитки иконки: neutral (по умолчанию), success, accent, danger. */
  iconTone?: 'neutral' | 'success' | 'accent' | 'danger';
  /** Тело окна: поля формы, текст. Отступы 24px (на мобильном 16/20px), прокручивается само. */
  children?: React.ReactNode;
  /** Действия справа, главное — последним: [«Отмена» quiet, «Отправить заявку» primary]. На мобильном — столбиком, главное сверху. */
  footer?: React.ReactNode;
  /** Мелкий текст под действиями (caption, text-muted): согласие на обработку данных. */
  finePrint?: React.ReactNode;
  /** Ширина: s = 400px, m = 480px (по умолчанию), l = 640px. До 760px — нижний лист на всю ширину. */
  size?: 's' | 'm' | 'l';
  /** Закрывать кликом по фону. По умолчанию true; false — для форм, где жалко потерять введённое. */
  closeOnScrim?: boolean;
  /** Закрывать по Esc. По умолчанию true. */
  closeOnEsc?: boolean;
  /** Внутри ближайшего позиционированного родителя (position: absolute) вместо всей страницы — для превью и демо. Без блокировки прокрутки. */
  contained?: boolean;
  /** Что получит фокус при открытии. По умолчанию — первое поле в теле окна, иначе само окно. */
  initialFocus?: React.RefObject<HTMLElement | null>;
  /** Подпись кнопки-крестика для скринридера и подсказки. По умолчанию «Закрыть». */
  closeLabel?: string;
  /** Спрятать крестик (только если в footer есть явное «Закрыть» или «Отмена»). */
  hideClose?: boolean;
  /** aria-label диалога, если title не передан. */
  label?: string;
}
/** Модальное окно: заголовок, тело, действия; ловушка фокуса, Esc, возврат фокуса, нижний лист на мобильном. */
export declare function Modal(props: ModalProps): React.ReactElement | null;

export interface ServiceCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Id услуги: иконка в плитке и моно-метка («CRM», «Сайты», «SMM», «ИИ») берутся из SERVICES. */
  service: 'crm' | 'sites' | 'smm' | 'ai';
  /** Моно-метка услуги вместо метки из SERVICES (другой язык). [sandwor.ru] */
  label?: string;
  /** Метка справа в шапке карточки — например, Badge «Скоро». [sandwor.ru] */
  badge?: React.ReactNode;
  /** Заголовок карточки: «Внедрение CRM». */
  title: React.ReactNode;
  /** Одно-два предложения о пользе: «Настраиваем amoCRM и Битрикс24 под ваш отдел продаж…». */
  text?: React.ReactNode;
  /** Что входит — 3–4 коротких пункта с галочкой. В варианте compact не показываются. */
  includes?: React.ReactNode[];
  /** Цена «от»: число → «от 45 000 ₽» (formatRub). Строку выводит как есть. */
  price?: number | string;
  /** Хвост цены: «в месяц». */
  priceSuffix?: string;
  /** Срок: «от 7 дней». */
  term?: React.ReactNode;
  /** Ссылка на страницу услуги. Если задана — кликабельна вся карточка, в подвале появляется «Подробнее →». */
  href?: string;
  /** default — с составом и «Подробнее»; compact — без состава, заголовок heading-3, для сетки 4 в ряд. */
  variant?: 'default' | 'compact';
  /** Текст ghost-подписи в подвале. По умолчанию «Подробнее». */
  moreLabel?: string;
  /** Подпись срока для скринридера. По умолчанию «Срок». */
  termLabel?: string;
  /** Уровень заголовка (2–6). По умолчанию 3. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  /** Компонент ссылки вместо <a> — например, Link из next/link. */
  linkAs?: React.ElementType;
  /** Доп. атрибуты ссылки (prefetch, target, aria-label…). */
  linkProps?: Record<string, unknown>;
}
export declare function ServiceCard(props: ServiceCardProps): React.ReactElement;

/** Результат кейса: крупное моно-число и подпись. */
export interface CaseCardMetric {
  /** Значение: «+38%», «2 мин», «7 недель». Единица после пробела рисуется мельче. */
  value: React.ReactNode;
  /** Своя единица, если не хотите, чтобы её отделяли от value автоматически. */
  unit?: string;
  /** Подпись: «конверсия в сделку». */
  label: React.ReactNode;
}

/** Данные обложки 'scheme': источники → хаб CRM с ботом и прогрессом этапов. */
export interface CaseCardSchemeData {
  /** Моно-подпись сверху, по умолчанию «схема внедрения». */
  caption?: string;
  /** Чипы-источники: [{ icon: 'browser', label: 'Сайт' }, …]. 2–4 штуки. */
  sources?: { icon?: string; label: string }[];
  /** Хаб: { icon: 'layout-kanban', title: 'amoCRM', meta: 'воронка · 6 этапов' }. */
  hub?: { icon?: string; title: string; meta?: string };
  /** Строка бота внутри хаба: { icon: 'cpu', label: 'Бот-квалификатор' }; null — без неё. */
  bot?: { icon?: string; label: string } | null;
  /** Число этапов воронки, по умолчанию 6. */
  steps?: number;
  /** Текущий этап (с нуля), по умолчанию 3. */
  step?: number;
  /** Подписи концов прогресса: ['заявка', 'сделка']. */
  stepLabels?: [string, string] | null;
  /** Легенда внизу: ['поток заявок', 'пройденный этап']; null — без легенды. */
  legend?: [string, string] | null;
}

/** Данные обложки 'funnel': панель воронки CRM + плавающий чип бота. */
export interface CaseCardFunnelData {
  /** Заголовок панели: «Воронка · 6 этапов». */
  title?: string;
  /** Моно-метка справа: «amoCRM». */
  system?: string;
  /** Этапы с долей 0–100. Последний этап — янтарный. */
  rows?: { label: string; value: number }[];
  /** Итог под панелью: { label: 'Конверсия в сделку', from: '20%', to: '28%' }. */
  summary?: { label: string; from: string; to: string } | null;
  /** Чип бота: { icon: 'robot', title: 'Бот-квалификатор', text: 'Тёплый лид → менеджеру', meta: '2 мин' }. */
  chip?: { icon?: string; title: string; text?: string; meta?: string } | null;
}

/** Данные обложки 'report': большое число + каналы с полосками. */
export interface CaseCardReportData {
  icon?: string;
  /** Заголовок полосы: «Сквозная аналитика». */
  title?: string;
  /** Моно-период справа: «март». */
  period?: string;
  /** Большое число Unbounded: «124». */
  total?: string;
  /** Подпись под числом: «заявки из трёх каналов». */
  caption?: string;
  /** Каналы: [{ icon: 'browser', label: 'Сайт', value: 58 }, …]. Полоски — доля от максимума. */
  channels?: { icon?: string; label: string; value: number }[];
  /** Строка success: { label: 'Потеряно заявок', value: 0 }. */
  lost?: { label: string; value: number | string } | null;
  /** Необязательная строка-примечание внизу. */
  note?: { icon?: string; text: string; meta?: string } | null;
}

export interface CaseCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Клиент — заголовок heading-2: «Кедр». */
  client: React.ReactNode;
  /** Кто это: «Мебельная фабрика, Пермь». */
  subtitle?: React.ReactNode;
  /** Услуги кейса — бейджи справа от имени: ['crm', 'ai']. */
  services?: Array<'crm' | 'sites' | 'smm' | 'ai'>;
  /** Встроенная обложка или свой узел (кладётся на Canvas). null — без обложки. */
  cover?: 'scheme' | 'funnel' | 'report' | React.ReactNode;
  /** Данные встроенной обложки; незаданные ключи берутся из кейса Кедр. */
  coverData?: CaseCardSchemeData | CaseCardFunnelData | CaseCardReportData;
  /** Текстовая альтернатива обложки. Без неё встроенная обложка скрыта от скринридера (aria-hidden). */
  coverLabel?: string;
  /** Задача клиента, одно предложение. */
  task?: React.ReactNode;
  /** Что сделали, одно предложение. */
  solution?: React.ReactNode;
  /** 2–3 результата. Первый — accent-text. */
  metrics?: CaseCardMetric[];
  /** Ссылка на кейс. С ней вся карточка кликабельна, внизу ghost «Читать кейс». */
  href?: string;
  /** Текст ссылки, по умолчанию «Читать кейс». */
  cta?: string;
  /** Подписи «Задача», «Решение» и меток услуг на бейджах (другой язык). [sandwor.ru] */
  labels?: { task?: string; solution?: string; services?: Partial<Record<ServiceId, string>> };
  /** split — обложка слева, текст справа (по умолчанию); stacked — обложка сверху, для сетки 2–3 в ряд. */
  layout?: 'split' | 'stacked';
  /** Уровень заголовка клиента, по умолчанию 3 (h3). */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

export declare function CaseCard(props: CaseCardProps): React.ReactElement;

export interface PricingCardCta {
  /** Текст кнопки: «Выбрать». */
  label: string;
  /** Ссылка — кнопка рендерится как <a>. */
  href?: string;
  /** Обработчик клика (например, открыть бриф с выбранным тарифом). */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /** Вариант вручную. По умолчанию featured → primary, остальные → secondary. */
  variant?: 'primary' | 'secondary';
  /** Любые другие пропсы Button (loading, disabled, aria-*, className). */
  [key: string]: unknown;
}

export interface PricingCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Название тарифа: «Старт», «Рост», «Система». */
  name: React.ReactNode;
  /** Что внутри одной строкой: «CRM + сайт + аналитика». */
  subtitle?: React.ReactNode;
  /** Цена: число → «120 000» Fira Code + «₽». Строка выводится как есть. */
  price?: number | string;
  /** Слово перед ценой. По умолчанию «от»; пустая строка — без него. */
  pricePrefix?: string;
  /** Примечание под ценой: «Точная цена — после аудита». */
  priceNote?: React.ReactNode;
  /** Срок с иконкой часов: «3–4 недели». */
  term?: React.ReactNode;
  /** Подпись срока для скринридера. По умолчанию «Срок». */
  termLabel?: string;
  /** Что входит: 3–4 пункта с галочкой. */
  features?: React.ReactNode[];
  /** Выделенный тариф: рамка accent-line, primary-кнопка, бейдж по умолчанию. Один на ряд. */
  featured?: boolean;
  /** Текст бейджа. У featured по умолчанию «Чаще всего выбирают»; false — без бейджа. */
  badge?: React.ReactNode | false;
  /** Кнопка внизу карточки (size l, на всю ширину). */
  cta?: PricingCardCta;
  /** Уровень заголовка (2–6). По умолчанию 3. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  /** Доп. содержимое между списком и кнопкой. */
  children?: React.ReactNode;
}
export declare function PricingCard(props: PricingCardProps): React.ReactElement;

export interface TeamCardContact {
  /** Текст ghost-кнопки: «Написать Андрею». */
  label: string;
  /** Ссылка (Telegram, почта) — кнопка рендерится как <a>. */
  href?: string;
  /** Иконка слева. По умолчанию 'brand-telegram'. */
  icon?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  /** Любые другие пропсы Button (target, rel, aria-*, className). */
  [key: string]: unknown;
}

export interface TeamCardProps extends React.HTMLAttributes<HTMLElement> {
  /** founder — большая карточка основателя с цитатой; member — компактная строка сотрудника. По умолчанию member. */
  variant?: 'founder' | 'member';
  /** Имя и фамилия: «Андрей Сомов». Из него же берутся инициалы. */
  name: string;
  /** Роль: «Основатель, архитектор CRM», «SMM и контент». */
  role?: React.ReactNode;
  /** Инициалы вручную: «АС». */
  initials?: string;
  /** Фото (на будущее) — уходит в Avatar src; без фото показываются инициалы. */
  photo?: string;
  /** founder: цитата от первого лица без кавычек — «ёлочки» компонент ставит сам, открывающая висит. */
  quote?: React.ReactNode;
  /** founder: моно-мета: «11 лет в продажах · 90+ внедрений». */
  meta?: React.ReactNode;
  /** founder: ghost-кнопка связи под линией: { label: 'Написать Андрею', href }. */
  contact?: TeamCardContact;
  /** member: id услуги — бейдж справа (иконка + метка из SERVICES). */
  service?: 'crm' | 'sites' | 'smm' | 'ai';
  /** Уровень заголовка с именем (2–6). По умолчанию 3. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  children?: React.ReactNode;
}
export declare function TeamCard(props: TeamCardProps): React.ReactElement;

export interface TeamCardListProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Подпись списка для скринридера: «Команда». */
  label?: string;
  /** Карточки TeamCard variant="member" — каждая оборачивается в <li>, зазор 12px. */
  children?: React.ReactNode;
}
export declare function TeamCardList(props: TeamCardListProps): React.ReactElement;

export interface TestimonialCaseLink {
  /** Текст ghost-ссылки: «Кейс Кедр». */
  label: string;
  /** Адрес страницы кейса. */
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  /** Любые другие пропсы Button (aria-*, className). */
  [key: string]: unknown;
}

export interface TestimonialMetric {
  /** Число-результат: «+38%». Fira Code 500, accent-text. */
  value: React.ReactNode;
  /** Что это за число: «конверсия в сделку». */
  label?: React.ReactNode;
}

export interface TestimonialCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Слова клиента без кавычек — над текстом стоит глиф цитаты. */
  quote: React.ReactNode;
  /** Имя: «Ирина Кравец». */
  author: string;
  /** Должность: «Коммерческий директор». */
  role?: string;
  /** Компания: «Кедр». Выводится через запятую после должности. */
  company?: string;
  /** Инициалы для аватара: «ИК». По умолчанию — из author. */
  avatar?: string;
  /** Фото (на будущее) — уходит в Avatar src. */
  photo?: string;
  /** Ссылка на кейс справа в подвале: { label: 'Кейс Кедр', href }. */
  caseLink?: TestimonialCaseLink;
  /** Моно-чип результата в правом верхнем углу: { value: '+38%', label: 'конверсия в сделку' }. */
  metric?: TestimonialMetric;
  /** default — цитата 17/27; featured — широкая карточка, цитата 20/30 (на мобильном 17/27). */
  variant?: 'default' | 'featured';
}
export declare function TestimonialCard(props: TestimonialCardProps): React.ReactElement;

/** Узел схемы: один шаг пути заявки. */
export interface FlowDiagramNode {
  /** Стабильный ключ узла. */
  id?: string;
  /** Иконка в плитке 32px (см. Icon): 'browser', 'cpu', 'layout-kanban', 'brand-telegram'. */
  icon?: string;
  /** Название шага: «Заявка с сайта», «amoCRM». */
  title: React.ReactNode;
  /** Что происходит на шаге, одна-две строки: «Форма «Рассчитать кухню»». */
  meta?: React.ReactNode;
  /** Свой номер вместо автоматического «01», «02»…; false — без номера. */
  index?: string | false;
  /** Моно-время слева в подвале узла: «12:40:02». */
  time?: string;
  /** Моно-метка справа: «#1284», «86/100», «этап 2/6», «сейчас» (у live — янтарная). */
  ref?: string;
  /** done — пройден (circle-check success); live — идёт сейчас (граница accent-line + точка); idle — ещё не дошли. По умолчанию done. */
  state?: 'done' | 'live' | 'idle';
}

/** Боковая пунктирная ветка от ребра. */
export interface FlowDiagramBranch {
  /** Индекс узла (с нуля), после которого ответвляется ветка. */
  afterIndex: number;
  /** Иконка чипа, обычно 'git-branch'. */
  icon?: string;
  /** Текст чипа: «Не целевые → архив». */
  label: React.ReactNode;
  /** Счётчик справа: 6. */
  count?: number | string;
}

/** Показатель в подвале. */
export interface FlowDiagramStat {
  /** Подпись: «Заявок сегодня». */
  label: React.ReactNode;
  /** Значение моно: «24», «2 мин». */
  value: React.ReactNode;
  /** Доля в процентах (0–100) — рисует янтарную полоску и подпись «75%». */
  meter?: number;
  /** Своя приглушённая подпись рядом со значением вместо «75%». */
  note?: React.ReactNode;
}

export interface FlowDiagramProps extends React.HTMLAttributes<HTMLElement> {
  /** Заголовок в шапке: «Входящие заявки». */
  title?: React.ReactNode;
  /** Иконка шапки, по умолчанию 'automation'; null — без плитки. */
  titleIcon?: string | null;
  /** Статус справа в шапке — Badge variant status: live → tone work (accent-soft + accent-text), idle → tone pause (нейтральный). */
  status?: { label: React.ReactNode; tone?: 'live' | 'idle' };
  /** Узлы по порядку пути. Рассчитано на 3–5 узлов. */
  nodes: FlowDiagramNode[];
  /** Подписи рёбер между соседними узлами (задержка): ['0,8 с', '1,6 с', '0,3 с']. Пустая строка — без подписи. */
  edges?: string[];
  /** Пунктирная ветка вниз от ребра после узла afterIndex. */
  branch?: FlowDiagramBranch;
  /** Строка показателей под холстом, 2–4 штуки. */
  stats?: FlowDiagramStat[];
  /** hero — главная иллюстрация (shadow-float, крупные узлы); compact — для статей и карточек. */
  size?: 'hero' | 'compact';
  /** Автонумерация узлов «01», «02»… По умолчанию true. */
  numbered?: boolean;
  /** Подпись списка шагов для скринридера. По умолчанию «Шаги схемы». */
  listLabel?: string;
}

export declare function FlowDiagram(props: FlowDiagramProps): React.ReactElement;

export interface ProcessStep {
  /** Название этапа, 1–3 слова: «Бриф и аудит». */
  title: React.ReactNode;
  /** Одна фраза о том, что происходит: «Разбираем, как сейчас приходят и теряются заявки». */
  text?: React.ReactNode;
  /** Срок этапа, моно-тег с часами: «1–2 дня», «от месяца». */
  duration?: React.ReactNode;
  /** Ключ React; по умолчанию индекс. */
  id?: string;
  /** Класс на пункт списка. */
  className?: string;
}

export interface ProcessStepsProps extends React.OlHTMLAttributes<HTMLOListElement> {
  /** Этапы по порядку. Номер (01, 02…) ставится сам — порядок важен. 3–6 этапов. */
  steps: ProcessStep[];
  /**
   * Индекс текущего этапа (с нуля). Этапы до него — «готово» (галочка success),
   * текущий — янтарный порт, связи до него — accent. Не передан — все этапы нейтральны.
   */
  current?: number;
  /** Положить на точечную сетку Canvas: каждый этап становится узлом surface + shadow-node. */
  onCanvas?: boolean;
  /** auto (по умолчанию) — ряд на десктопе и столбец ≤760px; horizontal — всегда ряд (колонки от 168px); vertical — всегда столбец. */
  orientation?: 'auto' | 'horizontal' | 'vertical';
  /** Уровень заголовка этапа, по умолчанию 3 (секция — h2). */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  /** Тексты для скринридера: list — подпись списка («Этапы работы»), done, current, duration. */
  labels?: { list?: string; done?: string; current?: string; duration?: string };
}

/** Нумерованная последовательность этапов работы с портами и связями. */
export declare function ProcessSteps(props: ProcessStepsProps): React.ReactElement;

export interface PricingTablePlan {
  /** Ключ тарифа: его получают onSelect и onPlanChange. */
  id: string;
  /** Название: «Старт», «Рост», «Система». */
  name: React.ReactNode;
  /** Число — выводится как «от 120 000 ₽» (formatRub); строка — как есть. */
  price: number | string;
  /** Срок или период моно-подписью под ценой: «3–4 недели», «в месяц». */
  term?: React.ReactNode;
  /** Выделенный тариф (один): янтарная рамка колонки, primary-кнопка. */
  featured?: boolean;
  /** Метка над названием, обычно у featured: «Чаще всего выбирают». */
  badge?: React.ReactNode;
  /** Кнопка: строка-подпись («Выбрать», по умолчанию) или { label, href?, onClick? }. */
  cta?: string | { label: React.ReactNode; href?: string; onClick?: (e: React.MouseEvent) => void };
}

export interface PricingTableRow {
  /** Название возможности: «Сквозная аналитика». */
  label: React.ReactNode;
  /** Пояснение в Tooltip у иконки info-circle, одна фраза. */
  hint?: React.ReactNode;
  /** По значению на тариф, в порядке plans: true — галочка, false — «—», строка — моно-значение («2 сессии»). */
  values: Array<boolean | string | null>;
  /** Держать подсказку открытой (для превью). */
  hintOpen?: boolean;
  /** Класс строки (для превью состояний: is-hover). */
  className?: string;
  id?: string;
}

export interface PricingTableGroup {
  /** Моно-заголовок группы строк: «Что входит». */
  title?: React.ReactNode;
  rows: PricingTableRow[];
  id?: string;
}

export interface PricingTableProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 2–4 тарифа. */
  plans: PricingTablePlan[];
  /** Группы строк сравнения. */
  groups: PricingTableGroup[];
  /** auto (по умолчанию) — таблица на десктопе, список одного тарифа ≤760px; table — всегда таблица; list — всегда список. */
  layout?: 'auto' | 'table' | 'list';
  /** Тариф, открытый в мобильном списке (контролируемый режим). */
  plan?: string;
  /** Тариф в мобильном списке при первом рендере; по умолчанию featured, иначе первый. */
  defaultPlan?: string;
  /** Переключение тарифа в SegmentedControl. */
  onPlanChange?: (id: string) => void;
  /** Клик по кнопке тарифа — с его id. */
  onSelect?: (id: string) => void;
  /** Тексты для скринридера и мелкие слова: caption, yes («есть»), no («нет»), pick («Тариф»), cta («Выбрать»), hint(label). */
  labels?: { caption?: string; yes?: string; no?: string; pick?: string; cta?: string; hint?: (label: string) => string };
}

/**
 * Таблица сравнения тарифов: липкая шапка с ценой и кнопкой, группы строк, выделенная колонка.
 * CSS-переменные: --sw-ptable-bg (фон под липкой шапкой), --sw-ptable-top (отступ под шапку сайта), --sw-ptable-label-w.
 */
export declare function PricingTable(props: PricingTableProps): React.ReactElement;

export interface StatsItem {
  /** Число — главное: «140+», «2 мин», «+38%». Коротко, до 6 знаков. */
  value: React.ReactNode;
  /** Что это число значит, до 24 знаков в строке: «внедрений CRM и автоматизаций». */
  label: React.ReactNode;
  /** Моно-примечание под подписью: источник или база сравнения («было 3 часа»). */
  note?: React.ReactNode;
  /** Янтарное число — то, ради которого блок. Не больше одного; лишние игнорируются. */
  accent?: boolean;
  id?: string;
  className?: string;
}

export interface StatsProps extends React.HTMLAttributes<HTMLUListElement> {
  /** 3–5 чисел (до 8 — в две строки). */
  items: StatsItem[];
  /** Колонок на десктопе; по умолчанию по числу пунктов, 3–5. На мобильном всегда 2. */
  columns?: number;
  /** Положить на точечную сетку: каждое число становится узлом surface + shadow-node. */
  onCanvas?: boolean;
  /** Подпись списка для скринридера: «sandwor в цифрах». */
  label?: string;
}

/** Блок цифр: крупные числа Fira Code с подписью, разделённые тонкими линиями. */
export declare function Stats(props: StatsProps): React.ReactElement;

export interface ClientLogosItem {
  /** Название клиента: подпись-вордмарк или alt у логотипа. */
  name: string;
  /** Файл логотипа (SVG/PNG, светлая версия для тёмной темы). Показывается серым с opacity 0.7, по наведению — 1. Без src — текстовый вордмарк. */
  src?: string;
  /** Ссылка на кейс клиента; ячейка становится ссылкой. */
  href?: string;
  /** Начертание текстового вордмарка; по умолчанию чередуется по ячейкам: display (Unbounded), text (Golos), mono (Fira). */
  face?: 'display' | 'text' | 'mono';
  id?: string;
  /** Класс ячейки (для превью состояний: is-hover, is-focus). */
  className?: string;
}

export interface ClientLogosProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Клиенты; лучше число, кратное колонкам (8 при 4 колонках). Пустые ячейки добавляются сами. */
  items: ClientLogosItem[];
  /** Подпись слева в шапке, по умолчанию «Нам доверяют». null — без подписи. */
  caption?: React.ReactNode;
  /** Сколько клиентов всего: «140+» → справа «8 из 140+ клиентов». */
  total?: string | number;
  /** Своя подпись справа вместо «N из total клиентов»; null — не показывать. */
  countText?: React.ReactNode;
  /** Колонок на десктопе, по умолчанию 4. На мобильном всегда 2. */
  columns?: number;
}

/** Стена клиентов: равные ячейки с линиями 1px, логотипы серым или текстовые вордмарки. */
export declare function ClientLogos(props: ClientLogosProps): React.ReactElement;

export interface AccordionItem {
  /** Уникальный id вопроса: его получают defaultOpen, value и onChange. */
  id: string;
  /** Вопрос — так, как его задал бы клиент: «Сколько стоит внедрение CRM?». */
  question: React.ReactNode;
  /** Ответ: строка или фрагмент (без собственных отступов), 1–3 предложения. */
  answer: React.ReactNode;
  /** Недоступный пункт. */
  disabled?: boolean;
  /** Класс на пункт (для превью состояний: is-hover, is-focus). */
  className?: string;
}

export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Пункты по порядку: самый частый вопрос — первым. */
  items: AccordionItem[];
  /** Разрешить несколько открытых пунктов сразу. По умолчанию открыт максимум один. */
  multiple?: boolean;
  /** id пунктов, открытых при первом рендере. */
  defaultOpen?: string[] | string;
  /** Открытые пункты (контролируемый режим). */
  value?: string[];
  /** Вызывается с новым массивом открытых id. */
  onChange?: (openIds: string[]) => void;
  /** Уровень заголовка, в который обёрнута кнопка вопроса: 2–6, по умолчанию 3. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

/** FAQ-аккордеон: кнопка-вопрос с aria-expanded, плавно раскрывающийся ответ. */
export declare function Accordion(props: AccordionProps): React.ReactElement;

export interface ArticleAuthor {
  /** Имя автора: «Андрей Сомов». */
  name: string;
  /** Инициалы вручную, если из имени получается не то. */
  initials?: string;
  /** Фото (на будущее). */
  src?: string;
  /** founder — янтарный аватар, только для Андрея Сомова. */
  tone?: 'default' | 'founder';
}

export interface ArticleTocItem {
  /** id заголовка H2 в тексте — ссылка ведёт на #id. */
  id: string;
  /** Текст пункта, как в заголовке: «Где теряются заявки». */
  label: React.ReactNode;
  /** Класс ссылки; is-hover / is-focus — статичные состояния для превью. */
  className?: string;
}

export interface ArticleProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Хлебные крошки: [{ label: 'Главная', href: '/' }, { label: 'Блог', href: '/blog' }, { label: 'Как не терять заявки с Авито' }]. */
  breadcrumbs?: { label: React.ReactNode; href?: string }[];
  /** [sandwor.ru] aria-label навигационной цепочки (по умолчанию по-русски). */
  breadcrumbsLabel?: string;
  /** Услуги статьи — бейджи с иконкой и меткой из SERVICES над заголовком. */
  services?: ('crm' | 'sites' | 'smm' | 'ai')[];
  /** Заголовок H1 (display-2, Unbounded 600 32/36; на мобильном 26/30). */
  title?: React.ReactNode;
  /** Лид (body-l, text-secondary): одно-два предложения о пользе статьи. */
  lead?: React.ReactNode;
  /** Автор: аватар s + имя. */
  author?: ArticleAuthor;
  /** Дата так, как её читают: «12 сентября 2026». */
  date?: React.ReactNode;
  /** Та же дата в ISO для <time datetime>: «2026-09-12». */
  dateTime?: string;
  /** Время чтения: «6 минут». Выводится моноширинным после даты через «·». */
  readingTime?: React.ReactNode;
  /**
   * Оглавление справа от текста (с 1100px, sticky). true (по умолчанию) — собрать из h2[id] в тексте;
   * массив — свои пункты; false — без оглавления.
   */
  toc?: boolean | ArticleTocItem[];
  /** Подпись оглавления, по умолчанию «Содержание». */
  tocLabel?: string;
  /** Активный пункт вручную. Без него пункт выбирается по прокрутке. */
  activeId?: string;
  /** Оборачивать children в ArticleProse (по умолчанию true). false — если тело уже свёрстано. */
  prose?: boolean;
  /** Тег корня, по умолчанию article. */
  as?: keyof JSX.IntrinsicElements;
  /** Текст статьи: h2 (с id — для оглавления), h3, p, ul, ol, blockquote, table, figure, ArticleCallout, ArticleFigure. */
  children?: React.ReactNode;
}
/** Страница статьи блога: крошки, бейджи услуг, заголовок, лид, автор и дата, текст и оглавление. */
export declare function Article(props: ArticleProps): React.ReactElement;

export interface ArticleProseProps extends React.HTMLAttributes<HTMLElement> {
  /** Готовый HTML из CMS или Markdown-рендера. Вместо children. Санитизируйте на своей стороне. */
  html?: string;
  /** Тег корня, по умолчанию div. */
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}
/** Типографика длинного текста для сырого HTML: 17/28, ширина 68ch, заголовки, списки, цитаты, таблицы, код. */
export declare function ArticleProse(props: ArticleProseProps): React.ReactElement;

export interface ArticleCalloutProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Заголовок врезки: «Проверьте права менеджеров». */
  title?: React.ReactNode;
  /** Иконка слева, по умолчанию 'info-circle'. */
  icon?: string;
  /** Одно-два предложения. */
  children?: React.ReactNode;
}
/** Врезка внутри текста: surface, 1px line-strong, radius-lg, иконка accent-text. role="note". */
export declare function ArticleCallout(props: ArticleCalloutProps): React.ReactElement;

export interface ArticleFigureProps extends React.HTMLAttributes<HTMLElement> {
  /** Подпись под иллюстрацией (caption, text-muted): «Схема 1. …». */
  caption?: React.ReactNode;
  /** Иллюстрация: Canvas со схемой, изображение. */
  children?: React.ReactNode;
}
/** Иллюстрация с подписью: <figure> + <figcaption>. */
export declare function ArticleFigure(props: ArticleFigureProps): React.ReactElement;

export interface ArticleTocProps extends React.HTMLAttributes<HTMLElement> {
  /** Пункты по порядку заголовков. */
  items: ArticleTocItem[];
  /** id текущего раздела — текст text и планка accent 2px слева, aria-current="location". */
  activeId?: string;
  /** Клик по пункту (id раздела). */
  onNavigate?: (id: string) => void;
  /** Подпись над списком (mono-s, text-muted), по умолчанию «Содержание». Она же — имя навигации для скринридера. */
  label?: string;
}
/** Оглавление статьи: nav > ol ссылок на якоря H2. Article рендерит его сам; отдельно — для своих раскладок. */
export declare function ArticleToc(props: ArticleTocProps): React.ReactElement;

declare global {
  interface Window {
    Sandwor: {
      Logo: typeof Logo;
      Icon: typeof Icon;
      Canvas: typeof Canvas;
      Avatar: typeof Avatar;
      Button: typeof Button;
      Badge: typeof Badge;
      Tooltip: typeof Tooltip;
      Toast: typeof Toast;
      Tabs: typeof Tabs;
      SegmentedControl: typeof SegmentedControl;
      SiteHeader: typeof SiteHeader;
      MobileMenu: typeof MobileMenu;
      Breadcrumbs: typeof Breadcrumbs;
      Pagination: typeof Pagination;
      Footer: typeof Footer;
      TextField: typeof TextField;
      Checkbox: typeof Checkbox;
      ChipGroup: typeof ChipGroup;
      Slider: typeof Slider;
      Calculator: typeof Calculator;
      BriefForm: typeof BriefForm;
      Modal: typeof Modal;
      ServiceCard: typeof ServiceCard;
      CaseCard: typeof CaseCard;
      PricingCard: typeof PricingCard;
      TeamCard: typeof TeamCard;
      TestimonialCard: typeof TestimonialCard;
      FlowDiagram: typeof FlowDiagram;
      ProcessSteps: typeof ProcessSteps;
      PricingTable: typeof PricingTable;
      Stats: typeof Stats;
      ClientLogos: typeof ClientLogos;
      Accordion: typeof Accordion;
      Article: typeof Article;
      SERVICES: Record<ServiceId, { id: ServiceId; label: string; icon: string }>;
    };
  }
}
