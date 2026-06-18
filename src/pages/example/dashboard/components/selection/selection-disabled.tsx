import { Typography, ISelect, Select } from '@knittotextile/react-ui';
import { useState } from 'react';
import ContentExampleCode from '../content-example-code';
import ToggleShowCode from '../toggle-show-code';

export default function SelectionDisabled({ options }: { options: ISelect['options'] }) {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(null);

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <Typography as="global-description">
            Komponen selection yang di disabled. <br />
            Tambahkan property `disabled` pada komponen Select.
          </Typography>
        </div>
        <ToggleShowCode show={show} setShow={setShow} className="-mt-[40px]" />
      </div>

      <Select
        disabled
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

export default function SelectionDisabled({ options }: { options: ISelect['options'] }) {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select
      disabled
      options={options}
      value={value}
      onChangeSingleOption={(value) => setValue(value as string)}
      onResetSelection={() => setValue(null)}
      className="w-[20rem]!"
    />
  );
}
`;
