import React from 'react';
import { Button, Typography } from '@knittotextile/react-ui';
import { LabelElement } from '../../types';

interface SectionActionsProps {
  element: LabelElement;
  selectedCount: number;
  onDelete: () => void;
  onToggleLock?: () => void;
  onDuplicate?: () => void;
}

export const SectionActions: React.FC<SectionActionsProps> = ({ element, selectedCount, onDelete, onToggleLock, onDuplicate }) => (
  <div className="pt-2 space-y-2">
    {(onToggleLock || onDuplicate) && (
      <div className="grid grid-cols-2 gap-2">
        {onDuplicate && (
          <Button type="button" size="sm" variant="outline" color="navy" rounded onClick={onDuplicate} className="w-full">
            Duplikat
          </Button>
        )}
        {onToggleLock && (
          <Button type="button" size="sm" variant="outline" color="navy" rounded onClick={onToggleLock} className="w-full">
            {element.locked ? 'Unlock' : 'Lock'}
          </Button>
        )}
      </div>
    )}
    <Button
      type="button"
      size="sm"
      variant="outline"
      color="burnt-orange"
      rounded
      onClick={onDelete}
      disabled={Boolean(element.locked) && selectedCount === 1}
      className="w-full"
    >
      <span>🗑️</span>
      <span>{selectedCount > 1 ? `Hapus ${selectedCount} Elemen` : 'Hapus Elemen Ini'}</span>
    </Button>
    {element.locked && (
      <Typography as="global-hint" className="text-[10px] text-amber-600 block">
        Elemen terkunci — unlock dulu untuk geser, resize, atau hapus.
      </Typography>
    )}
  </div>
);
