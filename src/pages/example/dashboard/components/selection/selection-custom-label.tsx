import { useState } from 'react';
import clsx from 'clsx';

import { ISelect, Select } from '@/components/ui/select';
import { Typography } from '@/components/ui/typhography';
import ToggleShowCode from '../toggle-show-code';
import ContentExampleCode from '../content-example-code';

export default function SelectionCustomLabel({ options }: { options: ISelect['options'] }) {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(null);

  const mapOptions = options.slice(0, 5).map((item, index) => ({
    ...item,
    label: (
      <div className="flex items-center gap-2">
        <Typography
          as="global-paragraph"
          className={clsx(
            index === 0 && 'font-bold!',
            index === 1 && 'text-red-500! ml-2',
            index === 2 && 'text-yellow-500! ml-4',
            index === 3 && 'text-green-500! ml-6',
            index === 4 && 'text-blue-500! ml-8'
          )}
        >
          List Item {index + 1}
        </Typography>
      </div>
    ),
  }));

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <Typography as="global-description">
            Komponen selection dengan option label yang dapat di custom. <br /> Contoh dibawah ini label dibungkus dengan div dan diberikan custom
            styling.
          </Typography>
        </div>
        <ToggleShowCode show={show} setShow={setShow} className="-mt-[40px]" />
      </div>

      <Select
        value={value}
        onChangeSingleOption={(value) => setValue(value as string)}
        onResetSelection={() => setValue(null)}
        options={mapOptions}
        className="w-[20rem]!"
      />

      <ContentExampleCode show={show} code={code} />
    </>
  );
}

const code = `
import { useState } from 'react';
import clsx from 'clsx';

import { ISelect, Select } from '@/components/ui/select';

export default function SelectionCustomLabel({ options }: { options: ISelect['options'] }) {
  const [value, setValue] = useState<string | null>(null);

  const mapOptions = options.slice(0, 5).map((item, index) => ({
    ...item,
    label: (
      <div className="flex items-center gap-2">
        <Typography
          as="global-paragraph"
          className={clsx(
            index === 0 && 'font-bold!',
            index === 1 && 'text-red-500! ml-2',
            index === 2 && 'text-yellow-500! ml-4',
            index === 3 && 'text-green-500! ml-6',
            index === 4 && 'text-blue-500! ml-8'
          )}
        >
          List Item {index + 1}
        </Typography>
      </div>
    ),
  }));

  return (
      <Select
        value={value}
        onChangeSingleOption={(value) => setValue(value as string)}
        onResetSelection={() => setValue(null)}
        options={mapOptions}
        className="w-[20rem]!"
      />
  );
}
`;
