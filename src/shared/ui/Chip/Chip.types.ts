export interface ChipProps {
  label: string;
  value: string;
  isActive: boolean;
  onSelect: (value: string) => void;
}
