import { memo } from 'react';
import clsx from 'clsx';

import IcDotsVertical from './icons/ic-dots-vertical';
import { useUIContext } from './service/ui-context';

interface Props {
  rowIndex: number;
  actionCardRef: React.RefObject<HTMLDivElement | null>;
  showActionCard: { show: boolean; rowIndex: number } | null;
  setShowActionCard: ((state: { show: boolean; rowIndex: number }) => void) | undefined;
  finalDataSource: Record<string, string | number>[];
}

const TableVirtualCellAction = (props: Props) => {
  const { rowIndex, showActionCard, setShowActionCard, finalDataSource, actionCardRef } = props;

  const { renderActionCard } = useUIContext();

  return (
    <div className="w-full relative">
      <div className="flex justify-center items-center">
        <button
          className={clsx(
            'cursor-pointer w-5 bg-transparent py-1 rounded flex justify-center items-center',
            'hover:bg-gray-300 transition-colors duration-150'
          )}
          onClick={(e) => {
            e.stopPropagation();
            setShowActionCard?.({ show: true, rowIndex });
          }}
        >
          <IcDotsVertical />
        </button>
      </div>

      {showActionCard?.show && showActionCard?.rowIndex === rowIndex && (
        <div ref={actionCardRef as React.LegacyRef<HTMLDivElement>} className="absolute z-[99999999999999] right-full -mt-5 mr-1 bg-white shadow-lg">
          {renderActionCard?.(finalDataSource[rowIndex], rowIndex)}
        </div>
      )}
    </div>
  );
};

export default memo(TableVirtualCellAction);
