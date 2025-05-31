import { Button } from '@/components/ui/button';
import ChevronIcon from '@/components/ui/icon/chevron';
import { Typography } from '@/components/ui/typhography';
import { useState } from 'react';
import ToggleShowCode from '@/components/toggle-show-code';
import ContentExampleCode from '@/components/content-example-code';

const iconButtonsExampleCode = `
// Required imports:
// import { Button } from '@/components/ui/button';
// import ChevronIcon from '@/components/ui/icon/chevron'; // Or your icon component
// import { Typography } from '@/components/ui/typhography';

// Example JSX structure:
<div className="flex flex-col gap-3 items-center w-full">
  <div className="grid grid-cols-2 w-full">
    <div className="col-span-1 flex justify-center">
      <Button loading rounded>
        Button
      </Button>
    </div>
    <div className="flex flex-col justify-center">
      <Typography as="global-paragraph">Loading</Typography>
    </div>
  </div>

  <div className="grid grid-cols-2 w-full">
    <div className="col-span-1 text-center">
      <Button color="steel-blue" LeftIcon={() => <ChevronIcon className="text-white" />} rounded>
        Button
      </Button>
    </div>
    <div className="flex flex-col justify-center">
      <Typography as="global-paragraph">Left Icon</Typography>
    </div>
  </div>

  <div className="grid grid-cols-2 w-full">
    <div className="col-span-1 text-center">
      <Button color="steel-blue" RightIcon={() => <ChevronIcon className="text-white" rotate="right" />} rounded>
        Button
      </Button>
    </div>
    <div className="flex flex-col justify-center">
      <Typography as="global-paragraph">Right Icon</Typography>
    </div>
  </div>

  <div className="grid grid-cols-2 w-full">
    <div className="col-span-1 text-center">
      <Button
        color="steel-blue"
        LeftIcon={() => <ChevronIcon className="text-white" />}
        RightIcon={() => <ChevronIcon className="text-white" rotate="right" />}
        rounded
      >
        Button
      </Button>
    </div>
    <div className="flex flex-col justify-center">
      <Typography as="global-paragraph">Multiple Icon</Typography>
    </div>
  </div>

  <div className="grid grid-cols-2 w-full">
    <div className="col-span-1 text-center">
      <Button color="steel-blue" LeftIcon={() => <ChevronIcon className="text-white" />} className="" rounded />
    </div>
    <div className="flex flex-col justify-center">
      <Typography as="global-paragraph">Only Icon</Typography>
    </div>
  </div>

  <div className="grid grid-cols-2 w-full">
    <div className="col-span-1 text-center">
      <Button color="navy" rounded badge={5}>
        Button
      </Button>
    </div>
    <div className="flex flex-col justify-center">
      <Typography as="global-paragraph">Badges</Typography>
    </div>
  </div>
</div>
`;

export default function IconButtonsCard() {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="bg-white shadow p-4 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <Typography as="h4" className="text-navy-100">
          With Icon
        </Typography>
        <ToggleShowCode show={showCode} setShow={setShowCode} />
      </div>

      <div className="flex flex-col gap-3 items-center">
        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 flex justify-center">
            <Button loading rounded>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Loading</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button color="steel-blue" LeftIcon={() => <ChevronIcon className="text-white" />} rounded>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Left Icon</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button color="steel-blue" RightIcon={() => <ChevronIcon className="text-white" rotate="right" />} rounded>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Right Icon</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button
              color="steel-blue"
              LeftIcon={() => <ChevronIcon className="text-white" />}
              RightIcon={() => <ChevronIcon className="text-white" rotate="right" />}
              rounded
            >
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Multiple Icon</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button color="steel-blue" LeftIcon={() => <ChevronIcon className="text-white" />} className="" rounded />
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Only Icon</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button color="navy" rounded badge={5}>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Badges</Typography>
          </div>
        </div>
      </div>
      <ContentExampleCode show={showCode} code={iconButtonsExampleCode} />
    </div>
  );
}
