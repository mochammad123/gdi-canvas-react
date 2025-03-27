import clsx from 'clsx';
import { dummyData, IDummyData } from './data';
import { TableVirtual, ITableVirtual } from '@/components/ui/table-virtual-v2';
import { Typography } from '@/components/ui/typhography';
import ToggleShowCode from '../toggle-show-code';
import { useState } from 'react';
import ContentExampleCode from '../content-example-code';

const headers: ITableVirtual<IDummyData>['headers'] = [
  { key: 'name', caption: 'Nama' },
  { key: 'email', caption: 'Email' },
  { key: 'age', caption: 'Umur', className: '!text-end' },
  {
    key: 'isActive',
    caption: 'Aktif',
    render: (value) => (
      <div className={clsx('w-max p-1 rounded text-xs text-white', value ? 'bg-green-700/80' : 'bg-orange-700/70')}>
        {value ? 'Active' : 'Inactive'}
      </div>
    ),
  },
];

export default function AutoWidth() {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <Typography as="global-description">Jika jumlah kolom hanya sedikit/kurang dari lebar tabel.</Typography>
        <ToggleShowCode show={show} setShow={setShow} />
      </div>
      <div className="w-full h-[25rem]">
        <TableVirtual useAutoWidth headers={headers} dataSource={dummyData} headerModel="single-row" stickyHeaderHeight={40} />
      </div>
      <ContentExampleCode show={show} code={code} />
    </>
  );
}

const code = `
import clsx from 'clsx';
import { dummyData, IDummyData } from './data';
import { TableVirtualV2, ITableVirtual } from '@/components/ui/table-virtual-v2';

const headers: ITableVirtual<IDummyData>['headers'] = [
  { key: 'name', caption: 'Nama' },
  { key: 'email', caption: 'Email' },
  { key: 'age', caption: 'Umur', className: '!text-end' },
  {
    key: 'isActive',
    caption: 'Aktif',
    render: (value) => (
      <div className={clsx(
        'w-max p-1 rounded text-xs text-white',
        value ? 'bg-green-700/80' : 'bg-orange-700/70')}
      >
        {value ? 'Active' : 'Inactive'}
      </div>
    ),
  },
];

export default function AutoWidth() {
  return (
    <>
      <div className="w-full h-[25rem]">
        <TableVirtualV2
          useAutoWidth
          headers={headers}
          dataSource={dummyData}
          headerModel="single-row"
          stickyHeaderHeight={40}
        />;
      </div>
    </>
  );
}`;
