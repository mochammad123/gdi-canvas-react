import ColorKnitto from '@/../tailwind/tailwind.colors';
import { Typography } from '@/components/ui/typhography';
import { useMemo } from 'react';

export default function Color() {
  const colorKnittos = Object.keys(ColorKnitto).map((colorKnitto) => colorKnitto);

  const splitArrays = useMemo(() => {
    const result: string[][] = [];
    const chunkSize = 5;

    for (let i = 0; i < colorKnittos.length; i += chunkSize) {
      const chunk = colorKnittos.slice(i, i + chunkSize);
      chunk.map((chunk) => chunk);
      result.push(chunk);
    }

    return result;
  }, [colorKnittos]);

  return (
    <div className="p-4 bg-knitto-blue-20 flex flex-col gap-3 mb-10">
      <Typography as="h3">Color</Typography>
      <div className="h-2 w-72 bg-burnt-orange-100" />

      <div className="grid grid-cols-4 gap-10">
        {splitArrays.map((splitArrayChildrens, key) => {
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
