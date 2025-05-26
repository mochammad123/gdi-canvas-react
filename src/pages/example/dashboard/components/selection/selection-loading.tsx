import { useState } from 'react';
import { ISelect, Select } from '@/components/ui/select';
import { Typography } from '@/components/ui/typhography';
import ContentExampleCode from '../content-example-code';
import ToggleShowCode from '../toggle-show-code';

export default function SelectionLoading({ options }: { options: ISelect['options'] }) {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(null);

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <Typography as="global-description">
            Komponen selection dengan status `sedang memuat` untuk indikator ketika data sedang dimuat atau loading dari API.
          </Typography>
        </div>
        <ToggleShowCode show={show} setShow={setShow} className="-mt-[40px]" />
      </div>

      <Select
        isLoading
        options={options}
        value={value}
        onChangeSingleOption={(value) => setValue(value as string)}
        onResetSelection={() => setValue(null)}
        className="!w-[20rem]"
      />
      <ContentExampleCode show={show} code={code} />
    </>
  );
}

const code = `
import { ISelect, Select } from '@/components/ui/select';
import { useState } from 'react';

export default function SelectionDefault({ options }: { options: ISelect['options'] }) {
  const [value, setValue] = useState<string | null>(null);

  return <Select
    options={options}
    value={value}
    onChangeSingleOption={(value) => setValue(value)}
    onResetSelection={() => setValue(null)}
  />;
}
`;
