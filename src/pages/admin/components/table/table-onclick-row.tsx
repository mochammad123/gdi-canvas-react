import { memo, useMemo, useState } from 'react';

import { generateTableFilterOptions, ITableVirtual } from '@/components/ui/table-virtual';
import TableVirtual from '@/components/ui/table-virtual/table-virtual';
import { Typography } from '@/components/ui/typhography';
import { dummyData, IDummyData } from './data';
import clsx from 'clsx';
import TextCode from './text-code';
import ToggleShowCode from '@/components/toggle-show-code';
import ContentExampleCode from '@/components/content-example-code';

const TableOnClickRow = () => {
  const [show, setShow] = useState<boolean>(false);

  const headers = useMemo((): ITableVirtual<IDummyData>['headers'] => {
    const getFilterOptions = (key: keyof IDummyData) => generateTableFilterOptions(dummyData, key);

    return [
      {
        key: 'name',
        caption: 'Nama',
        filterOptions: getFilterOptions('name'),
        useFilter: true,
        useSearch: true,
        useAdvanceFilter: true,
      },
      { key: 'email', caption: 'Email', filterOptions: getFilterOptions('email'), useFilter: true, useSearch: true, useAdvanceFilter: true },
      {
        key: 'age',
        caption: 'Umur',
        className: '!text-end',
        filterOptions: getFilterOptions('age'),
        useFilter: true,
        useSearch: true,
        useAdvanceFilter: true,
      },
      {
        key: 'isActive',
        caption: 'Aktif',
        filterOptions: getFilterOptions('isActive'),
        useFilter: true,
        useSearch: true,
        useAdvanceFilter: true,
        render: (data) => (
          <div className={clsx('w-max p-1 rounded text-xs text-white', data?.isActive ? 'bg-green-700/80' : 'bg-orange-700/70')}>
            {data?.isActive ? 'Active' : 'Inactive'}
          </div>
        ),
      },
      {
        key: 'createdAt',
        caption: 'Tanggal Daftar',
        filterOptions: getFilterOptions('createdAt'),
        useFilter: true,
        useSearch: true,
        useAdvanceFilter: true,
      },
      {
        key: 'phone',
        caption: 'No. Telepon',
        filterOptions: ['Custom Text 1', 'Custom Text 2', 'Custom Text 3'],
        useFilter: true,
        useSearch: true,
        useAdvanceFilter: true,
      },
      { key: 'address', caption: 'Alamat', useFilter: true, useSearch: true, useAdvanceFilter: true },
      { key: 'city', caption: 'Kota', useFilter: true, useSearch: true, useAdvanceFilter: true },
    ];
  }, []);

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <Typography as="global-description">
            Tambah properti <TextCode text="onClickRow" /> pada komponen <TextCode text="TableVirtual" />.
          </Typography>
          <Typography as="global-description">
            Properti <TextCode text="onClickRow" /> akan mengembalikan nilai data dari 1 row, dan index row yang diklik.
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
          onClickRow={(data, rowIndex) => console.log('On Click Row => ', { rowIndex, data })}
        />
      </div>
      <ContentExampleCode show={show} code={code} />
    </>
  );
};

export default memo(TableOnClickRow);

const code = `
import { useMemo } from 'react';
import clsx from 'clsx';

import { generateTableFilterOptions, ITableVirtual } from '@/components/ui/table-virtual';
import TableVirtual from '@/components/ui/table-virtual/table-virtual';
import { dummyData, IDummyData } from './data';

export default function TableOnClickRow() {
  const headers = useMemo((): ITableVirtual<IDummyData>['headers'] => {
    const getFilterOptions = (key: keyof IDummyData) => generateTableFilterOptions(dummyData, key);

    return [
      {
        key: 'name',
        caption: 'Nama',
        filterOptions: getFilterOptions('name'),
        useFilter: true,
        useSearch: true,
        useAdvanceFilter: true,
      },
      { key: 'email', caption: 'Email', filterOptions: getFilterOptions('email'), useFilter: true, useSearch: true, useAdvanceFilter: true },
      {
        key: 'age',
        caption: 'Umur',
        className: '!text-end',
        filterOptions: getFilterOptions('age'),
        useFilter: true,
        useSearch: true,
        useAdvanceFilter: true,
      },
      {
        key: 'isActive',
        caption: 'Aktif',
        filterOptions: getFilterOptions('isActive'),
        useFilter: true,
        useSearch: true,
        useAdvanceFilter: true,
        render: (data) => (
          <div className={clsx('w-max p-1 rounded text-xs text-white', data?.isActive ? 'bg-green-700/80' : 'bg-orange-700/70')}>
            {data?.isActive ? 'Active' : 'Inactive'}
          </div>
        ),
      },
      {
        key: 'createdAt',
        caption: 'Tanggal Daftar',
        filterOptions: getFilterOptions('createdAt'),
        useFilter: true,
        useSearch: true,
        useAdvanceFilter: true,
      },
      {
        key: 'phone',
        caption: 'No. Telepon',
        filterOptions: ['Custom Text 1', 'Custom Text 2', 'Custom Text 3'],
        useFilter: true,
        useSearch: true,
        useAdvanceFilter: true,
      },
      { key: 'address', caption: 'Alamat', useFilter: true, useSearch: true, useAdvanceFilter: true },
      { key: 'city', caption: 'Kota', useFilter: true, useSearch: true, useAdvanceFilter: true },
    ];
  }, []);

  return (
    <>
      <div className="w-full h-[25rem]">
        <TableVirtual
          headers={headers}
          dataSource={dummyData}
          headerModel="single-row"
          stickyHeaderHeight={40}
          onClickRow={(data, rowIndex) => console.log('On Click Row => ', { rowIndex, data })}
        />
      </div>
    </>
  );
}
`;
