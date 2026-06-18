import { ISelect, Select, Typography } from '@knittotextile/react-ui';
import { useState } from 'react';
import ToggleShowCode from '../toggle-show-code';
import ContentExampleCode from '../content-example-code';

export default function SelectionMultiple({ options }: { options: ISelect['options'] }) {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<string[] | null>(null);

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <Typography as="global-description">Selection dengan opsi yang bisa dipilih lebih dari 1.</Typography>
        </div>
        <ToggleShowCode show={show} setShow={setShow} className="-mt-[40px]" />
      </div>

      <Select
        multiple
        options={options}
        value={value}
        onChangeMultipleOption={(value) => setValue(value as string[])}
        onResetSelection={() => setValue(null)}
        className="w-[20rem]!"
      />

      <ContentExampleCode show={show} code={code} />
    </>
  );
}

const code = `
import { useState } from 'react';
export default function SelectionMultiple({ options }: { options: ISelect['options'] }) {
  const [value, setValue] = useState<string[] | null>(null);

  return (
      <Select
        multiple
        options={options}
        value={value}
        onChangeMultipleOption={(value) => setValue(value as string[])}
        onResetSelection={() => setValue(null)}
      />
  );
}
`;
