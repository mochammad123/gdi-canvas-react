import Pagination from '@/components/ui/pagination';
import { IDummyDataResponse } from '../../hooks/use-response-data-query';
import { IHeader, KnittoTable } from '@/components/ui/knitto-table';
import { useMemo } from 'react';
import ActionToggle from './action-toggle';

export default function TableDetailHistory({
  header,
  data,
  totalData,
  perPage,
  page,
  setPage,
  onNextPrev,
  setPerPage,
}: {
  header: IHeader<IDummyDataResponse>[];
  data: IDummyDataResponse[];
  totalData: number;
  perPage: number;
  page: number;
  setPage: (page: number | null) => void;
  onNextPrev: (page: number) => void;
  setPerPage: (perPage: number | null) => void;
}) {
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
      <div className="h-[40vh] mb-2">
        <KnittoTable headers={modifiedHeader} data={data} rowKey="id" />
      </div>
      <Pagination
        page={page}
        onNext={onNextPrev}
        onPrev={onNextPrev}
        onApplyPage={setPage}
        perPage={perPage}
        totalData={totalData}
        onApplyPerPage={(page) => setPerPage(page)}
      />
    </>
  );
}
