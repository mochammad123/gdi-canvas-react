import { HTMLAttributes, memo } from 'react';
import DargOutlineIcon from '@/components/ui/icon/darg-outline-icon';

function RowReorder(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex justify-center items-center w-full h-full cursor-grab active:cursor-grabbing" data-drag-handle {...props}>
      <DargOutlineIcon className="size-4 text-gray-500" />
    </div>
  );
}

export default memo(RowReorder);
