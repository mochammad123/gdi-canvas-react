import InputMonthYearPicker from '@/components/ui/inputs/input-month-year-picker';
import { Typography } from '@/components/ui/typhography';
import { useState } from 'react';
import ContentExampleCode from '../content-example-code';
import ToggleShowCode from '../toggle-show-code';

const codeExample = `
import InputMonthYearPicker from "@/components/ui/inputs/input-month-year-picker";

function Page() {
  const [monthYear, setMonthYear] = useState("");
  return  <InputMonthYearPicker 
            value={monthYear} 
            onChange={setMonthYear} 
            from={1990} 
            to={2028}
          />;
}
`;
export default function InputMonthYearPickerSchema() {
  const [monthYear, setMonthYear] = useState('');
  const [show, setShow] = useState(false);

  return (
    <div className="bg-white shadow p-4 flex flex-col gap-3 items-center">
      <div className="flex gap-x-2">
        <Typography as="h4" className="text-navy-100">
          Month Year Picker
        </Typography>
        <ToggleShowCode show={show} setShow={setShow} />
      </div>
      <div className="grid w-full">
        <InputMonthYearPicker value={monthYear} onChange={setMonthYear} from={1990} to={2028} />
      </div>

      <ContentExampleCode show={show} code={codeExample} />
    </div>
  );
}
