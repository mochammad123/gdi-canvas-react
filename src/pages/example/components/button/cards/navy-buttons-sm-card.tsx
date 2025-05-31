import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typhography';
import { useState } from 'react';
import ToggleShowCode from '@/components/toggle-show-code';
import ContentExampleCode from '@/components/content-example-code';

const navyButtonsSmExampleCode = `
// Required imports:
// import { Button } from '@/components/ui/button';
// import { Typography } from '@/components/ui/typhography';

// Example JSX structure:
<div className="flex flex-col gap-3 items-center w-full">
  <div className="grid grid-cols-2 w-full">
    <div className="col-span-1 text-center">
      <Button size="sm">Button</Button>
    </div>
    <div className="flex flex-col justify-center">
      <Typography as="global-paragraph">Contain</Typography>
    </div>
  </div>

  <div className="grid grid-cols-2 w-full">
    <div className="col-span-1 text-center">
      <Button size="sm" rounded>
        Button
      </Button>
    </div>
    <div className="flex flex-col justify-center">
      <Typography as="global-paragraph">Contain - Rounded</Typography>
    </div>
  </div>

  <div className="grid grid-cols-2 w-full">
    <div className="col-span-1 text-center">
      <Button size="sm" variant="outline">
        Button
      </Button>
    </div>
    <div className="flex flex-col justify-center">
      <Typography as="global-paragraph">Outline</Typography>
    </div>
  </div>

  <div className="grid grid-cols-2 w-full">
    <div className="col-span-1 text-center">
      <Button size="sm" variant="outline" rounded>
        Button
      </Button>
    </div>
    <div className="flex flex-col justify-center">
      <Typography as="global-paragraph">Outline - Rounded</Typography>
    </div>
  </div>

  <div className="grid grid-cols-2 w-full">
    <div className="col-span-1 text-center">
      <Button size="sm" variant="text">
        Button
      </Button>
    </div>
    <div className="flex flex-col justify-center">
      <Typography as="global-paragraph">Text</Typography>
    </div>
  </div>

  <div className="grid grid-cols-2 w-full">
    <div className="col-span-1 text-center">
      <Button size="sm" disabled>
        Button
      </Button>
    </div>
    <div className="flex flex-col justify-center">
      <Typography as="global-paragraph">Disabled</Typography>
    </div>
  </div>
</div>
`;

export default function NavyButtonsSmCard() {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="bg-white shadow p-4 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <Typography as="h4" className="text-navy-100">
          Navy (SM)
        </Typography>
        <ToggleShowCode show={showCode} setShow={setShowCode} />
      </div>

      <div className="flex flex-col gap-3 items-center">
        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm">Button</Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Contain</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" rounded>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Contain - Rounded</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" variant="outline">
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Outline</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" variant="outline" rounded>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Outline - Rounded</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" variant="text">
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Text</Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" disabled>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph">Disabled</Typography>
          </div>
        </div>
      </div>
      <ContentExampleCode show={showCode} code={navyButtonsSmExampleCode} />
    </div>
  );
}
