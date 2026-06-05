import type { PlaygroundControl, PlaygroundValue, PlaygroundValues } from '../Playground.types';

export interface ControlsProps {
  controls: PlaygroundControl[];
  values: PlaygroundValues;
  onValueChange: (prop: string, value: PlaygroundValue) => void;
}
