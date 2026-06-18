import ContentExampleCode from '@/components/content-example-code';
import ToggleShowCode from '@/components/toggle-show-code';
import { ISelect, Select, Typography } from '@knittotextile/react-ui';
import { useMemo, useState } from 'react';

const initialCarOptions: ISelect['options'] = [
  { label: 'Toyota', value: 'Toyota' },
  { label: 'Honda', value: 'Honda' },
  { label: 'Ford', value: 'Ford' },
];

const selectionLabeledExampleCode = `
import { ISelect, Select } from '@knittotextile/react-ui';
import { useState } from 'react';

const options: ISelect['options'] = [
  { label: 'Toyota', value: 'Toyota' },
  { label: 'Honda', value: 'Honda' },
  { label: 'Ford', value: 'Ford' },
];

function SelectionLabeledExample() {
  const [singleValue, setSingleValue] = useState<string | null>(null);
  const [multipleValue, setMultipleValue] = useState<string[] | null>(null);

  return (
    <>
      <Select
        label="Single"
        placeHolder="Pilih mobil"
        options={options}
        value={singleValue}
        onChangeSingleOption={(value) => setSingleValue(value as string)}
        onResetSelection={() => setSingleValue(null)}
      />

      <Select
        label="Multiple"
        multiple
        placeHolder="Pilih mobil"
        options={options}
        value={multipleValue}
        onChangeMultipleOption={(value) => setMultipleValue(value as string[])}
        onResetSelection={() => setMultipleValue(null)}
      />
    </>
  );
}
`;

export default function SelectionButtonAdd() {
  const [options] = useState<ISelect['options']>(initialCarOptions);
  const [singleValue, setSingleValue] = useState<string | null>(null);
  const [multipleValue, setMultipleValue] = useState<string[] | null>(null);
  const [show, setShow] = useState<boolean>(false);

  const multipleLabel = useMemo(() => {
    if (!multipleValue?.length) return 'Multiple';
    return `Multiple (${multipleValue.length} dipilih)`;
  }, [multipleValue]);

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <Typography as="global-description">
            Contoh Select dengan label untuk mode single dan multiple menggunakan @knittotextile/react-ui.
          </Typography>
        </div>
        <ToggleShowCode show={show} setShow={setShow} className="-mt-[40px]" />
      </div>

      <div className="flex flex-col gap-4">
        <Select
          label="Single"
          placeHolder="Pilih mobil"
          options={options}
          value={singleValue}
          onChangeSingleOption={(value) => setSingleValue(value as string)}
          onResetSelection={() => setSingleValue(null)}
          className="w-[20rem]!"
        />

        <Select
          label={multipleLabel}
          multiple
          placeHolder="Pilih mobil"
          options={options}
          value={multipleValue}
          onChangeMultipleOption={(value) => setMultipleValue(value as string[])}
          onResetSelection={() => setMultipleValue(null)}
          className="w-[20rem]!"
        />
      </div>

      <ContentExampleCode show={show} code={selectionLabeledExampleCode} />
    </>
  );
}
