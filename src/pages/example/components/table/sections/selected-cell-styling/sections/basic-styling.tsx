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

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex flex-col gap-y-1.5">
          <h5 className="global-report-title">1. Basic Selected Cell Styling</h5>
          <Typography as="global-description" className="mb-1.5">
            Contoh basic untuk memberi warna pada baris yang dipilih, menggunakan <strong>classNameCell</strong> untuk memberi warna pada baris yang
            dipilih. <br /> Komponen tabel menyimpan state local pada baris yang dipilih, tanda jika baris tersebut sedang dipilih adalah dari
            property <strong>isRowHighlighted</strong> di <strong>classNameCell</strong>.
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
          classNameCell={(_, __, ___, opts) => {
            return clsx({
              'border-l! border-l-blue-950!': opts?.isFirstIndex && opts?.isRowHighlighted,
              'border-r! border-r-blue-950!': opts?.isLastIndex && opts?.isRowHighlighted,
              'border-y! border-y-blue-950! bg-[#ECEEFF]': opts?.isRowHighlighted,
            });
          }}
          onClickRow={(row) => console.log(row)}
        />
      </div>

      {showCode && (
        <div className="mt-4">
          <CodeBlock code={BASIC_STYLING_EXAMPLE} title="Basic Selected Cell Styling Example" />
        </div>
      )}
    </div>
  );
}

export default memo(BasicStyling);

const BASIC_STYLING_EXAMPLE = `import { KnittoTable, type IHeader } from '@knitto/knitto-table';
import { generateUserData, User } from '@/lib/variables/table-sample';

// Generate sample data
const users = generateUserData(100);

const MyTable = () => {
  return (
    <KnittoTable
      headers={headers}
      data={users}
      rowKey="id"
      headerMode="double"
      rowHeight={32}
      headerHeight={40}
      filterHeight={32}
      classNameCell={(_, __, ___, opts) => {
        return clsx({
          'border-l! border-l-blue-950!': opts?.isFirstIndex && opts?.isRowHighlighted,
          'border-r! border-r-blue-950!': opts?.isLastIndex && opts?.isRowHighlighted,
          'border-y! border-y-blue-950! bg-[#ECEEFF]': opts?.isRowHighlighted,
        });
      }}
      onClickRow={(row) => console.log(row)}
    />
  );
};`;
