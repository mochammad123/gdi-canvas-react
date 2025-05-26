import Pagination from '@/components/ui/pagination';
import { IDataHeader } from '@/components/ui/table-virtual';
import TableVirtual from '@/components/ui/table-virtual/table-virtual';
import { IDummyDataResponse } from '../../hooks/use-response-data-query';

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
  header: IDataHeader<IDummyDataResponse>[];
  data: IDummyDataResponse[];
  totalData: number;
  perPage: number;
  page: number;
  setPage: (page: number | null) => void;
  onNextPrev: (page: number) => void;
  setPerPage: (perPage: number | null) => void;
}) {
  return (
    <>
      <div className="h-[40vh] mb-2">
        <TableVirtual useAutoWidth headers={header} dataSource={data} stickyHeaderHeight={40} rowHeight={28} />
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
