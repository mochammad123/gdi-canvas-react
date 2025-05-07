import { memo } from 'react';
import TableVirtualExpand from './components/table-virtual-expand';
import { ITableVirtualStickyGrid, TExpandedRows } from './types';

interface Props extends Pick<ITableVirtualStickyGrid, 'expandComponent'> {
  finalDataSource: Record<string, string | number>[];
  rowIndex: number;
  expandedRow?: {
    expanded: TExpandedRows;
    handleExpandChange: (id: number, status: boolean) => void;
  };
  item: unknown;
}

const TableVirtualCellExpand = ({ expandedRow, item }: Props) => {
  const id = (item as { id: number }).id;
  if (!id) return null;

  return (
    <div>
      <TableVirtualExpand
        expanded={expandedRow?.expanded?.[id] || false}
        onExpand={() => expandedRow?.handleExpandChange(id, !expandedRow.expanded?.[id])}
      />
    </div>
  );
};

export default memo(TableVirtualCellExpand);
