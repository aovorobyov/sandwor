'use client';
import React, { useEffect, useId, useRef, useState } from 'react';
import { Icon } from './Icon.jsx';
import { Button } from './Button.jsx';
import { ChipGroup } from './ChipGroup.jsx';
import { TextField } from './TextField.jsx';
import { SegmentedControl } from './SegmentedControl.jsx';
import { Checkbox } from './Checkbox.jsx';
import { cx } from '../utils.js';

const NB = ' ';

const EMPTY = {
  services: [],
  company: '',
  teamSize: null,
  task: '',
  budget: null,
  name: '',
  contact: '',
  telegram: false,
  consent: false,
};

const SERVICE_OPTIONS = [
  { value: 'crm', service: 'crm' },
  { value: 'sites', service: 'sites', label: 'Сайт' },
  { value: 'smm', service: 'smm' },
  { value: 'ai', service: 'ai' },
];
const TEAM_OPTIONS = [
  { value: '1-5', label: '1–5' },
  { value: '6-20', label: '6–20' },
  { value: '20+', label: '20+' },
];
const BUDGET_OPTIONS = [
  { value: 'lt100', label: `до${NB}100${NB}тыс.` },
  { value: '100-300', label: `100–300${NB}тыс.` },
  { value: 'gt300', label: `300${NB}тыс. и${NB}больше` },
  { value: 'unknown', label: `Пока не${NB}знаю` },
];

const DEFAULT_COPY = {
  steps: ['Что нужно', 'О компании', 'Задача', 'Контакты'],
  stepOf: (n, total) => `Шаг ${n} из ${total}`,
  stepsLabel: 'Шаги брифа',
  stepDone: 'готово',
  servicesHint: `Отметьте всё, что актуально,${NB}— можно несколько`,
  company: 'Компания',
  companyPlaceholder: 'Например, Кедр',
  teamSize: 'Сколько человек в продажах',
  task: 'Коротко о задаче',
  taskPlaceholder: `Например: заявки с${NB}сайта и${NB}Авито теряются, хотим видеть всё в${NB}одной CRM`,
  budget: 'Бюджет',
  name: 'Как вас зовут',
  namePlaceholder: 'Имя',
  contact: 'Телефон или Telegram',
  contactPlaceholder: '+7 900 000-00-00 или @ник',
  telegram: 'Удобнее в Telegram',
  back: 'Назад',
  next: 'Дальше',
  submit: 'Отправить заявку',
  sending: 'Отправляем…',
  fine: `Нажимая кнопку, вы соглашаетесь с${NB}обработкой персональных данных`,
  errServices: 'Выберите хотя бы одно направление',
  errName: 'Напишите, как к вам обращаться',
  errContact: 'Укажите телефон или ник в Telegram',
  errConsent: 'Отметьте согласие на обработку персональных данных',
  /** [sandwor.ru] подпись необязательного поля (для EN). */
  optional: 'необязательно',
  errSubmit: `Не удалось отправить. Проверьте соединение и${NB}попробуйте ещё раз`,
  successTitle: 'Заявка отправлена',
  successText: (v) => {
    const channel = v.telegram || /^@|t\.me\//i.test(String(v.contact || '').trim())
      ? `ответим в${NB}Telegram в${NB}течение часа.`
      : `перезвоним в${NB}течение часа.`;
    const name = String(v.name || '').trim();
    return name ? `${name}, ${channel}` : channel.charAt(0).toUpperCase() + channel.slice(1);
  },
  successNumber: (n) => `Номер заявки #${n}`,
  successAction: 'Вернуться на сайт',
  /** [sandwor.ru] «Что дальше» после отправки: заголовок и шаги; пустой список — блока нет. */
  successNextTitle: 'Что дальше',
  successSteps: [],
  /** [sandwor.ru] Второе действие на экране успеха: { label, href }. */
  successLink: null,
};

const STEP_FIELDS = [['services'], [], [], ['name', 'contact', 'consent']];

/** Phone (≥ 10 digits) or a Telegram handle (@nick, t.me/nick, or a bare nick). */
function isContact(raw) {
  const s = String(raw || '').trim();
  if (!s) return false;
  if (/^(@|https?:\/\/t\.me\/|t\.me\/)/i.test(s)) return /[A-Za-z0-9_]{4,}$/.test(s);
  if (/^[+\d\s()-]+$/.test(s)) return s.replace(/\D/g, '').length >= 10;
  return /^[A-Za-z][A-Za-z0-9_]{4,31}$/.test(s);
}

