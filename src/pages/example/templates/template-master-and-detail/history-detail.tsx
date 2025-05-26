import { useParams } from '@/lib/hooks/hooks';
import { useState } from 'react';
import { useResponseDataQuery } from '../hooks/use-response-data-query';
import TableDetailHistory from './components/table-detail-history';
import TableHistory from './components/table-history';

export default function TemplateMasterDetailHistoryDetailPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { page, setPage, perPage, setPerPage, onNextPrev } = useParams();
  const {
    header,
    data,
    totalData,
    perPage: currentPerPage,
  } = useResponseDataQuery({ id: selectedId || undefined, page: page || 1, perPage: perPage || 100 });

  return (
    <div className="p-3 flex flex-col gap-y-3">
      <TableHistory onClickRow={setSelectedId} />
      <TableDetailHistory
        header={header}
        data={selectedId ? data : []}
        page={page || 1}
        setPage={setPage}
        totalData={totalData}
        perPage={currentPerPage}
        onNextPrev={onNextPrev}
        setPerPage={setPerPage}
      />
    </div>
  );
}
