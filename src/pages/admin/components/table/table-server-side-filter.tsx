import { ITableVirtual, TableVirtual } from '@/components/ui/table-virtual';
import clsx from 'clsx';
import { memo, useMemo, useState } from 'react';
import { Typography } from '@/components/ui/typhography';
import { dummyData, IDummyData } from './data';
import { generateTableFilterOptions } from '@/components/ui/table-virtual/utils';
import TextCode from './text-code';
import ToggleShowCode from '@/components/toggle-show-code';
import ContentExampleCode from '@/components/content-example-code';

const TableServerSideFilter = () => {
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
        useHeaderAction: false,
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
            Tambah properti <TextCode text="useServerFilter" /> <TextCode text="useServerSearch" /> <TextCode text="useServerSort" />{' '}
            <TextCode text="useServerAdvanceFilter" /> pada komponen <TextCode text="TableVirtual" />. Maka fungsi sorting, searching, dan filtering
            tidak akan berjalan di sisi client(Frontend)
          </Typography>
          <Typography as="global-description">
            Tambah properti <TextCode text="onChangeAdvanceFilter" /> <TextCode text="onChangeFilter" /> <TextCode text="onChangeSort" /> dan{' '}
            <TextCode text="onChangeSearch" /> <TextCode text="useServerAdvanceFilter" /> pada komponen <TextCode text="TableVirtual" /> untuk
            mengambil data filter, search, dan sorting yang nanti akan diolah kembali oleh FE untuk dikirimkan ke BE.
          </Typography>
        </div>
        <ToggleShowCode show={show} setShow={setShow} />
      </div>
      <div className="w-full h-[25rem]">
        <TableVirtual
          headers={headers}
          dataSource={dummyData}
          headerModel="double-row"
          stickyHeaderHeight={40}
          onChangeAdvanceFilter={(props) => console.log('CHANGE ADVANCE FILTER', props)}
          onChangeFilter={(props) => console.log('CHANGE FILTER', props)}
          onChangeSort={(sortKey, sortBy) => console.log('CHANGE SORT', sortKey, sortBy)}
          onChangeSearch={(data) => console.log('CHANGE SEARCH', data)}
          useServerFilter
          useServerSearch
          useServerSort
          useServerAdvanceFilter
        />
      </div>
      <ContentExampleCode show={show} code={StandarSingleRowExample} />
    </>
  );
};

export default memo(TableServerSideFilter);

export const StandarSingleRowExample = `
import { ITableVirtual, TableVirtual } from '@/components/ui/table-virtual';
import clsx from 'clsx';
import { memo, useMemo } from 'react';
import { dummyData, IDummyData } from './data';
import { generateTableFilterOptions } from '@/components/ui/table-virtual/utils';

const TableServerSideFilter = () => {
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
        useHeaderAction: false,
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
          headerModel="double-row"
          stickyHeaderHeight={40}
          onChangeAdvanceFilter={(props) => console.log('CHANGE ADVANCE FILTER', props)}
          onChangeFilter={(props) => console.log('CHANGE FILTER', props)}
          onChangeSort={(sortKey, sortBy) => console.log('CHANGE SORT', sortKey, sortBy)}
          onChangeSearch={(data) => console.log('CHANGE SEARCH', data)}
          useServerFilter
          useServerSearch
          useServerSort
          useServerAdvanceFilter
        />
      </div>
    </>
  );
};

export default memo(TableServerSideFilter);
`;
