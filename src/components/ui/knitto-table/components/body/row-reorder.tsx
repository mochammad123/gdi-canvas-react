import { memo } from 'react';
import DargOutlineIcon from '@/components/ui/icon/darg-outline-icon';

function RowReorder() {
  return (
    <div className="flex justify-center items-center w-full h-full cursor-grab active:cursor-grabbing" data-drag-handle>
      <DargOutlineIcon className="size-4 text-gray-500" />
    </div>
  );
}

export default memo(RowReorder);
