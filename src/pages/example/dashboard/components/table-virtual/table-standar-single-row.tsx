import { memo, useState } from 'react';
import clsx from 'clsx';

import { TableVirtual, ITableVirtual } from '@/components/ui/table-virtual';
import { Typography } from '@/components/ui/typhography';
import ContentExampleCode from '../content-example-code';
import ToggleShowCode from '../toggle-show-code';
import { dummyData, IDummyData } from './data';

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
  { key: 'createdAt', caption: 'Tanggal Daftar' },
  { key: 'phone', caption: 'No. Telepon' },
  { key: 'address', caption: 'Alamat' },
  { key: 'city', caption: 'Kota' },
];

const TableStandarSingleRow = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <Typography as="global-description">By Default, sorting icon akan tampil.</Typography>
        <ToggleShowCode show={show} setShow={setShow} />
      </div>

      <div className="w-full h-[25rem]">
        <TableVirtual headers={headers} dataSource={dummyData} headerModel="single-row" stickyHeaderHeight={40} />
      </div>

      <ContentExampleCode show={show} code={StandarSingleRowExample} />
    </>
  );
};

export default memo(TableStandarSingleRow);

export const StandarSingleRowExample = `
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
      <div className={clsx('
        w-max p-1 rounded text-xs text-white',
        value ? 'bg-green-700/80' : 'bg-orange-700/70')}
      >
        {value ? 'Active' : 'Inactive'}
      </div>
    ),
  },
  { key: 'createdAt', caption: 'Tanggal Daftar' },
  { key: 'phone', caption: 'No. Telepon' },
  { key: 'address', caption: 'Alamat' },
  { key: 'city', caption: 'Kota' },
];

export default function StandarSingleRow() {
  return (
    <div className="w-full h-[25rem]">
      <TableVirtualV2
        headers={headers}
        dataSource={dummyData}
        headerModel="single-row"
        stickyHeaderHeight={40}
      />
    </div>
  )
}
`;
