import ContentExampleCode from '@/components/content-example-code';
import ToggleShowCode from '@/components/toggle-show-code';
import { Pagination, Typography } from '@knittotextile/react-ui';
import { useParams } from '@/lib/hooks/hooks';
import { useState } from 'react';

const code = `
import { Pagination } from '@knittotextile/react-ui';
import { useParams } from '@/lib/hooks/hooks';

export default function PaginationExample() {
  const { page, setPage, perPage, setPerPage, onNextPrev } = useParams();

  return (
    <Pagination
      page={page}
      onNext={onNextPrev}
      onPrev={onNextPrev}
      onApplyPage={setPage}
      perPage={perPage}
      totalData={10000000}
      onApplyPerPage={setPerPage}
    />
  );
}
`;

export default function PaginationPage() {
  const { page, setPage, perPage, setPerPage, onNextPrev } = useParams();
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="p-4 bg-knitto-blue-20 dark:bg-black-100 flex flex-col gap-3 mb-10">
      <Typography as="h3">Pagination</Typography>
      <div className="h-2 w-72 bg-burnt-orange-100" />

      <div className="grid grid-cols-1 py-2 gap-4">
        <div className="bg-white dark:bg-black-80 shadow p-4 flex flex-col gap-3">
          <ToggleShowCode show={show} setShow={setShow} />
          <Typography as="h4" className="text-navy-100 dark:text-greyish-semi-white mx-auto">
            Pagination
          </Typography>
          <Pagination
            page={page}
            onNext={onNextPrev}
            onPrev={onNextPrev}
            onApplyPage={setPage}
            perPage={perPage}
            totalData={10000000}
            onApplyPerPage={setPerPage}
          />
          <ContentExampleCode show={show} code={code} />
        </div>
      </div>
    </div>
  );
}
