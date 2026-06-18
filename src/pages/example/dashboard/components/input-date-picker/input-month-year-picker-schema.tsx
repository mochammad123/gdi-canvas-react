import { MonthYearPicker, Typography } from '@knittotextile/react-ui';
import ContentExampleCode from '@/components/content-example-code';
import ToggleShowCode from '@/components/toggle-show-code';
import { useState } from 'react';

const codeExample = `
import { MonthYearPicker } from '@knittotextile/react-ui';

function Page() {
  const [monthYear, setMonthYear] = useState('');
  return <MonthYearPicker value={monthYear} onChange={setMonthYear} from={1990} to={2028} />;
}
`;

export default function MonthYearPickerSchema() {
  const [monthYear, setMonthYear] = useState('');
  const [show, setShow] = useState(false);

  return (
    <div className="bg-white dark:bg-black-80 shadow p-4 flex flex-col gap-3 items-center">
      <div className="flex gap-x-2">
        <Typography as="h4" className="text-navy-100 dark:text-greyish-semi-white">
          Month Year Picker
        </Typography>
        <ToggleShowCode show={show} setShow={setShow} />
      </div>
      <div className="grid w-full">
        <MonthYearPicker value={monthYear} onChange={setMonthYear} from={1990} to={2028} />
      </div>

      <ContentExampleCode show={show} code={codeExample} />
    </div>
  );
}
