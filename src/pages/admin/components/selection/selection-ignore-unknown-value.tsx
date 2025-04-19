import { useState } from 'react';
import { ISelect, Select } from '@/components/ui/select';
import { Typography } from '@/components/ui/typhography';
import ContentExampleCode from '@/components/content-example-code';
import ToggleShowCode from '@/components/toggle-show-code';

const Icon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5">
    <g className="user-outline">
      <g fill="currentColor" fillRule="evenodd" className="Vector" clipRule="evenodd">
        <path d="M12 10a3 3 0 1 0 0-6a3 3 0 0 0 0 6m0 2a5 5 0 1 0 0-10a5 5 0 0 0 0 10m-7.361 3.448C5.784 13.93 7.509 13 9.714 13h4.572c2.205 0 3.93.93 5.075 2.448C20.482 16.935 21 18.916 21 21a1 1 0 1 1-2 0c0-1.782-.446-3.3-1.235-4.348C17 15.638 15.867 15 14.285 15h-4.57c-1.582 0-2.715.638-3.48 1.652C5.445 17.7 5 19.218 5 21a1 1 0 1 1-2 0c0-2.084.518-4.065 1.639-5.552"></path>
        <path d="M3 21a1 1 0 0 1 1-1h15.962a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1"></path>
      </g>
    </g>
  </svg>
);

const DEFAULT_VALUE = 'Combed 67X Special';

export default function SelectionIgnoreUnknownValue({ options }: { options: ISelect['options'] }) {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(DEFAULT_VALUE);

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <Typography as="global-description">
            Value yang tidak tidak ada dalam option akan tetap akan ditampilkan sebagai value di selection-box. <br />
            Berfungsi untuk input data yang belum ada dalam option, sehingga akan menjadi seperti input free text.
          </Typography>
        </div>
        <ToggleShowCode show={show} setShow={setShow} className="-mt-[40px]" />
      </div>

      <button className="w-max text-xs text-knitto-blue-100 font-bold" onClick={() => setValue(DEFAULT_VALUE)}>
        Gunakan value awal.
      </button>

      <Select
        ignoreUnknownValue
        label={`Value: ${value}`}
        value={value}
        prefixIcon={Icon}
        onChangeSingleOption={(value) => setValue(value as string)}
        onResetSelection={() => setValue(null)}
        className="!w-[20rem]"
        options={options.map((item, index) => ({
          ...item,
          label: (
            <div className="flex items-center gap-2">
              {Icon}
              <Typography as="global-paragraph">List Item {index + 1}</Typography>
            </div>
          ),
        }))}
      />

      <ContentExampleCode show={show} code={code} />
    </>
  );
}

const code = `
import { useState } from 'react';
import { ISelect, Select } from '@/components/ui/select';
import { Typography } from '@/components/ui/typhography';

const Icon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5">
    <g className="user-outline">
      <g fill="currentColor" fillRule="evenodd" className="Vector" clipRule="evenodd">
        <path d="M12 10a3 3 0 1 0 0-6a3 3 0 0 0 0 6m0 2a5 5 0 1 0 0-10a5 5 0 0 0 0 10m-7.361 3.448C5.784 13.93 7.509 13 9.714 13h4.572c2.205 0 3.93.93 5.075 2.448C20.482 16.935 21 18.916 21 21a1 1 0 1 1-2 0c0-1.782-.446-3.3-1.235-4.348C17 15.638 15.867 15 14.285 15h-4.57c-1.582 0-2.715.638-3.48 1.652C5.445 17.7 5 19.218 5 21a1 1 0 1 1-2 0c0-2.084.518-4.065 1.639-5.552"></path>
        <path d="M3 21a1 1 0 0 1 1-1h15.962a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1"></path>
      </g>
    </g>
  </svg>
);

export default function SelectionIgnoreUnknownValue({ options }: { options: ISelect['options'] }) {
  const [_value, setValue] = useState<string | null>(null);

  return (
    <Select
      ignoreUnknownValue
      value={'Unknown Value Can Be Ignored'}
      prefixIcon={Icon}
      onChangeSingleOption={(value) => setValue(value as string)}
      onResetSelection={() => setValue(null)}
      className="!w-[20rem]"
      options={options.map((item, index) => ({
        ...item,
        label: (
          <div className="flex items-center gap-2">
            {Icon}
            <Typography as="global-paragraph">List Item {index + 1}</Typography>
          </div>
        ),
      }))}
    />
  );
}
`;
