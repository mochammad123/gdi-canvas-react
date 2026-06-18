import { Typography, Select } from '@knittotextile/react-ui';
import { memo, useState } from 'react';
import ToggleShowCode from '../toggle-show-code';
import ContentExampleCode from '../content-example-code';

const options = Array(500000)
  .fill(true)
  .map((_, idx) => ({
    label: 'Item List ' + idx,
    value: 'item-list-' + idx,
  }));

const SelectionBigData = () => {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(null);

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <Typography as="global-description">
            Komponen selection dengan banyak opsi. <br /> Secara default komponen selection dibuat mendukung rendering opsi dengan ribuan data karena
            sudah menggunakan konsep <b>virtualization</b>.
          </Typography>
        </div>
        <ToggleShowCode show={show} setShow={setShow} className="-mt-[40px]" />
      </div>

      <Select
        label={options.length + ' Options'}
        options={options}
        value={value}
        onChangeSingleOption={(value) => setValue(value as string)}
        onResetSelection={() => setValue(null)}
        className="w-[20rem]!"
      />

      <ContentExampleCode show={show} code={code} />
    </>
  );
};

export default memo(SelectionBigData);

const code = `
import { memo, useState } from 'react';
const options = Array(500000)
  .fill(true)
  .map((_, idx) => ({
    label: 'Item List ' + idx,
    value: 'item-list-' + idx,
  }));

const SelectionBigData = () => {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select
      label={options.length + ' Options'}
      options={options}
      value={value}
      onChangeSingleOption={(value) => setValue(value as string)}
      onResetSelection={() => setValue(null)}
      className="w-[20rem]!"
    />
  );
};

export default memo(SelectionBigData);
`;
