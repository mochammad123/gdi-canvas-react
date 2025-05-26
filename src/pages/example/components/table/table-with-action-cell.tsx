import { memo, useMemo, useState } from 'react';
import clsx from 'clsx';

import { generateTableFilterOptions, ITableVirtual, TableVirtual } from '@/components/ui/table-virtual';
import { Typography } from '@/components/ui/typhography';
import { dummyData, IDummyData } from './data';
import TextCode from './text-code';
import ToggleShowCode from '@/components/toggle-show-code';
import ContentExampleCode from '@/components/content-example-code';

const TableWithActionCell = () => {
  const [showCode, setShowCode] = useState({
    table1: false,
    table2: false,
  });

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
      { key: 'action', caption: '', fixedWidth: 32 },
    ];
  }, []);

  const headers2 = useMemo((): ITableVirtual<IDummyData>['headers'] => {
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
        key: 'action',
        caption: '',
        fixedWidth: 100,
        render: (data) => (
          <div className="w-full flex items-center gap-2">
            <button className="bg-blue-950 text-white rounded p-1" onClick={() => console.log('EDIT: ', data)}>
              Edit
            </button>
            <button className="bg-red-700 text-white rounded p-1" onClick={() => console.log('HAPUS: ', data)}>
              Hapus
            </button>
          </div>
        ),
      },
    ];
  }, []);

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <Typography as="global-description">
              Define pada item header dengan key khusus yaitu <b>action</b>.
            </Typography>
            <Typography as="global-description">
              By default akan muncul cell action dengan isian icon vertical dots, yang akan menjadi toggle pembuka popup card pilihan action.
            </Typography>
            <Typography as="global-description">
              Untuk menambahkan elemen card action, tambah opsi <TextCode text="renderActionCard" /> pada properti <TextCode text="TableVirtual" />{' '}
              dengan return sebuah elemen JSX.
            </Typography>
          </div>
          <ToggleShowCode show={showCode.table1} setShow={() => setShowCode((prev) => ({ ...prev, table1: !prev.table1 }))} />
        </div>

        <div className="w-full h-[25rem]">
          <TableVirtual
            useAutoWidth
            headers={headers}
            dataSource={dummyData}
            headerModel="single-row"
            stickyHeaderHeight={40}
            renderActionCard={(data: unknown, _rowIndex) => {
              const selectedData = data as IDummyData;
              const actions = [
                {
                  label: 'Edit',
                  onClick: () => console.log('EDIT ==> ' + JSON.stringify(selectedData)),
                },
                {
                  label: 'Hapus',
                  onClick: () => console.log('HAPUS ==> ' + JSON.stringify(selectedData)),
                },
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
        <ContentExampleCode show={showCode.table1} code={codeTable1} />
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <Typography as="global-description">
              Define pada item header dengan key khusus yaitu <b>action</b>.
            </Typography>
            <Typography as="global-description">
              Tambah properti <TextCode text="render" /> pada item header dengan key khusus yaitu <b>action</b> dengan return sebuah elemen JSX berupa
              button action yang di ingingkan.
            </Typography>
          </div>
          <ToggleShowCode show={showCode.table2} setShow={() => setShowCode((prev) => ({ ...prev, table2: !prev.table2 }))} />
        </div>
        <div className="w-full h-[25rem]">
          <TableVirtual useAutoWidth headers={headers2} dataSource={dummyData} headerModel="single-row" stickyHeaderHeight={40} />
        </div>
        <ContentExampleCode show={showCode.table2} code={codeTable2} />
      </div>
    </>
  );
};

export default memo(TableWithActionCell);

const codeTable1 = `
import { useMemo,  } from 'react';
import clsx from 'clsx';

import { generateTableFilterOptions, ITableVirtual, TableVirtual } from '@/components/ui/table-virtual';
import { dummyData, IDummyData } from './data';

export default function TableWithActionCell() {
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
      { key: 'action', caption: '', fixedWidth: 32 },
    ];
  }, []);

  return (
    <>
        <div className="w-full h-[25rem]">
          <TableVirtual
            useAutoWidth
            headers={headers}
            dataSource={dummyData}
            headerModel="single-row"
            stickyHeaderHeight={40}
            renderActionCard={(data: unknown, _rowIndex) => {
              const selectedData = data as IDummyData;
              const actions = [
                {
                  label: 'Edit',
                  onClick: () => console.log('EDIT ==> ' + JSON.stringify(selectedData)),
                },
                {
                  label: 'Hapus',
                  onClick: () => console.log('HAPUS ==> ' + JSON.stringify(selectedData)),
                },
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
    </>
  );
}
`;

const codeTable2 = `
import { useMemo,  } from 'react';
import clsx from 'clsx';

import { generateTableFilterOptions, ITableVirtual, TableVirtual } from '@/components/ui/table-virtual';
import { dummyData, IDummyData } from './data';

export default function TableWithActionCell() {
  const headers2 = useMemo((): ITableVirtual<IDummyData>['headers'] => {
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
        key: 'action',
        caption: '',
        fixedWidth: 100,
        render: () => (
          <div className="w-full flex items-center gap-2">
            <button className="bg-blue-950 text-white rounded p-1">Edit</button>
            <button className="bg-red-700 text-white rounded p-1">Hapus</button>
          </div>
        ),
      },
    ];
  }, []);

  return (
    <>
        <div className="w-full h-[25rem]">
          <TableVirtual useAutoWidth headers={headers2} dataSource={dummyData} headerModel="single-row" stickyHeaderHeight={40} />
        </div>
    </>
  );
}
`;
