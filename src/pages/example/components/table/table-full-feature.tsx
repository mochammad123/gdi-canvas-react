import ContentExampleCode from '@/components/content-example-code';
import ToggleShowCode from '@/components/toggle-show-code';
import { ITableVirtual, TableVirtual } from '@/components/ui/table-virtual';
import { generateTableFilterOptions } from '@/components/ui/table-virtual/utils';
import { Typography } from '@/components/ui/typhography';
import { fallbackCopyTextToClipboard } from '@/lib/utils/utils';
import clsx from 'clsx';
import { memo, useMemo, useState } from 'react';
import { dummyData, IDummyData } from './data';

const TableFullFeature = () => {
  const [show, setShow] = useState<boolean>(false);

  const oldestAge = dummyData.reduce((acc, curr) => Math.min(acc, curr.age), Infinity);

  const headers = useMemo(() => {
    const getFilterOptions = (key: keyof IDummyData) => generateTableFilterOptions(dummyData, key);

    const commonHeader: ITableVirtual<IDummyData>['headers'] = [
      { key: 'checkbox-selection', caption: '', fixedWidth: 37 },
      {
        key: 'name',
        caption: 'Nama',
        filterOptions: getFilterOptions('name'),
        renderSummary: () => (
          <div className="p-2 font-mono flex justify-center items-center bg-knitto-blue-100 text-white size-full">{dummyData.length} Users</div>
        ),
      },
      { key: 'email', caption: 'Email', filterOptions: getFilterOptions('email'), useFilter: true, useSearch: true, useAdvanceFilter: true },
      {
        key: 'age',
        caption: 'Umur',
        className: '!text-end',
        filterOptions: getFilterOptions('age'),
        renderSummary: () => (
          <div className="p-2 font-mono flex justify-center items-center bg-burnt-orange-60 text-white size-full">
            Umur Termuda adalah {oldestAge}
          </div>
        ),
      },
      {
        key: 'isActive',
        caption: 'Aktif',
        filterOptions: getFilterOptions('isActive'),
        render: (data) => (
          <div className={clsx('w-max p-1 rounded text-xs text-white', data?.isActive ? 'bg-green-700/80' : 'bg-orange-700/70')}>
            {data?.isActive ? 'Active' : 'Inactive'}
          </div>
        ),
      },
      { key: 'createdAt', caption: 'Tanggal Daftar', filterOptions: getFilterOptions('createdAt') },
      { key: 'phone', caption: 'No. Telepon', filterOptions: ['Custom Text 1', 'Custom Text 2', 'Custom Text 3'] },
      { key: 'address', caption: 'Alamat', useFilter: true, useSearch: true, useAdvanceFilter: true },
      { key: 'city', caption: 'Kota', useFilter: true, useSearch: true, useAdvanceFilter: true },
      { key: 'action', caption: '', fixedWidth: 37 },
    ];

    return commonHeader.map((header, index) => ({
      ...header,
      useFilter: true,
      useSingleFilter: index === 1 ? true : false,
      useSearch: true,
      useAdvanceFilter: index === 0 ? false : true,
    }));
  }, []);

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <Typography as="global-description">Komponen tabel dengan semua fitur.</Typography>
        </div>
        <ToggleShowCode show={show} setShow={setShow} />
      </div>

      <div className="w-full h-[25rem]">
        <TableVirtual
          useFooter
          headers={headers}
          dataSource={dummyData}
          headerModel="double-row"
          stickyHeaderHeight={40}
          checkBoxSelectionKey="name"
          onChangeCheckBoxSelection={(data) => console.log('CHECKBOX: ', data)}
          onChangeAdvanceFilter={(props) => console.log('CHANGE ADVANCE FILTER', props)}
          onChangeFilter={(props) => console.log('CHANGE FILTER', props)}
          onChangeSort={(sortKey, sortBy) => console.log('CHANGE SORT', sortKey, sortBy)}
          onChangeSearch={(data) => console.log('CHANGE SEARCH', data)}
          renderRightClickRow={(data, value, callbackFn) => <RightClickContent data={data} value={value} callbackFn={callbackFn} />}
          renderActionCard={(data: unknown, _rowIndex) => {
            const selectedData = data as IDummyData;
            const actions = [
              { label: 'Edit', onClick: () => console.log('ACTION EDIT ==> ' + JSON.stringify(selectedData)) },
              { label: 'Hapus', onClick: () => console.log('ACTION HAPUS ==> ' + JSON.stringify(selectedData)) },
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
      <ContentExampleCode show={show} code={StandarSingleRowExample} />
    </>
  );
};

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
    { label: 'Copy Kolom', onClick: () => handleClickCopy(value.toString(), 'Copy Kolom') },
    { label: 'Copy Baris', onClick: () => handleClickCopy(JSON.stringify(data), 'Copy Baris') },
  ];

  return (
    <div className="max-w-sm overflow-auto p-1 text-xs flex flex-col gap-1">
      {options.map((item, idx) => {
        return (
          <button
            key={item.label}
            className={clsx('cursor-pointer p-1.5 px-3 bg-blue-950 text-white rounded inline-flex items-center', idx === 0 && 'bg-green-800/80')}
            onClick={item.onClick}
          >
            {isCopied[item.label as keyof typeof isCopied] ? 'Copied' : item.label}
          </button>
        );
      })}
    </div>
  );
};

