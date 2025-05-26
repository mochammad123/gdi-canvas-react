import clsx from 'clsx';
import { dummyData, IDummyData } from './data';
import { TableVirtual, ITableVirtual } from '@/components/ui/table-virtual';
import { Typography } from '@/components/ui/typhography';
import { memo, useState } from 'react';
import TextCode from './text-code';
import ToggleShowCode from '@/components/toggle-show-code';
import ContentExampleCode from '@/components/content-example-code';

const headers: ITableVirtual<IDummyData>['headers'] = [
  { key: 'name', caption: 'Nama' },
  { key: 'email', caption: 'Email' },
  { key: 'age', caption: 'Umur', className: '!text-end' },
  {
    key: 'isActive',
    caption: 'Aktif',
    render: (data) => (
      <div className={clsx('w-max p-1 rounded text-xs text-white', data?.isActive ? 'bg-green-700/80' : 'bg-orange-700/70')}>
        {data?.isActive ? 'Active' : 'Inactive'}
      </div>
    ),
  },
];

const TableAutoWidth = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <Typography as="global-description">
            Digunakan ketika jumlah kolom dan ukuran nya tidak sampai melebihi ukuran lebar table yang terlihat.
          </Typography>
          <Typography as="global-description">
            Tambah properti <TextCode text="useAutoWidth" /> pada komponen <TextCode text="TableVirtual" />.
          </Typography>
        </div>
        <ToggleShowCode show={show} setShow={setShow} />
      </div>
      <div className="w-full h-[25rem]">
        <TableVirtual useAutoWidth headers={headers} dataSource={dummyData} headerModel="single-row" stickyHeaderHeight={40} />
      </div>
      <ContentExampleCode show={show} code={code} />
    </>
  );
};

export default memo(TableAutoWidth);

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
    render: (data) => (
      <div className={clsx('w-max p-1 rounded text-xs text-white', data?.isActive ? 'bg-green-700/80' : 'bg-orange-700/70')}>
        {data?.isActive ? 'Active' : 'Inactive'}
      </div>
    ),
  },
];

export default function TableAutoWidth() {
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
