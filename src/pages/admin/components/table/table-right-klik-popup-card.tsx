import { memo, useState } from 'react';
import clsx from 'clsx';

import { TableVirtual, ITableVirtual } from '@/components/ui/table-virtual';
import { Typography } from '@/components/ui/typhography';
import { dummyData, IDummyData } from './data';
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
  { key: 'createdAt', caption: 'Tanggal Daftar' },
  { key: 'phone', caption: 'No. Telepon' },
  { key: 'address', caption: 'Alamat' },
  { key: 'city', caption: 'Kota' },
];

const TableRightClickPopUpCard = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <Typography as="global-description">
            Tambah properti <TextCode text="renderRightClickRow" /> pada komponen <TextCode text="TableVirtual" /> dengan return sebuah elemen JSX
            sebagai konten dari Pop Up Card.
          </Typography>
          <Typography as="global-description">
            Properti <TextCode text="renderRightClickRow" /> akan mengirimkan props berupa data dari 1 row, dan index row yang diklik, dan juga
            callback function untuk trigger close popup card pada komponen TableVirtual.
          </Typography>
        </div>
        <ToggleShowCode show={show} setShow={setShow} />
      </div>

      <div className="w-full h-[25rem]">
        <TableVirtual
          headers={headers}
          dataSource={dummyData}
          headerModel="single-row"
          stickyHeaderHeight={40}
          renderRightClickRow={(data, value, callbackFn) => <RightClickContent data={data} value={value} callbackFn={callbackFn} />}
        />
      </div>

      <ContentExampleCode show={show} code={StandarSingleRowExample} />
    </>
  );
};

export default memo(TableRightClickPopUpCard);

interface IRightClickContentProps {
  data: Record<string, string | number> | null;
  value: string | number;
  callbackFn?: () => void;
}

const RightClickContent = ({ data, value, callbackFn }: IRightClickContentProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleClickHapus = () => {
    console.log('HAPUS: ', data);
    callbackFn?.();
  };

  const handleClickCopy = () => {
    navigator.clipboard
      .writeText(value.toString())
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
          callbackFn?.();
        }, 100);
      })
      .catch(() => console.log('Failed to copy!'));
  };

  return (
    <div className="max-w-sm overflow-auto p-4 text-sm flex flex-col gap-2">
      <button className="cursor-pointer p-1.5 bg-red-600 text-white rounded inline-flex items-center" onClick={handleClickHapus}>
        Hapus
      </button>
      <button className="cursor-pointer p-1.5 bg-blue-950 text-white rounded inline-flex items-center" onClick={handleClickCopy}>
        {isCopied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
};

export const StandarSingleRowExample = `
import { memo } from 'react';
import clsx from 'clsx';

import { TableVirtual, ITableVirtual } from '@/components/ui/table-virtual';
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

const TableRightClickPopUpCard = () => {
  return (
    <>
      <div className="w-full h-[25rem]">
        <TableVirtual
          headers={headers}
          dataSource={dummyData}
          headerModel="single-row"
          stickyHeaderHeight={40}
          renderRightClickRow={(data, value, callbackFn) => <RightClickContent data={data} value={value} callbackFn={callbackFn} />}
        />
      </div>
    </>
  );
};

export default memo(TableRightClickPopUpCard);

interface IRightClickContentProps {
  data: Record<string, string | number> | null;
  value: string | number;
  callbackFn?: () => void;
}

const RightClickContent = ({ data, value, callbackFn }: IRightClickContentProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleClickHapus = () => {
    console.log('HAPUS: ', data);
    callbackFn?.();
  };

  const handleClickCopy = () => {
    navigator.clipboard
      .writeText(value.toString())
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
          callbackFn?.();
        }, 100);
      })
      .catch(() => console.log('Failed to copy!'));
  };

  return (
    <div className="max-w-sm overflow-auto p-4 text-sm flex flex-col gap-2">
      <button className="cursor-pointer p-1.5 bg-red-600 text-white rounded inline-flex items-center" onClick={handleClickHapus}>
        Hapus
      </button>
      <button className="cursor-pointer p-1.5 bg-blue-950 text-white rounded inline-flex items-center" onClick={handleClickCopy}>
        {isCopied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
};
`;
