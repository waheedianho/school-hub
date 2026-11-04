export type UiTone =
  | 'blue'
  | 'green'
  | 'orange'
  | 'purple'
  | 'teal'
  | 'red'
  | 'neutral';

export const UI_TONES: Record<UiTone, { color: string; soft: string }> = {
  blue: { color: '#0866ff', soft: '#edf4ff' },
  green: { color: '#0aab5b', soft: '#edf9f2' },
  orange: { color: '#f5960b', soft: '#fff7e8' },
  purple: { color: '#8b42dc', soft: '#f5edff' },
  teal: { color: '#08a6b7', soft: '#eaf9fb' },
  red: { color: '#ee3d52', soft: '#fff0f2' },
  neutral: { color: '#64748b', soft: '#f0f3f8' },
};
