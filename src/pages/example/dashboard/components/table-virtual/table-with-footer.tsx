import { useMemo, useState } from 'react';

import { generateTableFilterOptions, ITableVirtual } from '@/components/ui/table-virtual';
import TableVirtual from '@/components/ui/table-virtual/table-virtual';
import { Typography } from '@/components/ui/typhography';
import ToggleShowCode from '../toggle-show-code';
import ContentExampleCode from '../content-example-code';
import { dummyData, IDummyData } from './data';
import clsx from 'clsx';
import TextCode from './text-code';

export default function TableWithFooter() {
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
        renderSummary: () => <div className="px-1.5">SUMMARY FOOTER</div>,
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
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <Typography as="global-description">
            Tambah properti <TextCode text="useFooter" /> pada komponen <TextCode text="TableVirtual" />.
          </Typography>
          <Typography as="global-description">
            Untuk memberi konten pada cell footer, tambah properti <TextCode text="renderSummary" /> pada item header yang di inginkan.
          </Typography>
        </div>
        <ToggleShowCode show={show} setShow={setShow} />
      </div>
      <div className="w-full h-[25rem]">
        <TableVirtual useFooter headers={headers} dataSource={dummyData.slice(0, 4)} headerModel="single-row" stickyHeaderHeight={40} />
      </div>
      <ContentExampleCode show={show} code={code} />
    </>
  );
}

const code = `
import { useMemo } from 'react';
import clsx from 'clsx';

import { generateTableFilterOptions, ITableVirtual } from '@/components/ui/table-virtual';
import TableVirtual from '@/components/ui/table-virtual/table-virtual';
import { dummyData, IDummyData } from './data';

export default function TableWithFooter() {
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
      renderSummary: () => <div className="px-1.5">SUMMARY FOOTER</div>,
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
      <div className="w-full h-[25rem]">
        <TableVirtual
          useFooter
          headers={headers}
          dataSource={dummyData}
          headerModel="single-row"
          stickyHeaderHeight={40}
        />
      </div>
    </>
  );
}
`;
