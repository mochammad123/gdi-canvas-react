import { Radio, RadioGroup, Typography } from '@knittotextile/react-ui';
import { ReactNode, useState } from 'react';

export default function RadioPage() {
  const [horizontalValue, setHorizontalValue] = useState('aktif');
  const [verticalValue, setVerticalValue] = useState('option-1');

  return (
    <div className="p-4 flex flex-col gap-3 mb-10">
      <Typography as="h3">Radio</Typography>
      <div className="h-2 w-72 bg-burnt-orange-100" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card title="Horizontal (default)">
          <RadioGroup value={horizontalValue} onChange={setHorizontalValue} orientation="horizontal">
            <Radio value="aktif" label="Aktif" />
            <Radio value="tidak-aktif" label="Tidak aktif" />
          </RadioGroup>
          <Typography as="global-paragraph" className="text-black-60 dark:text-black-40">
            Nilai terpilih: {horizontalValue}
          </Typography>
        </Card>

        <Card title="Vertical">
          <RadioGroup value={verticalValue} onChange={setVerticalValue} orientation="vertical">
            <Radio value="option-1" label="Opsi 1" />
            <Radio value="option-2" label="Opsi 2" />
            <Radio value="option-3" label="Opsi 3" />
          </RadioGroup>
        </Card>

        <Card title="Disabled Group">
          <RadioGroup defaultValue="aktif" disabled orientation="horizontal">
            <Radio value="aktif" label="Aktif" />
            <Radio value="tidak-aktif" label="Tidak aktif" />
          </RadioGroup>
        </Card>

        <Card title="Disabled Option">
          <RadioGroup defaultValue="aktif" orientation="horizontal">
            <Radio value="aktif" label="Aktif" />
            <Radio value="tidak-aktif" label="Tidak aktif" disabled />
          </RadioGroup>
        </Card>
      </div>
    </div>
  );
}

const Card = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <div className="p-4 flex flex-col gap-4 bg-white dark:bg-black-80 shadow-md h-max">
      <Typography as="h4" className="text-navy-100 dark:text-greyish-semi-white">
        {title}
      </Typography>
      {children}
    </div>
  );
};
