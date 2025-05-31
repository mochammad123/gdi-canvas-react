import ContentExampleCode from '@/components/content-example-code';
import ToggleShowCode from '@/components/toggle-show-code';
import InputDatePicker from '@/components/ui/inputs/input-date-picker';
import { Typography } from '@/components/ui/typhography';
import { useState } from 'react';

const codeExample = `
import InputDatePicker from "@/components/ui/inputs/input-date-picker";

function Page(){
    const [date, setDate] = useState("");
    return <InputDatePicker
                value={date}
                onChange={setDate}
                formatDate="DD-MM-YYYY"
            />
}`;

export default function InputDatePickerSchema() {
  const [date, setDate] = useState('');
  const [show, setShow] = useState(false);

  return (
    <div className="bg-white shadow p-4 flex flex-col gap-3 items-center">
      <div className="flex gap-x-2">
        <Typography as="h4" className="text-navy-100">
          Date Picker
        </Typography>
        <ToggleShowCode show={show} setShow={setShow} />
      </div>
      <div className="grid w-full">
        <InputDatePicker value={date} onChange={setDate} formatDate="DD-MM-YYYY" />
      </div>
      <ContentExampleCode show={show} code={codeExample} />
    </div>
  );
}
