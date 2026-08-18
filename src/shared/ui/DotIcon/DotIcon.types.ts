/** Координата точки на сетке 60×60 (cx, cy). */
export type DotPoint = readonly [number, number];

export type DotIconName =
  | 'search'
  | 'home'
  | 'blog'
  | 'projects'
  | 'course'
  | 'post'
  | 'locale'
  | 'mail';

export interface DotIconProps {
  name: DotIconName;
  /** Высота в пикселях; ширина выводится из пропорций viewBox. */
  size?: number;
  className?: string;
}
