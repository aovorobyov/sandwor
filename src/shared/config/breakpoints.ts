export const breakpoints = {
  sm: 640,
  md: 1024,
  lg: 1280,
} as const;

export type Breakpoint = keyof typeof breakpoints;
