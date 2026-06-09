import { useState } from 'react';
import { Typography } from '@/components/ui/typhography';
import { ISelect, Select } from '@/components/ui/select';
import ContentExampleCode from '@/components/content-example-code';
import ToggleShowCode from '@/components/toggle-show-code';

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
import { ISelect, Select } from '@/components/ui/select';
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
