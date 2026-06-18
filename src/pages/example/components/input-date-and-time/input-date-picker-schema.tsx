import { DatePicker, Typography } from '@knittotextile/react-ui';
import ContentExampleCode from '@/components/content-example-code';
import ToggleShowCode from '@/components/toggle-show-code';
import { useState } from 'react';

const codeExample = `
import { DatePicker } from '@knittotextile/react-ui';

function Page() {
  const [date, setDate] = useState('');
  return <DatePicker value={date} onChange={setDate} formatDate="DD-MM-YYYY" />;
}
`;

export default function DatePickerSchema() {
  const [date, setDate] = useState('');
  const [show, setShow] = useState(false);

  return (
    <div className="bg-white dark:bg-black-80 shadow p-4 flex flex-col gap-3 items-center">
      <div className="flex gap-x-2">
        <Typography as="h4" className="text-navy-100 dark:text-greyish-semi-white">
          Date Picker
        </Typography>
        <ToggleShowCode show={show} setShow={setShow} />
      </div>
      <div className="grid w-full">
        <DatePicker value={date} onChange={setDate} formatDate="DD-MM-YYYY" />
      </div>
      <ContentExampleCode show={show} code={codeExample} />
    </div>
  );
}
