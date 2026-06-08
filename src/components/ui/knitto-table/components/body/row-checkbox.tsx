import { memo } from 'react';

interface IRowCheckbox {
  checked: boolean;
  rowIndex?: number;
  columnIndex?: number;
}

function RowCheckbox({ checked, rowIndex, columnIndex }: IRowCheckbox) {
  return (
    <div className="flex justify-center items-center w-full h-full" data-testid={`kn-table-body-row-checkbox-wrapper-${rowIndex}-${columnIndex}`}>
      <input
        type="checkbox"
        data-testid={`kn-table-row-checkbox-input-${rowIndex}-${columnIndex}`}
        data-name="header-checkbox"
        className="w-4 h-4 cursor-pointer accent-blue-950"
        checked={checked}
        readOnly
      />
    </div>
  );
}

export default memo(RowCheckbox);
