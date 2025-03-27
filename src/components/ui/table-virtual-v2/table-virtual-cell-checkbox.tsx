import { memo } from 'react';
import TableVirtualCheckbox from './components/table-virtual-checkbox';

interface Props {
  finalDataSource: Record<string, string | number>[];
  rowIndex: number;
  checkBoxSelection?: {
    checkBoxSelectionKey?: string;
    selectedCheckBoxes: Set<string>;
    isCheckedAll?: boolean;
    handleSelectCheckboxRow: (value: string) => void;
    handleSelectAllCheckbox: () => void;
  };
}

const TableVirtualCheckboxSelection = (props: Props) => {
  const { rowIndex, checkBoxSelection, finalDataSource } = props;

  const { selectedCheckBoxes, handleSelectCheckboxRow, checkBoxSelectionKey } = checkBoxSelection ?? {};

  if (!checkBoxSelectionKey) return null;

  const cellValue = String(finalDataSource[rowIndex]?.[checkBoxSelectionKey as keyof (typeof finalDataSource)[0]]);

  return (
    <div>
      <TableVirtualCheckbox
        name={`checkbox-selection-${checkBoxSelectionKey}-${rowIndex}`}
        checked={!!selectedCheckBoxes?.has(String(cellValue))}
        onClick={(e) => e.stopPropagation()}
        onChecked={() => handleSelectCheckboxRow?.(String(cellValue))}
      />
    </div>
  );
};

export default memo(TableVirtualCheckboxSelection);
