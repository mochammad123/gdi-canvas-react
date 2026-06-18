import { ISelect, Select, Typography } from '@knittotextile/react-ui';
import { useState } from 'react';
import ContentExampleCode from '../content-example-code';
import ToggleShowCode from '../toggle-show-code';

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

const Icon2 = (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7H9l2-7H7l-2 2H2l2-4l-2-4h3l2 2h4L9 3h3z"
    ></path>
  </svg>
);

const Icon3 = (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8.248 6c-.41 0-.75.34-.75.75v1.64l-1.5.68V6.75c0-1.24 1.01-2.25 2.25-2.25h.75v-.25c0-1.24 1.01-2.25 2.25-2.25h1.5c1.24 0 2.25 1.01 2.25 2.25v.25h.75c1.24 0 2.25 1.01 2.25 2.25v2.32l-1.5-.68V6.75c0-.41-.34-.75-.75-.75zm3-2.5c-.41 0-.75.34-.75.75v.25h3v-.25c0-.41-.34-.75-.75-.75z"
      clipRule="evenodd"
    ></path>
    <path
      fill="currentColor"
      d="M5.378 17.7c.4.02.79.18 1.09.41c.21.16.46.32.74.47q-.015-.03-.025-.06t-.025-.06l-1.57-5.39a.75.75 0 0 1 .43-.9l5.69-2.43c.19-.08.4-.08.59 0l5.69 2.43c.35.15.53.53.43.9l-1.57 5.39s-.03.08-.05.12c.28-.15.53-.31.74-.47c.3-.23.69-.38 1.09-.41l1.22-4.22c.32-1.09-.23-2.25-1.28-2.7l-5.69-2.43c-.56-.24-1.2-.24-1.77 0l-5.69 2.43c-1.05.45-1.6 1.6-1.28 2.7l1.22 4.22zm16.18 2.62l-2.73-1.26a.75.75 0 0 0-.85.16c-.01.01-1.27 1.27-2.72 1.27c-.19 0-.36-.03-.53-.06c-1.21-.25-2.17-1.21-2.18-1.22a.76.76 0 0 0-.54-.23c-.2 0-.39.08-.54.22c-.01.01-.97.97-2.18 1.22l-.176.024a3 3 0 0 1-.374.036c-1.45 0-2.71-1.26-2.72-1.27a.75.75 0 0 0-.85-.16l-2.73 1.26c-.38.17-.54.62-.37.99c.17.38.62.54 1 .37l2.28-1.05c.62.51 1.89 1.36 3.39 1.36c1.4 0 2.6-.75 3.26-1.26c.66.51 1.86 1.26 3.26 1.26c1.5 0 2.77-.86 3.39-1.36l2.28 1.05c.37.17.82 0 1-.37c.17-.38 0-.82-.37-.99z"
    ></path>
  </svg>
);

const icons = [Icon, Icon2, Icon3];

export default function SelectionOptionIcon({ options }: { options: ISelect['options'] }) {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(null);

  const mapOptions = options.slice(0, 3).map((option, idx) => ({
    ...option,
    icon: icons[idx],
    label: (
      <div className="flex items-center gap-2">
        <Typography as="global-paragraph">List Item {idx + 1}</Typography>
      </div>
    ),
  }));

  return (
    <>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <Typography as="global-description">
            Komponen selection dengan option icon. <br /> Jika terdapat icon pada list options maka icon akan ditampilkan ke selection box ketika
            dipilih.
          </Typography>
        </div>
        <ToggleShowCode show={show} setShow={setShow} className="-mt-[40px]" />
      </div>

      <Select
        options={mapOptions}
        value={value}
        onChangeSingleOption={(value) => setValue(value as string)}
        onResetSelection={() => setValue(null)}
        className="w-[20rem]!"
      />
      <ContentExampleCode show={show} code={code} />
    </>
  );
}

const code = `
import { useState } from 'react';
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

const Icon2 = (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7H9l2-7H7l-2 2H2l2-4l-2-4h3l2 2h4L9 3h3z"
    ></path>
  </svg>
);

const Icon3 = (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8.248 6c-.41 0-.75.34-.75.75v1.64l-1.5.68V6.75c0-1.24 1.01-2.25 2.25-2.25h.75v-.25c0-1.24 1.01-2.25 2.25-2.25h1.5c1.24 0 2.25 1.01 2.25 2.25v.25h.75c1.24 0 2.25 1.01 2.25 2.25v2.32l-1.5-.68V6.75c0-.41-.34-.75-.75-.75zm3-2.5c-.41 0-.75.34-.75.75v.25h3v-.25c0-.41-.34-.75-.75-.75z"
      clipRule="evenodd"
    ></path>
    <path
      fill="currentColor"
      d="M5.378 17.7c.4.02.79.18 1.09.41c.21.16.46.32.74.47q-.015-.03-.025-.06t-.025-.06l-1.57-5.39a.75.75 0 0 1 .43-.9l5.69-2.43c.19-.08.4-.08.59 0l5.69 2.43c.35.15.53.53.43.9l-1.57 5.39s-.03.08-.05.12c.28-.15.53-.31.74-.47c.3-.23.69-.38 1.09-.41l1.22-4.22c.32-1.09-.23-2.25-1.28-2.7l-5.69-2.43c-.56-.24-1.2-.24-1.77 0l-5.69 2.43c-1.05.45-1.6 1.6-1.28 2.7l1.22 4.22zm16.18 2.62l-2.73-1.26a.75.75 0 0 0-.85.16c-.01.01-1.27 1.27-2.72 1.27c-.19 0-.36-.03-.53-.06c-1.21-.25-2.17-1.21-2.18-1.22a.76.76 0 0 0-.54-.23c-.2 0-.39.08-.54.22c-.01.01-.97.97-2.18 1.22l-.176.024a3 3 0 0 1-.374.036c-1.45 0-2.71-1.26-2.72-1.27a.75.75 0 0 0-.85-.16l-2.73 1.26c-.38.17-.54.62-.37.99c.17.38.62.54 1 .37l2.28-1.05c.62.51 1.89 1.36 3.39 1.36c1.4 0 2.6-.75 3.26-1.26c.66.51 1.86 1.26 3.26 1.26c1.5 0 2.77-.86 3.39-1.36l2.28 1.05c.37.17.82 0 1-.37c.17-.38 0-.82-.37-.99z"
    ></path>
  </svg>
);

const icons = [Icon, Icon2, Icon3];

export default function SelectionOptionIcon({ options }: { options: ISelect['options'] }) {
  const [value, setValue] = useState<string | null>(null);

  const mapOptions = options.slice(0, 3).map((option, idx) => ({
    ...option,
    icon: icons[idx],
    label: (
      <div className="flex items-center gap-2">
        <Typography as="global-paragraph">List Item {idx + 1}</Typography>
      </div>
    ),
  }));

  return (
      <Select
        options={mapOptions}
        value={value}
        onChangeSingleOption={(value) => setValue(value as string)}
        onResetSelection={() => setValue(null)}
        className="w-[20rem]!"
      />
  );
}
`;
