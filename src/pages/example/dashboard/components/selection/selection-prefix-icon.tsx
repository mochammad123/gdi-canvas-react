import { ISelect, Select } from '@/components/ui/select';
import { useState } from 'react';
import ContentExampleCode from '../content-example-code';
import ToggleShowCode from '../toggle-show-code';
import { Typography } from '@/components/ui/typhography';

const Icon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-5">
    <g className="user-outline">
      <g fill="currentColor" fillRule="evenodd" className="Vector" clipRule="evenodd">
        <path d="M12 10a3 3 0 1 0 0-6a3 3 0 0 0 0 6m0 2a5 5 0 1 0 0-10a5 5 0 0 0 0 10m-7.361 3.448C5.784 13.93 7.509 13 9.714 13h4.572c2.205 0 3.93.93 5.075 2.448C20.482 16.935 21 18.916 21 21a1 1 0 1 1-2 0c0-1.782-.446-3.3-1.235-4.348C17 15.638 15.867 15 14.285 15h-4.57c-1.582 0-2.715.638-3.48 1.652C5.445 17.7 5 19.218 5 21a1 1 0 1 1-2 0c0-2.084.518-4.065 1.639-5.552"></path>
        <path d="M3 21a1 1 0 0 1 1-1h15.962a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1"></path>
      </g>
    </g>
  </svg>
);

export default function SelectionPrefixIcon({ options }: { options: ISelect['options'] }) {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(null);

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <Typography as="global-description">
            Komponen selection dengan prefix icon pada selection box. <br /> tambah property `prefixIcon` pada komponen.
          </Typography>
        </div>
        <ToggleShowCode show={show} setShow={setShow} className="-mt-[40px]" />
      </div>

      <Select
        options={options}
        value={value}
        onChangeSingleOption={(value) => setValue(value as string)}
        onResetSelection={() => setValue(null)}
        prefixIcon={Icon}
        className="!w-[20rem]"
      />

      <ContentExampleCode show={show} code={code} />
    </>
  );
}

const code = `
import { ISelect, Select } from '@/components/ui/select';
import { useState } from 'react';

const Icon = (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
    <g className="user-outline">
      <g fill="currentColor" fillRule="evenodd" className="Vector" clipRule="evenodd">
        <path d="M12 10a3 3 0 1 0 0-6a3 3 0 0 0 0 6m0 2a5 5 0 1 0 0-10a5 5 0 0 0 0 10m-7.361 3.448C5.784 13.93 7.509 13 9.714 13h4.572c2.205 0 3.93.93 5.075 2.448C20.482 16.935 21 18.916 21 21a1 1 0 1 1-2 0c0-1.782-.446-3.3-1.235-4.348C17 15.638 15.867 15 14.285 15h-4.57c-1.582 0-2.715.638-3.48 1.652C5.445 17.7 5 19.218 5 21a1 1 0 1 1-2 0c0-2.084.518-4.065 1.639-5.552"></path>
        <path d="M3 21a1 1 0 0 1 1-1h15.962a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1"></path>
      </g>
    </g>
  </svg>
);

export default function SelectionPrefixIcon({ options }: { options: ISelect['options'] }) {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select
      options={options}
      value={value}
      onChangeSingleOption={(value) => setValue(value as string)}
      onResetSelection={() => setValue(null)}
      prefixIcon={Icon}
      className="w-[20rem]"
    />
  );
}

`;
