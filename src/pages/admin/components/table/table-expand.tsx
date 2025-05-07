import { memo, useMemo, useState } from 'react';

import ContentExampleCode from '@/components/content-example-code';
import ToggleShowCode from '@/components/toggle-show-code';
import { generateTableFilterOptions, ITableVirtual } from '@/components/ui/table-virtual';
import TableVirtual from '@/components/ui/table-virtual/table-virtual';
import { Typography } from '@/components/ui/typhography';
import clsx from 'clsx';
import { dummyData, IDummyData } from './data';
import TextCode from './text-code';

const TableExpand = () => {
  const [show, setShow] = useState<boolean>(false);
  const [rows, setRows] = useState(dummyData);

  const headers = useMemo((): ITableVirtual<IDummyData>['headers'] => {
    const getFilterOptions = (key: keyof IDummyData) => generateTableFilterOptions(dummyData, key);

    return [
      {
        key: 'expand',
        fixedWidth: 50,
        caption: '',
        useFilter: false,
        useSearch: false,
        useSort: false,
      },
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
        render: (data) => new Date(data?.createdAt || '').toLocaleString(),
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

  const headersExpand = useMemo((): ITableVirtual<IDummyData>['headers'] => {
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
        render: (data) => new Date(data?.createdAt || '').toLocaleString(),
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

  function TableVirtualExtend({ id }: { id: number }) {
    return (
      <TableVirtual
        key={id}
        headers={headersExpand}
        dataSource={dummyData}
        headerModel="single-row"
        stickyHeaderHeight={40}
        onClickRow={(data, rowIndex) => console.log('On Click Row => ', { rowIndex, data })}
      />
    );
  }

  return (
    <div className="p-2">
      <div className="flex justify-between items-start mb-3">
        <div className="flex flex-col gap-2">
          <Typography as="global-description">
            Tambah properti <TextCode text="onExpandRow" /> dan <TextCode text="expandComponent" /> pada komponen <TextCode text="TableVirtual" />.
          </Typography>
          <Typography as="global-description">
            Properti <TextCode text="expandComponent" /> akan mengembalikan nilai callback id dari row yang di klik
          </Typography>
        </div>
        <ToggleShowCode show={show} setShow={setShow} />
      </div>
      <div className="w-full h-[25rem]">
        <TableVirtual
          headers={headers}
          dataSource={rows}
          stickyHeaderHeight={40}
          onExpandRow={(id, status) => {
            if (status) {
              setRows((rows) => {
                const findIndex = rows.findIndex((item) => item.id === id);
                if (findIndex === -1) return rows;
                const newItem = { id: `expanded-${id}` } as unknown as IDummyData;
                return [...rows.slice(0, findIndex + 1), newItem, ...rows.slice(findIndex + 1)];
              });
              return;
            }

            const expandedId = `expanded-${id}`;
            setRows((rows) => {
              const findIndex = rows.findIndex((item) => String(item.id) === expandedId);
              if (findIndex === -1) return rows;
              return rows.filter((item) => String(item.id) !== expandedId);
            });
          }}
          expandComponent={(id) => {
            return <TableVirtualExtend id={id} />;
          }}
          onClickRow={(data, rowIndex) => console.log('On Click Row => ', { rowIndex, data })}
        />
      </div>
      <ContentExampleCode show={show} code={code} />
    </div>
  );
};

export default memo(TableExpand);

const code = `
import { memo, useMemo, useState } from 'react';

import ContentExampleCode from '@/components/content-example-code';
import ToggleShowCode from '@/components/toggle-show-code';
import { generateTableFilterOptions, ITableVirtual } from '@/components/ui/table-virtual';
import TableVirtual from '@/components/ui/table-virtual/table-virtual';
import { Typography } from '@/components/ui/typhography';
import clsx from 'clsx';
import { dummyData, IDummyData } from './data';
import TextCode from './text-code';

const TableExpand = () => {
  const [show, setShow] = useState<boolean>(false);
  const [rows, setRows] = useState(dummyData);

  const headers = useMemo((): ITableVirtual<IDummyData>['headers'] => {
    const getFilterOptions = (key: keyof IDummyData) => generateTableFilterOptions(dummyData, key);

    return [
      {
        key: 'expand',
        fixedWidth: 50,
        caption: '',
        useFilter: false,
        useSearch: false,
        useSort: false,
      },
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
        render: (data) => new Date(data?.createdAt || '').toLocaleString(),
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

  const headersExpand = useMemo((): ITableVirtual<IDummyData>['headers'] => {
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
        render: (data) => new Date(data?.createdAt || '').toLocaleString(),
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

  function TableVirtualExtend({ id }: { id: number }) {
    return (
        <TableVirtual
          key={id}
          headers={headersExpand}
          dataSource={dummyData}
          headerModel="single-row"
          stickyHeaderHeight={40}
          onClickRow={(data, rowIndex) => console.log('On Click Row => ', { rowIndex, data })}
        />
    );
  }

  return (
    <div className="p-2">
      <div className="flex justify-between items-start mb-3">
        <div className="flex flex-col gap-2">
          <Typography as="global-description">
            Tambah properti <TextCode text="onExpandRow" /> dan <TextCode text="expandComponent" /> pada komponen <TextCode text="TableVirtual" />.
          </Typography>
          <Typography as="global-description">
            Properti <TextCode text="expandComponent" /> akan mengembalikan nilai callback id dari row yang di klik
          </Typography>
        </div>
        <ToggleShowCode show={show} setShow={setShow} />
      </div>
      <div className="w-full h-[25rem]">
        <TableVirtual
          headers={headers}
          dataSource={rows}
          stickyHeaderHeight={40}
          onExpandRow={(id, status) => {
            if (status) {
              setRows((rows) => {
                const findIndex = rows.findIndex((item) => item.id === id);
                if (findIndex === -1) return rows;
                const newItem = { id: 'expanded-{id}' } as unknown as IDummyData;
                return [...rows.slice(0, findIndex + 1), newItem, ...rows.slice(findIndex + 1)];
              });
              return;
            }

            const expandedId = 'expanded-{id}';
            setRows((rows) => {
              const findIndex = rows.findIndex((item) => String(item.id) === expandedId);
              if (findIndex === -1) return rows;
              return rows.filter((item) => String(item.id) !== expandedId);
            });
          }}
          expandComponent={(id) => {
            return <TableVirtualExtend id={id} />;
          }}
          onClickRow={(data, rowIndex) => console.log('On Click Row => ', { rowIndex, data })}
        />
      </div>
      <ContentExampleCode show={show} code={code} />
    </div>
  );
};
`;
