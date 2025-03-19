import ColorKnitto from '@/../tailwind/tailwind.colors';
import { useMemo } from 'react';
import ColorSchema from './components/color-schema';
import TyphographiSchema from './components/typographi-schema';
import ButtonSchema from './components/button-schema';
import InputDateTimeSchema from './components/input-date-time-schema';
import TableVirtual from './components/table-virtual';

export default function Dashboard() {
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

  // const strings = [
  //   'bg-knitto-blue-100',
  //   'bg-knitto-blue-80',
  //   'bg-knitto-blue-60',
  //   'bg-knitto-blue-40',
  //   'bg-knitto-blue-20',
  //   'bg-navy-100',
  //   'bg-navy-80',
  //   'bg-navy-60',
  //   'bg-navy-40',
  //   'bg-navy-20',
  //   'bg-steel-blue-100',
  //   'bg-steel-blue-80',
  //   'bg-steel-blue-60',
  //   'bg-steel-blue-40',
  //   'bg-steel-blue-20',
  //   'bg-burnt-orange-100',
  //   'bg-burnt-orange-80',
  //   'bg-burnt-orange-60',
  //   'bg-burnt-orange-40',
  //   'bg-burnt-orange-20',
  //   'bg-greyish-down',
  //   'bg-greyish-semi-dark',
  //   'bg-greyish-semi-dark-50',
  //   'bg-greyish-semi-white',
  //   'bg-greyish-bright-white',
  //   'bg-black-100',
  //   'bg-black-80',
  //   'bg-black-60',
  //   'bg-black-40',
  //   'bg-black-20',
  // ];

  return (
    <div className="p-2 bg-knitto-blue-20 pb-96">
      <section>
        <ColorSchema arrayColors={splitArrays} />
      </section>
      <section>
        <TyphographiSchema />
      </section>
      <section>
        <ButtonSchema />
      </section>
      <section>
        <InputDateTimeSchema />
      </section>
      <section>
        <TableVirtual />
      </section>
    </div>
  );
}
