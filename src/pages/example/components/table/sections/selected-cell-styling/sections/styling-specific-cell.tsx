import ToggleShowCode from '@/components/toggle-show-code';
import { IHeader, KnittoTable } from '@/components/ui/knitto-table';
import { memo, useState } from 'react';
import CodeBlock from '../../../components/code-block';
import { User } from '@/lib/variables/table-sample';
import { Typography } from '@/components/ui/typhography';
import clsx from 'clsx';

interface IBasicStylingProps {
  users: User[];
  headers: IHeader<User>[];
}

function BasicStyling({ users, headers }: IBasicStylingProps) {
  const [showCode, setShowCode] = useState(false);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  return (
    <>
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex flex-col gap-y-1.5">
          <h5 className="global-report-title">2. Styling Specific Cell</h5>
          <Typography as="global-description" className="mb-1.5">
            Memberi styling pada cell yang dipilih, index cell yang dipilih dapat diakses melalui property <b>classNameCell</b>.
          </Typography>
        </div>
        <ToggleShowCode show={showCode} setShow={setShowCode} />
      </div>

      <div className="h-80 mb-2.5 mt-2.5">
        <KnittoTable
          data={users}
          filterHeight={32}
          headerHeight={40}
          headerMode="double"
          headers={headers}
          rowHeight={32}
          rowKey="id"
          classNameCell={(_data, _rowIndex, columnIndex, opts) => {
            return clsx({
              '!border-l !border-l-blue-950': opts?.isFirstIndex && opts?.isRowHighlighted,
              '!border-r !border-r-blue-950': opts?.isLastIndex && opts?.isRowHighlighted,
              '!border-y !border-y-blue-950 bg-[#ECEEFF]': opts?.isRowHighlighted,
              '!bg-red-500 !text-white': columnIndex === selectedCell && opts?.isRowHighlighted,
            });
          }}
          onClickRow={(_data, _rowIndex, columnIndex) => setSelectedCell(columnIndex)}
        />
      </div>

      {showCode && (
        <div className="mt-4">
          <CodeBlock code={BASIC_STYLING_EXAMPLE} title="Basic Selected Cell Styling Example" />
        </div>
      )}
    </>
  );
}

export default memo(BasicStyling);

const BASIC_STYLING_EXAMPLE = `import { KnittoTable, type IHeader } from '@/components/ui/knitto-table';
import { generateUserData, User } from '@/lib/variables/table-sample';
import { useState } from 'react';
import clsx from 'clsx';

// Generate sample data
const users = generateUserData(100);

const MyTable = () => {
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  return (
    <KnittoTable
      headers={headers}
      data={users}
      rowKey="id"
      headerMode="double"
      rowHeight={32}
      headerHeight={40}
      filterHeight={32}
      classNameCell={(_data, _rowIndex, columnIndex, opts) => {
        return clsx({
          '!border-l !border-l-blue-950': opts?.isFirstIndex && opts?.isRowHighlighted,
          '!border-r !border-r-blue-950': opts?.isLastIndex && opts?.isRowHighlighted,
          '!border-y !border-y-blue-950 bg-[#ECEEFF]': opts?.isRowHighlighted,
          '!bg-red-500 !text-white': columnIndex === selectedCell && opts?.isRowHighlighted,
        });
      }}
      onClickRow={(_data, _rowIndex, columnIndex) => setSelectedCell(columnIndex)}
    />
  );
};`;
