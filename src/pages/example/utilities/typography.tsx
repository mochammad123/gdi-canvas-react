import ContentExampleCode from '@/components/content-example-code';
import ToggleShowCode from '@/components/toggle-show-code';
import { Typography } from '@knittotextile/react-ui';
import { useState } from 'react';

export default function TypographyPage() {
  const [show, setShow] = useState(false);

  return (
    <div className="p-4 flex flex-col gap-3 mb-10">
      <Typography as="h3">Typhograph</Typography>
      <div className="h-2 w-72 bg-burnt-orange-100" />

      <div className="flex flex-col rounded shadow pb-7 bg-white dark:bg-black-80">
        <div className="flex justify-end p-3">
          <ToggleShowCode show={show} setShow={setShow} />
        </div>
        <div className="flex flex-row gap-5">
          <Typography as="h1" className="w-56 text-center">
            H1
          </Typography>
          <Typography as="h1">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>

        <div className="flex flex-row gap-5">
          <Typography as="h2" className="w-56 text-center">
            H2
          </Typography>
          <Typography as="h2">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>

        <div className="flex flex-row gap-5">
          <Typography as="h3" className="w-56 text-center">
            H3
          </Typography>
          <Typography as="h3">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>

        <div className="flex flex-row gap-5">
          <Typography as="h4" className="w-56 text-center">
            H4
          </Typography>
          <Typography as="h4">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>

        <div className="flex flex-row gap-5">
          <Typography as="h5" className="w-56 text-center">
            H5
          </Typography>
          <Typography as="h5">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>

        <div className="flex flex-row gap-5">
          <Typography as="h6" className="w-56 text-center">
            H6
          </Typography>
          <Typography as="h6">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>

        <div className="flex flex-row gap-5">
          <Typography as="global-paragraph" className="w-56 text-center">
            Global Paragraph
          </Typography>
          <Typography as="global-paragraph">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>

        <div className="flex flex-row gap-5">
          <Typography as="global-strong" className="w-56 text-center">
            Global Paragraph / Link
          </Typography>
          <Typography as="global-strong">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>

        <div className="flex flex-row gap-5">
          <Typography as="global-description" className="w-56 text-center">
            Global Description
          </Typography>
          <Typography as="global-description">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>

        <div className="flex flex-row gap-5">
          <Typography as="global-button" className="w-56 text-center">
            Global Button
          </Typography>
          <Typography as="global-button">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>

        <div className="flex flex-row gap-5">
          <Typography as="global-report-title" className="w-56 text-center">
            Global Report Label
          </Typography>
          <Typography as="global-report-title">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>

        <div className="flex flex-row gap-5">
          <Typography as="global-report-content" className="w-56 text-center">
            Global Report Label Description
          </Typography>
          <Typography as="global-report-content">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>

        <div className="flex flex-row gap-5">
          <Typography as="global-hint" className="w-56 text-center">
            Global Hint
          </Typography>
          <Typography as="global-hint">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>
        <div className="p-5">
          <ContentExampleCode show={show} code={codeExample} />
        </div>
      </div>
    </div>
  );
}

const codeExample = `
import { Typography } from '@knittotextile/react-ui';

export default function TypographyPage() {
  return (
    <div className="p-4 bg-knitto-blue-20 flex flex-col gap-3 mb-10">
      <Typography as="h3">Typhograph</Typography>
      <div className="h-2 w-72 bg-burnt-orange-100" />

      <div className="flex flex-col bg-white rounded shadow pb-7">
        <div className="flex flex-row gap-5">
          <Typography as="h1" className="w-56 text-center">
            H1
          </Typography>
          <Typography as="h1">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>

        <div className="flex flex-row gap-5">
          <Typography as="h2" className="w-56 text-center">
            H2
          </Typography>
          <Typography as="h2">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>

        <div className="flex flex-row gap-5">
          <Typography as="h3" className="w-56 text-center">
            H3
          </Typography>
          <Typography as="h3">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>

        <div className="flex flex-row gap-5">
          <Typography as="h4" className="w-56 text-center">
            H4
          </Typography>
          <Typography as="h4">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>

        <div className="flex flex-row gap-5">
          <Typography as="h5" className="w-56 text-center">
            H5
          </Typography>
          <Typography as="h5">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>

        <div className="flex flex-row gap-5">
          <Typography as="h6" className="w-56 text-center">
            H6
          </Typography>
          <Typography as="h6">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>

        <div className="flex flex-row gap-5">
          <Typography as="global-paragraph" className="w-56 text-center">
            Global Paragraph
          </Typography>
          <Typography as="global-paragraph">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>

        <div className="flex flex-row gap-5">
          <Typography as="global-strong" className="w-56 text-center">
            Global Paragraph / Link
          </Typography>
          <Typography as="global-strong">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>

        <div className="flex flex-row gap-5">
          <Typography as="global-description" className="w-56 text-center">
            Global Description
          </Typography>
          <Typography as="global-description">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>

        <div className="flex flex-row gap-5">
          <Typography as="global-button" className="w-56 text-center">
            Global Button
          </Typography>
          <Typography as="global-button">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>

        <div className="flex flex-row gap-5">
          <Typography as="global-report-title" className="w-56 text-center">
            Global Report Label
          </Typography>
          <Typography as="global-report-title">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>

        <div className="flex flex-row gap-5">
          <Typography as="global-report-content" className="w-56 text-center">
            Global Report Label Description
          </Typography>
          <Typography as="global-report-content">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>

        <div className="flex flex-row gap-5">
          <Typography as="global-hint" className="w-56 text-center">
            Global Hint
          </Typography>
          <Typography as="global-hint">Lorem ipsum dolor sit amet consectetur</Typography>
        </div>
      </div>
    </div>
  );
}`;
