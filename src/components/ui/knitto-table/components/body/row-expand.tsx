import { memo } from 'react';
import clsx from 'clsx';
import Icons from '../../icons';

interface IRowExpand {
  isExpanded?: boolean;
  rowIndex: number;
  columnIndex: number;
}

function RowExpand({ isExpanded = false, rowIndex, columnIndex }: IRowExpand) {
  return (
    <div className="flex justify-center items-center w-full h-full" data-testid={`kn-table-body-row-expand-wrapper-${rowIndex}-${columnIndex}`}>
      <button
        data-action="expand"
        data-testid={`kn-table-body-row-expand-button-${rowIndex}-${columnIndex}`}
        className="hover:bg-gray-300 transition-colors rounded cursor-pointer"
        type="button"
        aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
      >
        <Icons
          role="img"
          aria-label="expand-icon"
          data-testid={`kn-table-body-row-expand-icon-${rowIndex}-${columnIndex}`}
          name="chevron"
          className={clsx('size-5!', isExpanded ? 'rotate-0' : '-rotate-90')}
        />
      </button>
    </div>
  );
}

export default memo(RowExpand);
