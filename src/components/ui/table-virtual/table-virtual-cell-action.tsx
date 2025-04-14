import { memo, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import IcDotsVertical from './icons/ic-dots-vertical';
import { useUIContext } from './service/ui-context';
import Portal from '../portal';
import useCloseOnWindowScroll from './hooks/use-close-on-window-scroll';

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

  const actionCellRef = useRef<HTMLDivElement>(null);
  const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useCloseOnWindowScroll({
    enabled: showActionCard?.show || false,
    onClose: () => setShowActionCard?.({ show: false, rowIndex: -1 }),
  });

  useEffect(() => {
    if (!showActionCard || !actionCellRef.current) return;
    const rect = actionCellRef.current.querySelector('.btn-action-toggle')?.getBoundingClientRect();
    if (!rect) return;

    const cardRect = actionCardRef.current?.getBoundingClientRect();
    setCardPosition((prev) => ({ ...prev, left: rect.left - (cardRect?.width || 0) - 2 }));
    setIsVisible(true);
  }, [showActionCard, actionCardRef]);

  return (
    <div ref={actionCellRef} className="w-full relative">
      <div className="flex justify-center items-center">
        <button
          className={clsx(
            'btn-action-toggle',
            'cursor-pointer w-5 bg-transparent py-1 rounded flex justify-center items-center',
            'hover:bg-gray-300 transition-colors duration-150'
          )}
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false);
            const rect = e.currentTarget.getBoundingClientRect();
            setShowActionCard?.({ show: true, rowIndex });
            setCardPosition({ top: rect.top, left: rect.left });
          }}
        >
          <IcDotsVertical />
        </button>
      </div>
      {showActionCard?.show && showActionCard?.rowIndex === rowIndex && (
        <Portal>
          <div
            ref={actionCardRef as React.LegacyRef<HTMLDivElement>}
            className={clsx('fixed z-[99999999999999] bg-white shadow-lg', isVisible ? 'opacity-100' : 'opacity-0')}
            style={{ ...cardPosition }}
          >
            {renderActionCard?.(finalDataSource[rowIndex], rowIndex)}
          </div>
        </Portal>
      )}
    </div>
  );
};

export default memo(TableVirtualCellAction);
