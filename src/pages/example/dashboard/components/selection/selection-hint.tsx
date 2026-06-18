import { ISelect, Select, Typography } from '@knittotextile/react-ui';
import { useState } from 'react';
import ToggleShowCode from '../toggle-show-code';
import ContentExampleCode from '../content-example-code';

export default function SelectionHint({ options }: { options: ISelect['options'] }) {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(null);

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <Typography as="global-description">
            Komponen selection dengan tambahan hint text. <br /> tambah property `hint` pada komponen.
          </Typography>
        </div>
        <ToggleShowCode show={show} setShow={setShow} className="-mt-[40px]" />
      </div>

      <Select
        hint="This is a hint text"
        options={options}
        value={value}
        onChangeSingleOption={(value) => setValue(value as string)}
        onResetSelection={() => setValue(null)}
        className="w-[20rem]!"
      />

      <ContentExampleCode show={show} code={code} />
    </>
  );
}

const code = `
import { useState } from 'react';

export default function SelectionHint({ options }: { options: ISelect['options'] }) {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select
      hint="This is a hint text"
      options={options}
      value={value}
      onChangeSingleOption={(value) => setValue(value as string)}
      onResetSelection={() => setValue(null)}
      className="w-[20rem]"
    />
  );
}
`;
