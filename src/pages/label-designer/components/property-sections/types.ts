import { LabelElement } from '../../types';

export type UpdateSelectedElement = (updates: Partial<LabelElement>) => void;

export interface ElementSectionProps {
  element: LabelElement;
  onUpdate: UpdateSelectedElement;
}