export default memo(TableFullFeature);

export const StandarSingleRowExample = `
import { ITableVirtual, TableVirtual } from '@/components/ui/table-virtual';
import clsx from 'clsx';
import { memo, useMemo, useState } from 'react';
import { Typography } from '@/components/ui/typhography';
import { dummyData, IDummyData } from './data';
import { generateTableFilterOptions } from '@/components/ui/table-virtual/utils';
import { fallbackCopyTextToClipboard } from '@/lib/utils/utils';

const TableFullFeature = () => {
  const oldestAge = dummyData.reduce((acc, curr) => Math.min(acc, curr.age), Infinity);

  const headers = useMemo(() => {
    const getFilterOptions = (key: keyof IDummyData) => generateTableFilterOptions(dummyData, key);
    const commonHeader: ITableVirtual<IDummyData>['headers'] = [
      { key: 'checkbox-selection', caption: '', fixedWidth: 37 },
      {
        key: 'name',
        caption: 'Nama',
        filterOptions: getFilterOptions('name'),
        renderSummary: () => (
          <div className="p-2 font-mono flex justify-center items-center bg-knitto-blue-100 text-white size-full">{dummyData.length} Users</div>
        ),
      },
      { key: 'email', caption: 'Email', filterOptions: getFilterOptions('email'), useFilter: true, useSearch: true, useAdvanceFilter: true },
      {
        key: 'age',
        caption: 'Umur',
        className: '!text-end',
        filterOptions: getFilterOptions('age'),
        renderSummary: () => (
          <div className="p-2 font-mono flex justify-center items-center bg-burnt-orange-60 text-white size-full">
            Umur Termuda adalah {oldestAge}
          </div>
        ),
      },
      {
        key: 'isActive',
        caption: 'Aktif',
        filterOptions: getFilterOptions('isActive'),
        render: (data) => (
          <div className={clsx('w-max p-1 rounded text-xs text-white', data?.isActive ? 'bg-green-700/80' : 'bg-orange-700/70')}>
            {data?.isActive ? 'Active' : 'Inactive'}
          </div>
        ),
      },
      { key: 'createdAt', caption: 'Tanggal Daftar', filterOptions: getFilterOptions('createdAt') },
      { key: 'phone', caption: 'No. Telepon', filterOptions: ['Custom Text 1', 'Custom Text 2', 'Custom Text 3'] },
      { key: 'address', caption: 'Alamat', useFilter: true, useSearch: true, useAdvanceFilter: true },
      { key: 'city', caption: 'Kota', useFilter: true, useSearch: true, useAdvanceFilter: true },
      { key: 'action', caption: '', fixedWidth: 37 },
    ];

    return commonHeader.map((header, index) => ({
      ...header,
      useFilter: true,
      useSingleFilter: index === 1 ? true : false,
      useSearch: true,
      useAdvanceFilter: index === 0 ? false : true,
    }));
  }, []);

  return (
      <div className="w-full h-[25rem]">
        <TableVirtual
          useFooter
          headers={headers}
          dataSource={dummyData}
          headerModel="double-row"
          stickyHeaderHeight={40}
          checkBoxSelectionKey="name"
          onChangeCheckBoxSelection={(data) => console.log('CHECKBOX: ', data)}
          onChangeAdvanceFilter={(props) => console.log('CHANGE ADVANCE FILTER', props)}
          onChangeFilter={(props) => console.log('CHANGE FILTER', props)}
          onChangeSort={(sortKey, sortBy) => console.log('CHANGE SORT', sortKey, sortBy)}
          onChangeSearch={(data) => console.log('CHANGE SEARCH', data)}
          renderRightClickRow={(data, value, callbackFn) => <RightClickContent data={data} value={value} callbackFn={callbackFn} />}
          renderActionCard={(data: unknown, _rowIndex) => {
            const selectedData = data as IDummyData;
            const actions = [
              { label: 'Edit', onClick: () => console.log('ACTION EDIT ==> ' + JSON.stringify(selectedData)) },
              { label: 'Hapus', onClick: () => console.log('ACTION HAPUS ==> ' + JSON.stringify(selectedData)) },
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
  );
};

interface IRightClickContentProps {
  data: Record<string, string | number> | null;
  value: string | number;
  callbackFn?: () => void;
}

const RightClickContent = ({ data, value, callbackFn }: IRightClickContentProps) => {
  const [isCopied, setIsCopied] = useState({
    'Copy 1 Cell': false,
    'Copy 1 Row': false,
  });

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
    { label: 'Copy 1 Cell', onClick: () => handleClickCopy(value.toString(), 'Copy 1 Cell') },
    { label: 'Copy 1 Row', onClick: () => handleClickCopy(JSON.stringify(data), 'Copy 1 Row') },
  ];

  return (
    <div className="max-w-sm overflow-auto p-1 text-xs flex flex-col gap-1">
      {options.map((item, idx) => {
        return (
          <button
            key={item.label}
            className={clsx('cursor-pointer p-1.5 px-3 bg-blue-950 text-white rounded inline-flex items-center', idx === 0 && 'bg-green-800/80')}
            onClick={item.onClick}
          >
            {isCopied[item.label as keyof typeof isCopied] ? 'Copied' : item.label}
          </button>
        );
      })}
    </div>
  );
};

export default memo(TableFullFeature);

`;
