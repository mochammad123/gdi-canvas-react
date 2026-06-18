import { Typography } from '@knittotextile/react-ui';

interface ITypographyComponent {
  arrayColors: string[][];
}

function ColorSchema({ arrayColors }: ITypographyComponent) {
  return (
    <div className="flex flex-col gap-3 mb-10">
      <Typography as="h3">Color</Typography>
      <div className="h-2 w-72 bg-burnt-orange-100" />

      <div className="grid grid-cols-4 gap-10">
        {arrayColors.map((splitArrayChildrens, key) => {
          return (
            <div key={key} className="shadow p-2 rounded bg-white">
              {splitArrayChildrens.map((splitArrayChildren, keyChildren) => (
                <div key={keyChildren} className="flex flex-row items-center gap-5 w-full">
                  <div className={`w-10 h-3 bg-${splitArrayChildren} `} />
                  {`bg-${splitArrayChildren}`}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ColorSchema;
