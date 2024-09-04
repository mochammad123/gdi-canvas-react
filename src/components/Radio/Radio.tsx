import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { IRadioProps } from './types';

export default function Radio({ name, checked = false, onChecked }: IRadioProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.checked = checked || false;
  }, [checked]);

  return (
    <div
      className={clsx('w-[1.125rem] cursor-pointer rounded-full h-[1.125rem] flex justify-center items-center', {
        'bg-knitto-blue-100': checked,
        'border-black-40 border': !checked,
      })}
    >
      <input ref={inputRef} type="radio" name={name} className="absolute opacity-0" onChange={(e) => onChecked(e.target.checked)} />
      {checked && <div className={clsx('w-[.375rem] rounded-full h-[.375rem]  bg-white')}></div>}
    </div>
  );
}
