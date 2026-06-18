import { Button, DatePicker, IHeader, KnittoTable, Pagination, Typography } from '@knittotextile/react-ui';
import { useParams } from '@/lib/hooks/hooks';
import { exportDataToExcel, generateColumnWidths } from '@/lib/utils/utils';
import { useMemo, useState } from 'react';
import { IDummyDataResponse, useResponseDataQuery } from '../../hooks/use-response-data-query';
import ActionToggle from './action-toggle';
import clsx from 'clsx';

export default function TableHistory({ onClickRow }: { onClickRow: (id: string) => void }) {
  const { page, setPage, perPage, setPerPage, onNextPrev } = useParams();
  const { header, allData, data, totalData, perPage: currentPerPage } = useResponseDataQuery({ page: page || 1, perPage: perPage || 100 });

  const modifiedHeader = useMemo(() => {
    return header.map((item) => ({
      ...item,
      ...(item.key === 'action' && {
        renderCell: (rowData) => <ActionToggle onClick={(type) => console.log('ACTION ==> ', type, rowData)} />,
      }),
    })) as IHeader<IDummyDataResponse>[];
  }, [header]);

  return (
    <>
      <div className="flex justify-between items-end mb-2">
        <div className="flex flex-col gap-y-3">
          <Typography as="global-strong">History Detail</Typography>
          <FilterDate onApply={() => {}} onReset={() => {}} />
        </div>
        <div className="flex gap-x-2">
          <Button
            size="sm"
            onClick={() => {
              const dataSet: unknown[] = [];
              Object.keys(allData).forEach((page) => {
                dataSet.push(...allData[+page]);
              });
              const columnWidths = generateColumnWidths(dataSet);
              const title = `Laporan History`;

              exportDataToExcel(dataSet, title, 'Sheet 1', columnWidths);
            }}
          >
            Export
          </Button>
        </div>
      </div>

      <div className="h-[30vh] mb-2">
        <KnittoTable
          headers={modifiedHeader}
          data={data}
          rowKey="id"
          onClickRow={(data) => onClickRow(data.name as string)}
          classNameCell={(_, __, ___, opts) => {
            return clsx({
              'border-l! border-l-blue-950! dark:border-l-knitto-blue-40!': opts?.isFirstIndex && opts?.isRowHighlighted,
              'border-r! border-r-blue-950! dark:border-r-knitto-blue-40!': opts?.isLastIndex && opts?.isRowHighlighted,
              'border-y! border-y-blue-950! dark:border-y-knitto-blue-40! bg-[#ECEEFF] dark:bg-knitto-blue-60/25': opts?.isRowHighlighted,
            });
          }}
        />
      </div>
      <Pagination
        page={page}
        onNext={onNextPrev}
        onPrev={onNextPrev}
        onApplyPage={setPage}
        perPage={currentPerPage}
        totalData={totalData}
        onApplyPerPage={(page) => setPerPage(page)}
      />
    </>
  );
}

function FilterDate({
  onApply,
  onReset,
}: {
  onApply: (filter: { startDate: string; endDate: string }) => void;
  onReset: (filter: { startDate: string; endDate: string }) => void;
}) {
  const [filterDate, setFilterDate] = useState({
    startDate: '',
    endDate: '',
  });

  return (
    <div className="flex gap-x-3">
      <DatePicker
        onChange={(value) =>
          setFilterDate((e) => ({
            ...e,
            startDate: value,
          }))
        }
        classNameInput="h-[32px]"
        value={filterDate.startDate}
      />
      <DatePicker
        onChange={(value) =>
          setFilterDate((e) => ({
            ...e,
            endDate: value,
          }))
        }
        classNameInput="h-[32px]"
        value={filterDate.endDate}
      />
      <Button className="h-[32px] flex justify-center items-center" onClick={() => onApply(filterDate)}>
        Filter
      </Button>
      <Button className="h-[32px] flex justify-center items-center" onClick={() => onReset({ startDate: '', endDate: '' })} variant="outline">
        Reset
      </Button>
    </div>
  );
}
