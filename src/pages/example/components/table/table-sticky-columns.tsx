import { memo, useState } from 'react';
import clsx from 'clsx';

import { generateTableFilterOptions, ITableVirtual, TableVirtual } from '@/components/ui/table-virtual';
import { Typography } from '@/components/ui/typhography';
import { dummyData, IDummyData } from './data';
import TextCode from './text-code';
import ToggleShowCode from '@/components/toggle-show-code';
import ContentExampleCode from '@/components/content-example-code';

const TableStickyColumn = () => {
  const [show, setShow] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(false);

  const headers = (type: 'left' | 'right') => {
    const getFilterOptions = (key: keyof IDummyData) => generateTableFilterOptions(dummyData, key);

    const commonHeaders: ITableVirtual<IDummyData>['headers'] = [
      { key: 'name', caption: 'Nama', freezed: type === 'left' },
      { key: 'email', caption: 'Email' },
      { key: 'age', caption: 'Umur', className: '!text-end' },
      {
        key: 'isActive',
        caption: 'Aktif',
        freezed: true,
        render: (data) => (
          <div className={clsx('w-max p-1 rounded text-xs text-white', data?.isActive ? 'bg-green-700/80' : 'bg-orange-700/70')}>
            {data?.isActive ? 'Active' : 'Inactive'}
          </div>
        ),
      },
      { key: 'createdAt', caption: 'Tanggal Daftar' },
      { key: 'phone', caption: 'No. Telepon' },
      { key: 'address', caption: 'Alamat' },
      { key: 'city', caption: 'Kota', freezedRight: type === 'right' },
      { key: 'action', caption: '', fixedWidth: 32, freezedRight: type === 'right' },
    ];

    return commonHeaders.map((header) => ({
      ...header,
      useSearch: true,
      useFilter: true,
      useAdvanceFilter: true,
      filterOptions: getFilterOptions(header.key as keyof IDummyData),
    }));
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <Typography as="global-report-title">Freezed on the Left</Typography>
            <Typography as="global-description">
              Tambah properti <TextCode text="freezed" /> dengan nilai true, pada item header yang di inginkan.
            </Typography>
            <Typography as="global-description">Header yang di freezed akan selalu berada di sebelah kiri.</Typography>
          </div>
          <ToggleShowCode show={show} setShow={setShow} />
        </div>
        <div className="w-full h-[25rem]">
          <TableVirtual headers={headers('left')} dataSource={dummyData} headerModel="single-row" stickyHeaderHeight={40} />
        </div>
        <ContentExampleCode show={show} code={code1} />
      </div>

      <hr className="my-6" />

      <div>
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <Typography as="global-report-title">Freezed on the Right</Typography>
            <Typography as="global-description">
              Tambah properti <TextCode text="freezedRight" /> dengan nilai true, pada item header yang di inginkan.
            </Typography>
            <Typography as="global-description">Header yang di freezedRight akan selalu berada di sebelah kanan.</Typography>
          </div>
          <ToggleShowCode show={show2} setShow={setShow2} />
        </div>
        <div className="w-full h-[25rem]">
          <TableVirtual
            headers={headers('right')}
            dataSource={dummyData}
            headerModel="single-row"
            stickyHeaderHeight={40}
            renderActionCard={(data: unknown, _rowIndex) => {
              const selectedData = data as IDummyData;
              const actions = [
                { label: 'Edit', onClick: () => console.log('EDIT:' + JSON.stringify(selectedData)) },
                { label: 'Hapus', onClick: () => console.log('HAPUS:' + JSON.stringify(selectedData)) },
              ];

              return (
                <div className={clsx('shadow-lg w-[3.813rem] flex flex-col space-y-1')}>
                  {actions.map(({ label, onClick }, idx) => (
                    <button
                      key={'table-action' + idx}
                      className="global-report-content text-start hover:bg-blue-950 hover:text-white py-1 pl-2 cursor-pointer"
                      onClick={onClick}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              );
            }}
          />
        </div>
        <ContentExampleCode show={show2} code={code2} />
      </div>
    </>
  );
};

export default memo(TableStickyColumn);

const code1 = `
import clsx from 'clsx';

import { generateTableFilterOptions, ITableVirtual, TableVirtual } from '@/components/ui/table-virtual';
import { Typography } from '@/components/ui/typhography';
import { dummyData, IDummyData } from './data';

export default function TableStickyColumn() {
  const headers = () => {
    const getFilterOptions = (key: keyof IDummyData) => generateTableFilterOptions(dummyData, key);

    const commonHeaders: ITableVirtual<IDummyData>['headers'] = [
      { key: 'name', caption: 'Nama', freezed: true },
      { key: 'email', caption: 'Email' },
      { key: 'age', caption: 'Umur', className: '!text-end' },
      {
        key: 'isActive',
        caption: 'Aktif',
        freezed: true,
        render: (data) => (
          <div
            className={clsx(
              'w-max p-1 rounded text-xs text-white',
              data?.isActive ? 'bg-green-700/80' : 'bg-orange-700/70'
            )}
          >
            {data?.isActive ? 'Active' : 'Inactive'}
          </div>
        ),
      },
      { key: 'createdAt', caption: 'Tanggal Daftar' },
      { key: 'phone', caption: 'No. Telepon' },
      { key: 'address', caption: 'Alamat' },
      { key: 'city', caption: 'Kota'},
      { key: 'action', caption: '', fixedWidth: 32 },
    ];

    return commonHeaders.map((header) => ({
      ...header,
      useSearch: true,
      useFilter: true,
      useAdvanceFilter: true,
      filterOptions: getFilterOptions(header.key as keyof IDummyData),
    }));
  };

  return (
    <>
      <div className="w-full h-[25rem]">
        <TableVirtual
          headers={headers()}
          dataSource={dummyData}
          headerModel="single-row"
          stickyHeaderHeight={40}
        />
      </div>
    </>
  );
}`;

const code2 = `
import clsx from 'clsx';

import { generateTableFilterOptions, ITableVirtual, TableVirtual } from '@/components/ui/table-virtual';
import { Typography } from '@/components/ui/typhography';
import { dummyData, IDummyData } from './data';

export default function TableStickyColumn() {
  const headers = () => {
    const getFilterOptions = (key: keyof IDummyData) => generateTableFilterOptions(dummyData, key);

    const commonHeaders: ITableVirtual<IDummyData>['headers'] = [
      { key: 'name', caption: 'Nama', freezed: true },
      { key: 'email', caption: 'Email' },
      { key: 'age', caption: 'Umur', className: '!text-end' },
      {
        key: 'isActive',
        caption: 'Aktif',
        freezed: true,
        render: (data) => (
          <div
            className={clsx(
              'w-max p-1 rounded text-xs text-white',
              data?.isActive ? 'bg-green-700/80' : 'bg-orange-700/70'
            )}
          >
            {data?.isActive ? 'Active' : 'Inactive'}
          </div>
        ),
      },
      { key: 'createdAt', caption: 'Tanggal Daftar' },
      { key: 'phone', caption: 'No. Telepon' },
      { key: 'address', caption: 'Alamat' },
      { key: 'city', caption: 'Kota', freezedRight: true },
      { key: 'action', caption: '', fixedWidth: 32, freezedRight: true },
    ];

    return commonHeaders.map((header) => ({
      ...header,
      useSearch: true,
      useFilter: true,
      useAdvanceFilter: true,
      filterOptions: getFilterOptions(header.key as keyof IDummyData),
    }));
  };

  return (
    <>
      <div className="w-full h-[25rem]">
        <TableVirtual
          headers={headers()}
          dataSource={dummyData}
          headerModel="single-row"
          stickyHeaderHeight={40}
        />
      </div>
    </>
  );
}`;
