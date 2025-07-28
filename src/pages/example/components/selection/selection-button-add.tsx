import ContentExampleCode from '@/components/content-example-code';
import ToggleShowCode from '@/components/toggle-show-code';
import { SelectionWithLabel } from '@/components/ui/selection';
import { ISelectionOption } from '@/components/ui/selection/types';
import { Typography } from '@/components/ui/typhography';
import { useState } from 'react';

const carOptions = {
  Toyota: 'Toyota',
  Honda: 'Honda',
  Ford: 'Ford',
};

const selectionButtonAddExampleCode = `
import { SelectionWithLabel } from '@/components/ui/selection';
import { ISelectionOption } from '@/components/ui/selection/types';
import { Typography } from '@/components/ui/typhography';
import { useState } from 'react';

const carOptions = {
  Toyota: 'Toyota',
  Honda: 'Honda',
  Ford: 'Ford',
};

function SelectionButtonAdd() {
  const [options, setOptions] = useState<ISelectionOption>(carOptions);
  const [value, setValue] = useState<string>('');
  const [multiple, setMultiple] = useState<string[]>([]);
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <SelectionWithLabel
        label="Multiple"
        placeholder="Pilih Mobil"
        options={options}
        onClear={() => {
          setMultiple([]);
        }}
        onClickSelectAll={() => {
          setMultiple(Object.keys(options));
        }}
        onSelect={(selected) => {
          // setValue(selected.value.toString());
          setMultiple((values) => {
            if (values.includes(selected.key.toString())) {
              return values.filter((value) => value !== selected.key.toString());
            }
            return [...values, selected.key.toString()];
          });
        }}
        customDisplayValue={(values) => {
          if (!values.length) return '';
          return {values.length} item dipilih;
        }}
        values={multiple}
        enableSearch
        multiple
        placeholderSearch="Cari mobil"
        onSaveAddItem={(value) => {
          setOptions((values) => ({ [value]: value, ...values }));
        }}
      />

      <SelectionWithLabel
        label="Single"
        placeholder="Pilih Mobil"
        options={options}
        onSelect={(selected) => {
          setValue(selected.value.toString());
        }}
        value={value}
        enableSearch
        placeholderSearch="Cari mobil"
        onSaveAddItem={(value) => {
          setOptions((values) => ({ [value]: value, ...values }));
        }}
      />
    </>
  );
`;

export default function SelectionButtonAdd() {
  const [options, setOptions] = useState<ISelectionOption>(carOptions);
  const [value, setValue] = useState<string>('');
  const [multiple, setMultiple] = useState<string[]>([]);
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <Typography as="global-description">Komponen selection dengan tombol tambah item.</Typography>
        </div>
        <ToggleShowCode show={show} setShow={setShow} className="-mt-[40px]" />
      </div>
      <SelectionWithLabel
        label="Multiple"
        placeholder="Pilih Mobil"
        options={options}
        onClear={() => {
          setMultiple([]);
        }}
        onClickSelectAll={() => {
          setMultiple(Object.keys(options));
        }}
        onSelect={(selected) => {
          // setValue(selected.value.toString());
          setMultiple((values) => {
            if (values.includes(selected.key.toString())) {
              return values.filter((value) => value !== selected.key.toString());
            }
            return [...values, selected.key.toString()];
          });
        }}
        customDisplayValue={(values) => {
          if (!values.length) return '';
          return `${values.length} item dipilih`;
        }}
        values={multiple}
        enableSearch
        multiple
        placeholderSearch="Cari mobil"
        onSaveAddItem={(value) => {
          setOptions((values) => ({ [value]: value, ...values }));
        }}
      />

      <SelectionWithLabel
        label="Single"
        placeholder="Pilih Mobil"
        options={options}
        onSelect={(selected) => {
          setValue(selected.value.toString());
        }}
        value={value}
        enableSearch
        placeholderSearch="Cari mobil"
        onSaveAddItem={(value) => {
          setOptions((values) => ({ [value]: value, ...values }));
        }}
      />
      <ContentExampleCode show={show} code={selectionButtonAddExampleCode} />
    </>
  );
}
