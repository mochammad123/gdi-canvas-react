import { Button } from '@knittotextile/react-ui';
import { Typography } from '@knittotextile/react-ui';
import { useState } from 'react';
import ToggleShowCode from '@/components/toggle-show-code';
import ContentExampleCode from '@/components/content-example-code';

const whiteButtonsSmExampleCode = `
// Required imports:
// import { Button } from '@knittotextile/react-ui';
// import { Typography } from '@knittotextile/react-ui';

// Example JSX structure (ensure parent has dark background for white buttons to be visible):
// <div className="bg-navy-60 p-4">
//   <div className="flex flex-col gap-3 items-center w-full">
//     ... (content below) ...
//   </div>
// </div>

<div className="flex flex-col gap-3 items-center w-full">
  <div className="grid grid-cols-2 w-full">
    <div className="col-span-1 text-center">
      <Button size="sm" color="white">
        Button
      </Button>
    </div>
    <div className="flex flex-col justify-center">
      <Typography as="global-paragraph" className="text-white">
        Contain
      </Typography>
    </div>
  </div>

  <div className="grid grid-cols-2 w-full">
    <div className="col-span-1 text-center">
      <Button size="sm" color="white" rounded>
        Button
      </Button>
    </div>
    <div className="flex flex-col justify-center">
      <Typography as="global-paragraph" className="text-white">
        Contain - Rounded
      </Typography>
    </div>
  </div>

  <div className="grid grid-cols-2 w-full">
    <div className="col-span-1 text-center">
      <Button size="sm" color="white" variant="text">
        Button
      </Button>
    </div>
    <div className="flex flex-col justify-center">
      <Typography as="global-paragraph" className="text-white">
        Text
      </Typography>
    </div>
  </div>

  <div className="grid grid-cols-2 w-full">
    <div className="col-span-1 text-center">
      <Button size="sm" disabled>
        Button
      </Button>
    </div>
    <div className="flex flex-col justify-center">
      <Typography as="global-paragraph" className="text-white">
        Disabled
      </Typography>
    </div>
  </div>
</div>
`;

export default function WhiteButtonsSmCard() {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="bg-navy-60 shadow p-4 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <Typography as="h4" className="text-white">
          White (SM)
        </Typography>
        <ToggleShowCode show={showCode} setShow={setShowCode} />
      </div>

      <div className="flex flex-col gap-3 items-center">
        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" color="white">
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph" className="text-white">
              Contain
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" color="white" rounded>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph" className="text-white">
              Contain - Rounded
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" color="white" variant="text">
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph" className="text-white">
              Text
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="col-span-1 text-center">
            <Button size="sm" disabled>
              Button
            </Button>
          </div>
          <div className="flex flex-col justify-center">
            <Typography as="global-paragraph" className="text-white">
              Disabled
            </Typography>
          </div>
        </div>
      </div>
      <ContentExampleCode show={showCode} code={whiteButtonsSmExampleCode} />
    </div>
  );
}
