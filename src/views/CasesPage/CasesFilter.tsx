'use client';

import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { Chip } from '@/shared/ui/Chip';
import { CaseCard } from '@/entities/case/ui/CaseCard';
import type { CasesFilterProps } from './CasesFilter.types';
import s from './CasesFilter.module.css';

const ALL = 'all';

export const CasesFilter: FC<CasesFilterProps> = (props) => {
  const { items, allLabel, ctaLabel } = props;
  const types = useMemo(() => [ALL, ...Array.from(new Set(items.map((i) => i.type)))], [items]);
  const [active, setActive] = useState(ALL);

  const filtered = useMemo(
    () => (active === ALL ? items : items.filter((i) => i.type === active)),
    [active, items],
  );

  const handleSelect = (value: string) => {
    setActive(value);
  };

  return (
    <div>
      <div className={s.filters} role="group" aria-label="Filter by type">
        {types.map((type) => (
          <Chip
            key={type}
            value={type}
            label={type === ALL ? allLabel : type}
            isActive={type === active}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <div className={s.grid}>
        {filtered.map((item) => (
          <CaseCard key={item.slug} item={item} ctaLabel={ctaLabel} />
        ))}
      </div>
    </div>
  );
};
