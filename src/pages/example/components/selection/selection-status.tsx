import { useState } from 'react';
import { Typography } from '@/components/ui/typhography';
import { ISelect, Select } from '@/components/ui/select';
import ContentExampleCode from '@/components/content-example-code';
import ToggleShowCode from '@/components/toggle-show-code';

export default function SelectionStatus({ options }: { options: ISelect['options'] }) {
  const [show, setShow] = useState({
    error: false,
    warning: false,
  });
  const [value, setValue] = useState<string | null>(null);

  return (
    <div className="flex flex-col space-y-5">
      <div className="space-y-3">
        <Typography as="global-report-title" className="!text-lg">
          Error
        </Typography>
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <Typography as="global-description">
              Komponen selection dengan aksen merah untuk menandakan status error. <br /> tambah property `error` pada komponen dengan nilai boolean.
            </Typography>
          </div>
          <ToggleShowCode show={show.error} setShow={() => setShow({ ...show, error: !show.error })} className="-mt-[40px]" />
        </div>

        <Select
          error
          hint="This is an error hint!"
          label="Text Label"
          options={options}
          value={value}
          onChangeSingleOption={(value) => setValue(value as string)}
          onResetSelection={() => setValue(null)}
          className="!w-[20rem]"
        />

        <ContentExampleCode show={show.error} code={code} />
      </div>

      <div className="space-y-3">
        <Typography as="global-report-title" className="!text-lg">
          Warning
        </Typography>
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <Typography as="global-description">
              Komponen selection dengan aksen kuning untuk menandakan status warning. <br /> tambah property `warning` pada komponen dengan nilai
              boolean.
            </Typography>
          </div>
          <ToggleShowCode show={show.warning} setShow={() => setShow({ ...show, warning: !show.warning })} className="-mt-[40px]" />
        </div>

        <Select
          warning
          hint="This is a warning hint!"
          label="Text Label"
          options={options}
          value={value}
          onChangeSingleOption={(value) => setValue(value as string)}
          onResetSelection={() => setValue(null)}
          className="!w-[20rem]"
        />

        <ContentExampleCode show={show.warning} code={code} />
      </div>
    </div>
  );
}

const code = `
import { ISelect, Select } from '@/components/ui/select';
import { useState } from 'react';

export default function SelectionError({ options }: { options: ISelect['options'] }) {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select
      warning
      hint="This is a warning hint!"
      label="Text Label"
      options={options}
      value={value}
      onChangeSingleOption={(value) => setValue(value as string)}
      onResetSelection={() => setValue(null)}
      className="w-[20rem]"
    />
  );
}

`;
