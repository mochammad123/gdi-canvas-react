import { ISelect, Select, Typography } from '@knittotextile/react-ui';
import { useState } from 'react';
import ToggleShowCode from '@/components/toggle-show-code';
import ContentExampleCode from '@/components/content-example-code';

export default function SelectionPlaceholder({ options }: { options: ISelect['options'] }) {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(null);

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <Typography as="global-description">Komponen selection dengan tambahan placeholder.</Typography>
        </div>
        <ToggleShowCode show={show} setShow={setShow} className="-mt-[40px]" />
      </div>

      <Select
        placeHolder="Search..."
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

export default function SelectionPlaceholder({ options }: { options: ISelect['options'] }) {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select
      placeHolder="Search..."
      options={options}
      value={value}
      onChangeSingleOption={(value) => setValue(value as string)}
      onResetSelection={() => setValue(null)}
      className="w-[20rem]"
    />
  );
}
`;