function validate(step, v, copy, requireConsent) {
  const e = {};
  if (step === 0 && !(v.services && v.services.length)) e.services = copy.errServices;
  if (step === 3) {
    if (!String(v.name || '').trim()) e.name = copy.errName;
    if (!isContact(v.contact)) e.contact = copy.errContact;
    // [sandwor.ru] обязательное согласие на обработку ПД (152-ФЗ ст. 9, отдельно от политики)
    if (requireConsent && !v.consent) e.consent = copy.errConsent;
  }
  return e;
}

/**
 * Four-step project brief: «Что нужно» → «О компании» → «Задача» → «Контакты».
 * Validates on «Дальше», focuses the first invalid field, sends through the
 * `onSubmit(values)` promise and ends on a success screen.
 */
export function BriefForm({
  onSubmit,
  onReturn,
  returnHref,
  initialStep = 1,
  initialValues,
  initialState = 'form',
  validateOnMount = false,
  requestNumber,
  container = 'card',
  headingLevel = 2,
  services = SERVICE_OPTIONS,
  teamOptions = TEAM_OPTIONS,
  budgetOptions = BUDGET_OPTIONS,
  copy: copyProp,
  consent,
  onStatusChange,
  padNumbers = true,
  className,
  ...rest
}) {
  const uid = useId().replace(/:/g, '');
  const copy = { ...DEFAULT_COPY, ...(copyProp || {}) };
  const total = copy.steps.length;
  const clampStep = (n) => Math.min(total - 1, Math.max(0, (Number(n) || 1) - 1));

  const [step, setStep] = useState(() => clampStep(initialStep));
  const [values, setValues] = useState(() => ({ ...EMPTY, ...(initialValues || {}) }));
  const [errors, setErrors] = useState(() => (validateOnMount ? validate(clampStep(initialStep), { ...EMPTY, ...(initialValues || {}) }, copy, Boolean(consent)) : {}));
  const [status, setStatus] = useState(initialState === 'success' ? 'success' : 'form'); // form | sending | error | success
  const [result, setResult] = useState(null);

  const headingRef = useRef(null);
  const successRef = useRef(null);
  const servicesRef = useRef(null);
  const nameRef = useRef(null);
  const contactRef = useRef(null);
  const consentRef = useRef(null);
  const moved = useRef(false);
  const formRef = useRef(null);
  // [sandwor.ru] Высота формы в момент отправки: экран успеха занимает столько же — окно не прыгает.
  const [lockedHeight, setLockedHeight] = useState(null);
  const alive = useRef(true);
  // [sandwor.ru] Флаг выставляется и при повторном монтировании (StrictMode в dev монтирует
  // эффекты дважды) — иначе после отправки форма навсегда оставалась в «Отправляем…».
  useEffect(() => {
    alive.current = true;
    return () => { alive.current = false; };
  }, []);

  // After a step change (not on mount) move focus to the new step title so it is announced.
  useEffect(() => {
    if (!moved.current) return;
    if (status === 'success') { if (successRef.current) successRef.current.focus(); return; }
    if (headingRef.current) headingRef.current.focus();
  }, [step, status === 'success']); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (onStatusChange) onStatusChange(status);
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  const Heading = `h${Math.min(6, Math.max(1, headingLevel))}`;
  const id = (k) => `sw-brief-${uid}-${k}`;

  const set = (key, val) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
    if (status === 'error') setStatus('form');
  };

  const focusFirstInvalid = (e) => {
    const first = STEP_FIELDS[step].find((f) => e[f]);
    if (first === 'services') {
      const btn = servicesRef.current && servicesRef.current.querySelector('button:not(:disabled)');
      if (btn) btn.focus();
    } else if (first === 'name' && nameRef.current) nameRef.current.focus();
    else if (first === 'contact' && contactRef.current) contactRef.current.focus();
    else if (first === 'consent' && consentRef.current) consentRef.current.focus();
  };

  const goTo = (n) => {
    moved.current = true;
    setErrors({});
    if (status === 'error') setStatus('form');
    setStep(n);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (status === 'sending') return;
    const e = validate(step, values, copy, Boolean(consent));
    if (Object.keys(e).length) {
      setErrors(e);
      focusFirstInvalid(e);
      return;
    }
    if (step < total - 1) { goTo(step + 1); return; }
    setStatus('sending');
    Promise.resolve(onSubmit ? onSubmit(values) : undefined).then(
      (res) => {
        if (!alive.current) return;
        moved.current = true;
        if (formRef.current) setLockedHeight(formRef.current.offsetHeight);
        setResult(res || null);
        setStatus('success');
      },
      () => { if (alive.current) setStatus('error'); },
    );
  };

  const reset = () => {
    moved.current = true;
    setValues({ ...EMPTY, ...(initialValues || {}) });
    setErrors({});
    setResult(null);
    setLockedHeight(null);
    setStatus('form');
    setStep(0);
  };

  const rootCls = cx('sw-brief', `sw-brief--${container}`, className);

  if (status === 'success') {
    const num = (result && (result.number != null ? result.number : result.id)) ?? requestNumber;
    const steps = Array.isArray(copy.successSteps) ? copy.successSteps.filter(Boolean) : [];
    const { style: restStyle, ...restProps } = rest;
    return (
      <div
        className={cx(rootCls, 'sw-brief--success')}
        style={lockedHeight ? { ...restStyle, minHeight: lockedHeight } : restStyle}
        {...restProps}
      >
        <div className="sw-brief__done">
          <span className="sw-brief__done-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
              <path className="sw-brief__done-check" d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </span>
          <Heading ref={successRef} tabIndex={-1} className="sw-brief__title">{copy.successTitle}</Heading>
          <p className="sw-brief__done-text">{copy.successText(values)}</p>
          {num != null && <p className="sw-brief__done-num">{copy.successNumber(num)}</p>}
          {steps.length > 0 && (
            <div className="sw-brief__done-next">
              <p className="sw-brief__done-next-title">{copy.successNextTitle}</p>
              <ol className="sw-brief__done-steps">
                {steps.map((text, i) => (
                  <li key={i} className="sw-brief__done-step">
                    {/* [sandwor.ru] padNumbers=false — номера шагов без ведущего нуля. */}
                    <span className="sw-brief__done-step-num">{padNumbers ? String(i + 1).padStart(2, '0') : i + 1}</span>
                    <span className="sw-brief__done-step-text">{text}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <div className="sw-brief__done-actions">
            <Button
              variant="secondary"
              className="sw-brief__done-action"
              href={returnHref}
              onClick={onReturn || (returnHref ? undefined : reset)}
            >
              {copy.successAction}
            </Button>
            {copy.successLink && (
              <Button variant="ghost" href={copy.successLink.href} iconEnd="arrow-right" onClick={onReturn}>
                {copy.successLink.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const last = step === total - 1;
  const sending = status === 'sending';

  const renderStep = () => {
    if (step === 0) {
      return (
        <div className="sw-brief__field">
          <p id={id('services-hint')} className="sw-brief__hint">{copy.servicesHint}</p>
          <div ref={servicesRef}>
            <ChipGroup
              multiple
              name="services"
              options={services}
              value={values.services}
              onChange={(v) => set('services', v)}
              aria-labelledby={id('title')}
              aria-describedby={cx(id('services-hint'), errors.services && id('services-msg'))}
            />
          </div>
          {errors.services && (
            <p id={id('services-msg')} role="alert" className="sw-brief__error">
              <Icon name="alert-circle" size={14} className="sw-brief__error-icon" />
              <span>{errors.services}</span>
            </p>
          )}
        </div>
      );
    }
    if (step === 1) {
      return (
        <>
          <TextField
            label={copy.company}
            optional
            optionalLabel={copy.optional}
            maxLength={200}
            name="company"
            autoComplete="organization"
            placeholder={copy.companyPlaceholder}
            value={values.company}
            onChange={(e) => set('company', e.target.value)}
          />
          <div className="sw-brief__field">
            <span id={id('team')} className="sw-brief__label">{copy.teamSize}</span>
            <SegmentedControl
              block
              options={teamOptions}
              value={values.teamSize}
              onChange={(v) => set('teamSize', v)}
              aria-labelledby={id('team')}
            />
          </div>
        </>
      );
    }
    if (step === 2) {
      return (
        <>
          <TextField
            label={copy.task}
            multiline
            rows={4}
            maxLength={500}
            name="task"
            placeholder={copy.taskPlaceholder}
            value={values.task}
            onChange={(e) => set('task', e.target.value)}
          />
          <div className="sw-brief__field">
            <span id={id('budget')} className="sw-brief__label">{copy.budget}</span>
            <ChipGroup
              options={budgetOptions}
              name="budget"
              value={values.budget}
              onChange={(v) => set('budget', v)}
              aria-labelledby={id('budget')}
            />
          </div>
        </>
      );
    }
    return (
      <>
        <TextField
          label={copy.name}
          maxLength={100}
          name="name"
          autoComplete="given-name"
          placeholder={copy.namePlaceholder}
          required
          aria-required="true"
          value={values.name}
          error={errors.name}
          inputRef={nameRef}
          onChange={(e) => set('name', e.target.value)}
        />
        <TextField
          label={copy.contact}
          maxLength={100}
          name="contact"
          autoComplete="tel"
          placeholder={copy.contactPlaceholder}
          required
          aria-required="true"
          value={values.contact}
          error={errors.contact}
          inputRef={contactRef}
          onChange={(e) => set('contact', e.target.value)}
        />
        <Checkbox
          label={copy.telegram}
          name="telegram"
          checked={values.telegram}
          onChange={(e) => set('telegram', e.target.checked)}
        />
        {consent && (
          <Checkbox
            label={consent}
            name="consent"
            required
            aria-required="true"
            checked={values.consent}
            error={errors.consent}
            inputRef={consentRef}
            onChange={(e) => set('consent', e.target.checked)}
          />
        )}
      </>
    );
  };

  return (
    <form
      ref={formRef}
      className={rootCls}
      noValidate
      aria-labelledby={id('title')}
      onSubmit={handleSubmit}
      {...rest}
    >
      <div className="sw-brief__header">
        <div className="sw-brief__titlerow">
          <Heading id={id('title')} ref={headingRef} tabIndex={-1} className="sw-brief__title">
            {copy.steps[step]}
          </Heading>
          <span className="sw-brief__count">{copy.stepOf(step + 1, total)}</span>
        </div>
        <ol className="sw-brief__steps" aria-label={copy.stepsLabel}>
          {copy.steps.map((title, i) => {
            const state = i < step ? 'done' : i === step ? 'current' : 'upcoming';
            const inner = (
              <>
                <span className="sw-brief__bar" aria-hidden="true" />
                <span className="sw-brief__step-label">
                  {state === 'done' && <Icon name="check" size={14} className="sw-brief__step-check" />}
                  <span className="sw-brief__step-text">{title}</span>
                </span>
              </>
            );
            return (
              <li
                key={title}
                className={cx('sw-brief__step', `sw-brief__step--${state}`)}
                aria-current={state === 'current' ? 'step' : undefined}
              >
                {state === 'done' && !sending ? (
                  <button
                    type="button"
                    className="sw-brief__step-btn"
                    aria-label={`${title} — ${copy.stepDone}`}
                    onClick={() => goTo(i)}
                  >
                    {inner}
                  </button>
                ) : (
                  <span className="sw-brief__step-btn">{inner}</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="sw-brief__body">{renderStep()}</div>

      {status === 'error' && (
        <p role="alert" className="sw-brief__error sw-brief__error--submit">
          <Icon name="alert-circle" size={16} className="sw-brief__error-icon" />
          <span>{copy.errSubmit}</span>
        </p>
      )}

      <div className="sw-brief__footer">
        <div className="sw-brief__actions">
          {step > 0 && (
            <Button
              variant="quiet"
              icon="arrow-left"
              className="sw-brief__back"
              disabled={sending}
              onClick={() => goTo(step - 1)}
            >
              {copy.back}
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            className="sw-brief__next"
            iconEnd={last ? undefined : 'arrow-right'}
            loading={sending}
            loadingText={copy.sending}
          >
            {last ? copy.submit : copy.next}
          </Button>
        </div>
        {last && <p className="sw-brief__fine">{copy.fine}</p>}
      </div>
    </form>
  );
}
