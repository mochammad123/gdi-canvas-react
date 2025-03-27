import { ReactNode } from 'react';

import { Typography } from '@/components/ui/typhography';
import StandarSingleRow from './standar-single-row';
import StandarDoubleRow from './standar-double-row';
import AutoWidth from './auto-width';
import SingleHeaderFilter from './single-header-filter';
import DoubleHeaderFilter from './double-header-filter';

export default function SectionTableVirtual() {
  return (
    <div className="flex flex-col gap-3 mt-10">
      <Typography as="h3">Table Virtual</Typography>
      <div className="h-2 w-72 bg-burnt-orange-100" />

      <div className="grid grid-cols-2 gap-4 auto-rows-auto">
        <div className="flex flex-col gap-4">
          <Card title="Standard (Single Row Header)">
            <StandarSingleRow />
          </Card>
          <Card title="Standard (Double Row Header)">
            <StandarDoubleRow />
          </Card>
          <Card title="Double Row Header with Filter">
            <DoubleHeaderFilter />
          </Card>
        </div>
        <div className="flex flex-col gap-4">
          <Card title="Auto Width">
            <AutoWidth />
          </Card>
          <Card title="Single Row Header with Filter">
            <SingleHeaderFilter />
          </Card>
        </div>
      </div>
    </div>
  );
}

const Card = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <div className="bg-white shadow p-4 flex flex-col gap-3 h-max">
      <Typography as="h4">{title}</Typography>
      {children}
    </div>
  );
};
