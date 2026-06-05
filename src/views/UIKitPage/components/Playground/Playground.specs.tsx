import { Badge, Button, DotIcon, Input, ProgressBar, Textarea } from '@/shared/ui';
import type { BadgeVariant, ButtonSize, ButtonVariant, DotIconName } from '@/shared/ui';
import type { PlaygroundSpec, PlaygroundTranslate } from './Playground.types';

const BUTTON_VARIANTS: readonly ButtonVariant[] = ['primary', 'secondary', 'ghost'];
const BUTTON_SIZES: readonly ButtonSize[] = ['sm', 'md'];
const BADGE_VARIANTS: readonly BadgeVariant[] = ['neutral', 'accent'];

const DOT_ICON_NAMES: readonly DotIconName[] = [
  'search',
  'home',
  'blog',
  'projects',
  'news',
  'course',
  'uikit',
  'post',
  'light',
  'dark',
  'system',
  'locale',
  'drop',
  'mail',
  'telegram',
  'github',
  'instagram',
  'vk',
  'notFound',
];

/**
 * Спецификации компонентов песочницы.
 * Касты string → union в render безопасны: значения ограничены options контролов.
 */
export const createPlaygroundSpecs = (t: PlaygroundTranslate): PlaygroundSpec[] => {
  return [
    {
      name: 'Button',
      childrenProp: 'children',
      controls: [
        { prop: 'variant', type: 'select', options: BUTTON_VARIANTS },
        { prop: 'size', type: 'select', options: BUTTON_SIZES },
        { prop: 'disabled', type: 'boolean' },
        { prop: 'children', type: 'text' },
      ],
      defaults: { variant: 'primary', size: 'md', disabled: false, children: t('btn-primary') },
      render: (values) => {
        return (
          <Button
            variant={values.variant as ButtonVariant}
            size={values.size as ButtonSize}
            disabled={Boolean(values.disabled)}
          >
            {String(values.children)}
          </Button>
        );
      },
    },
    {
      name: 'Badge',
      childrenProp: 'children',
      controls: [
        { prop: 'variant', type: 'select', options: BADGE_VARIANTS },
        { prop: 'children', type: 'text' },
      ],
      defaults: { variant: 'neutral', children: t('badge-neutral') },
      render: (values) => {
        return <Badge variant={values.variant as BadgeVariant}>{String(values.children)}</Badge>;
      },
    },
    {
      name: 'Input',
      controls: [
        { prop: 'label', type: 'text' },
        { prop: 'placeholder', type: 'text' },
        { prop: 'error', type: 'text' },
        { prop: 'disabled', type: 'boolean' },
      ],
      defaults: {
        label: t('form-label'),
        placeholder: t('form-placeholder'),
        error: '',
        disabled: false,
      },
      render: (values) => {
        return (
          <Input
            label={String(values.label) || undefined}
            placeholder={String(values.placeholder)}
            error={String(values.error) || undefined}
            disabled={Boolean(values.disabled)}
          />
        );
      },
    },
    {
      name: 'Textarea',
      controls: [
        { prop: 'label', type: 'text' },
        { prop: 'placeholder', type: 'text' },
        { prop: 'error', type: 'text' },
        { prop: 'rows', type: 'number', min: 2, max: 10 },
      ],
      defaults: {
        label: t('form-message'),
        placeholder: t('form-message-placeholder'),
        error: '',
        rows: 4,
      },
      render: (values) => {
        return (
          <Textarea
            label={String(values.label) || undefined}
            placeholder={String(values.placeholder)}
            error={String(values.error) || undefined}
            rows={Number(values.rows)}
          />
        );
      },
    },
    {
      name: 'ProgressBar',
      controls: [
        { prop: 'value', type: 'number', min: 0, max: 100 },
        { prop: 'max', type: 'number', min: 1, max: 100 },
      ],
      defaults: { value: 60, max: 100 },
      render: (values) => {
        return <ProgressBar value={Number(values.value)} max={Number(values.max)} />;
      },
    },
    {
      name: 'DotIcon',
      controls: [
        { prop: 'name', type: 'select', options: DOT_ICON_NAMES },
        { prop: 'size', type: 'number', min: 12, max: 60 },
      ],
      defaults: { name: 'search', size: 32 },
      render: (values) => {
        return <DotIcon name={values.name as DotIconName} size={Number(values.size)} />;
      },
    },
  ];
};
