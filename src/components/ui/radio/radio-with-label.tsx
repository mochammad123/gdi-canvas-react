import React from 'react';
import { Typography } from '../typhography';
import Radio from './radio';
import type { IRadioProps } from './types';

export default function RadioWithLabel({ name, label, ...props }: IRadioProps & { label: string }) {
  const labelRef = React.useRef<HTMLLabelElement>(null);

  return (
    <label className="flex gap-x-1.5 items-center cursor-pointer" ref={labelRef} onClick={() => labelRef.current?.querySelector('input')?.click()}>
      <Radio name={name} {...props} />
      <Typography as="global-paragraph">{label}</Typography>
    </label>
  );
}
