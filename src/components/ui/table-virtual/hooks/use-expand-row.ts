import { useState } from 'react';
import { TExpandedRows } from '../types';

export default function useExpandRow({ onExpandRow }: { onExpandRow?: (id: number, status: boolean) => void }) {
  const [expanded, setExpanded] = useState<TExpandedRows>({});
  const handleExpandChange = (id: number, status: boolean) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: status,
    }));
    onExpandRow?.(id, status);
  };

  return {
    expanded,
    handleExpandChange,
  };
}
