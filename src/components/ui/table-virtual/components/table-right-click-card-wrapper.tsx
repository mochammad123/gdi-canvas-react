import { ReactNode } from 'react';
import { ICellPosition } from '../types';
import Portal from './portal';

interface Props {
  position: ICellPosition | null;
  children: ReactNode | string;
  wrapperRef: React.LegacyRef<HTMLDivElement>;
}
export default function TableRightClickCardWrapper({ position, children, wrapperRef }: Props) {
  return (
    <Portal>
      <div
        ref={wrapperRef}
        className="right-click-card fixed bg-white border border-gray-400 rounded-md shadow-lg size-max"
        style={{
          top: position?.y,
          left: position?.x,
          zIndex: 1000,
        }}
      >
        {children}
      </div>
    </Portal>
  );
}
