import clsx from 'clsx';
import React from 'react';

type Props = { data?:string; text: string; classNameWrapper?:string; classNameText?:string }

const KNUI: React.FC<Props> = ({ text, data, classNameWrapper, classNameText }) => {
  return (
    <div className={clsx(['absolute bottom-0 left-0 right-0 flex justify-end pr-1 items-center bg-[#F0F0F0] h-6', classNameWrapper])}>
      <a href={`${import.meta.env.VITE_DOCUMENTATION_URL}/${data || text}`} className={clsx('underline text-base text-navy-100 font-bold', classNameText)}>{text || data}</a>
    </div>
  );
};

export default KNUI;
