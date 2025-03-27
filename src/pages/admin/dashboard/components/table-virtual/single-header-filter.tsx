import { ITableVirtual, TableVirtual } from '@/components/ui/table-virtual-v2';
import clsx from 'clsx';
import { memo, useMemo, useState } from 'react';
import ContentExampleCode from '../content-example-code';
import ToggleShowCode from '../toggle-show-code';
import { Typography } from '@/components/ui/typhography';
import { dummyData, IDummyData } from './data';
import { generateTableFilterOptions } from '@/components/ui/table-virtual-v2/utils';

const SingleHeaderFilter = () => {
  const [show, setShow] = useState<boolean>(false);

  const headers = useMemo((): ITableVirtual<IDummyData>['headers'] => {
    const getFilterOptions = (key: keyof IDummyData) => generateTableFilterOptions(dummyData, key);

    return [
      { key: 'name', caption: 'Nama', filterOptions: getFilterOptions('name'), useFilter: true, useSearch: true, useAdvanceFilter: true },
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
        render: (value) => (
          <div className={clsx('w-max p-1 rounded text-xs text-white', value ? 'bg-green-700/80' : 'bg-orange-700/70')}>
            {value ? 'Active' : 'Inactive'}
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
      <div className="flex justify-between items-center">
        <Typography as="global-description">Table dengan headerModel single-header, dan filter yang ditampilkan semua.</Typography>
        <ToggleShowCode show={show} setShow={setShow} />
      </div>

      <div className="w-full h-[25rem]">
        <TableVirtual headers={headers} dataSource={dummyData} headerModel="single-row" stickyHeaderHeight={40} />
      </div>

      <ContentExampleCode show={show} code={StandarSingleRowExample} />
    </>
  );
};

export default memo(SingleHeaderFilter);

export const StandarSingleRowExample = `
import clsx from 'clsx';
import { dummyData, IDummyData } from './data';
import { TableVirtualV2, ITableVirtual } from '@/components/ui/table-virtual-v2';

export default function StandarSingleRow() {
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
      {
        key: 'email',
        caption: 'Email',
        filterOptions: getFilterOptions('email'),
        useFilter: true,
        useSearch: true,
        useAdvanceFilter: true,
      },
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
        render: (value) => (
          <div
            className={clsx(
              'w-max p-1 rounded text-xs text-white',
              value ? 'bg-green-700/80' : 'bg-orange-700/70'
            )}
          >
            {value ? 'Active' : 'Inactive'}
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
      {
        key: 'address',
        caption: 'Alamat',
        useFilter: true,
        useSearch: true,
        useAdvanceFilter: true,
      },
      { key: 'city', caption: 'Kota', useFilter: true, useSearch: true, useAdvanceFilter: true },
    ];
  }, []);

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
