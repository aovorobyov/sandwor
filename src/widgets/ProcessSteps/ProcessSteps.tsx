import { getTranslations } from 'next-intl/server';
import s from './ProcessSteps.module.css';

interface Step {
  title: string;
  desc: string;
}

/** Пять шагов работы. Данные — `websites.process`, нумерация 1…5 без ведущих нулей. */
export const ProcessSteps = async () => {
  const t = await getTranslations();
  const steps = t.raw('websites.process') as Step[];

  return (
    <ol className={s.grid}>
      {steps.map((step, index) => (
        <li key={step.title} className={s.step}>
          <div className={s.num}>{index + 1}</div>

          <h3 className={s.title}>{step.title}</h3>

          <p className={s.desc}>{step.desc}</p>
        </li>
      ))}
    </ol>
  );
};
