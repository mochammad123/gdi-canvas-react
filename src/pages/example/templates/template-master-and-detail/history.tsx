import { Button } from '@/components/ui/button';
import InputDatePicker from '@/components/ui/inputs/input-date-picker';
import Pagination from '@/components/ui/pagination';
import { Typography } from '@/components/ui/typhography';
import { useParams } from '@/lib/hooks/hooks';
import { exportDataToExcel, generateColumnWidths } from '@/lib/utils/utils';
import { useMemo, useState } from 'react';
import { IDummyDataResponse, useResponseDataQuery } from '../hooks/use-response-data-query';
import { IHeader, KnittoTable } from '@/components/ui/knitto-table';
import ActionToggle from './components/action-toggle';

type InitFilter = {
  startDate: string;
  endDate: string;
};
export default function TemplateMasterDetailHistoryPage() {
  const { page, setPage, perPage, setPerPage, onNextPrev } = useParams();
  const { header, allData, data, totalData, perPage: currentPerPage } = useResponseDataQuery({ page: page || 1, perPage: perPage || 100 });
  const [filter, setFilter] = useState({
    startDate: '',
    endDate: '',
  });

  const modifiedHeader = useMemo(() => {
    return header.map((item) => ({
      ...item,
      ...(item.key === 'action' && {
        renderCell: (rowData) => <ActionToggle onClick={(type) => console.log('ACTION ==> ', type, rowData)} />,
      }),
    })) as IHeader<IDummyDataResponse>[];
  }, [header]);

  return (
    <div className="p-3">
      <div className="flex justify-between items-end mb-2">
        <div className="flex flex-col gap-y-3">
          <Typography as="global-strong">History</Typography>
          <FilterDate
            key={JSON.stringify(filter)}
            filter={filter}
            onApply={(filter) => {
              setFilter(filter);
              setPage(1);
            }}
            onReset={setFilter}
          />
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

      <div className="h-[70vh] mb-2">
        <KnittoTable headers={modifiedHeader} data={data} rowKey="id" />
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
    </div>
  );
}

function FilterDate({
  filter,
  onApply,
  onReset,
}: {
  filter: InitFilter;
  onApply: (filter: InitFilter) => void;
  onReset: (filter: InitFilter) => void;
}) {
  const [filterDate, setFilterDate] = useState(filter);

  return (
    <div className="flex gap-x-3">
      <InputDatePicker
        onChange={(value) =>
          setFilterDate((e) => ({
            ...e,
            startDate: value,
          }))
        }
        classNameInput="h-[32px]"
        value={filterDate.startDate}
      />
      <InputDatePicker
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
      <Button
        className="h-[32px] flex justify-center items-center"
        onClick={() => {
          onReset({ startDate: '', endDate: '' });
          setFilterDate({
            startDate: '',
            endDate: '',
          });
        }}
        variant="outline"
      >
        Reset
      </Button>
    </div>
  );
}
