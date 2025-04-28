import clsx from 'clsx';
import { memo, useState } from 'react';

import ContentExampleCode from '@/components/content-example-code';
import ToggleShowCode from '@/components/toggle-show-code';
import { ITableVirtual, TableVirtual } from '@/components/ui/table-virtual';
import { Typography } from '@/components/ui/typhography';
import { fallbackCopyTextToClipboard } from '@/lib/utils/utils';
import { dummyData, IDummyData } from './data';
import TextCode from './text-code';

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
  const [isCopied, setIsCopied] = useState({
    'Copy Kolom': false,
    'Copy Baris': false,
  });

  const handleClickHapus = () => {
    console.log('HAPUS: ', data);
    callbackFn?.();
  };

  const handleClickCopy = (value: string, key: keyof typeof isCopied) => {
    const isSuccess = fallbackCopyTextToClipboard(value);
    if (isSuccess) {
      setIsCopied((prev) => ({ ...prev, [key]: true }));

      setTimeout(() => {
        setIsCopied((prev) => ({ ...prev, [key]: false }));
        callbackFn?.();
      }, 200);
    } else {
      console.log('Failed to copy!');
    }
  };

  const options = [
    { label: 'Hapus', onClick: handleClickHapus },
    { label: 'Copy Kolom', onClick: () => handleClickCopy(value.toString(), 'Copy Kolom') },
    { label: 'Copy Baris', onClick: () => handleClickCopy(JSON.stringify(data), 'Copy Baris') },
  ];

  return (
    <div className="max-w-sm overflow-auto p-1 text-xs flex flex-col gap-1">
      {options.map((item, idx) => {
        return (
          <button
            key={item.label}
            className={clsx(
              'cursor-pointer p-1.5 px-3 bg-blue-950 text-white rounded inline-flex items-center',
              idx === 0 && '!bg-red-800/80',
              idx === 1 && '!bg-green-800/80'
            )}
            onClick={item.onClick}
          >
            {isCopied[item.label as keyof typeof isCopied] ? 'Copied' : item.label}
          </button>
        );
      })}
    </div>
  );
};

export const StandarSingleRowExample = `
import { memo } from 'react';
import clsx from 'clsx';

import { fallbackCopyTextToClipboard } from '@/lib/utils/utils';
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
  const [isCopied, setIsCopied] = useState({
    'Copy Kolom': false,
    'Copy Baris': false,
  });

  const handleClickHapus = () => {
    console.log('HAPUS: ', data);
    callbackFn?.();
  };

  const handleClickCopy = (value: string, key: keyof typeof isCopied) => {
    const isSuccess = fallbackCopyTextToClipboard(value);
    if (isSuccess) {
      setIsCopied((prev) => ({ ...prev, [key]: true }));

      setTimeout(() => {
        setIsCopied((prev) => ({ ...prev, [key]: false }));
        callbackFn?.();
      }, 200);
    } else {
      console.log('Failed to copy!');
    }
  };

  const options = [
    { label: 'Hapus', onClick: handleClickHapus },
    { label: 'Copy Kolom', onClick: () => handleClickCopy(value.toString(), 'Copy Kolom') },
    { label: 'Copy Baris', onClick: () => handleClickCopy(JSON.stringify(data), 'Copy Baris') },
  ];

  return (
    <div className="max-w-sm overflow-auto p-1 text-xs flex flex-col gap-1">
      {options.map((item, idx) => {
        return (
          <button
            key={item.label}
            className={clsx(
              'cursor-pointer p-1.5 px-3 bg-blue-950 text-white rounded inline-flex items-center',
              idx === 0 && '!bg-red-800/80',
              idx === 1 && '!bg-green-800/80'
            )}
            onClick={item.onClick}
          >
            {isCopied[item.label as keyof typeof isCopied] ? 'Copied' : item.label}
          </button>
        );
      })}
    </div>
  );
};

`;
