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
    <div className="p-4 bg-knitto-blue-20 dark:bg-black-100 min-h-full flex flex-col gap-y-3">
      <div className="bg-white dark:bg-black-80 dark:border dark:border-black-60 rounded-md shadow-md p-3">
        <TableHistory onClickRow={setSelectedId} />
      </div>
      <div className="bg-white dark:bg-black-80 dark:border dark:border-black-60 rounded-md shadow-md p-3">
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
    </div>
  );
}
