import { DateTimePicker, Typography } from '@knittotextile/react-ui';
import ContentExampleCode from '@/components/content-example-code';
import ToggleShowCode from '@/components/toggle-show-code';
import { useState } from 'react';

const codeExample = `
import { DateTimePicker } from '@knittotextile/react-ui';

function Page() {
  const [date, setDate] = useState('');
  return <DateTimePicker value={date} onChange={setDate} formatDate="DD-MM-YYYY" />;
}
`;

export default function DateTimePickerSchema() {
  const [date, setDate] = useState<string>('');
  const [show, setShow] = useState(false);

  return (
    <div className="bg-white dark:bg-black-80 shadow p-4 flex flex-col gap-3 items-center">
      <div className="flex gap-x-2">
        <Typography as="h4" className="text-navy-100 dark:text-greyish-semi-white">
          Date Time Picker
        </Typography>
        <ToggleShowCode show={show} setShow={setShow} />
      </div>
      <div className="grid w-full">
        <DateTimePicker value={date} onChange={setDate} formatDate="DD-MM-YYYY" />
      </div>
      <ContentExampleCode show={show} code={codeExample} />
    </div>
  );
}
