import { memo, ReactNode } from 'react';

import DelayedRender from '@/components/delayed-render';
import { Typography } from '@/components/ui/typhography';
import TableAutoWidth from './table-auto-width';
import TableCheckboxSelection from './table-checkbox-selection';
import TableDoubleHeaderWithFilter from './table-double-header-with-filter';
import TableExpand from './table-expand';
import TableFullFeature from './table-full-feature';
import TableOnClickRow from './table-onclick-row';
import TableRightKlikPopupCard from './table-right-klik-popup-card';
import TableServerSideFilter from './table-server-side-filter';
import TableSingleHeaderWithFilter from './table-single-header-with-filter';
import TableStandarDoubleRow from './table-standar-double-row';
import TableStandarSingleRow from './table-standar-single-row';
import TableStickyColumn from './table-sticky-columns';
import TableSubHeader from './table-sub-header';
import TableWithActionCell from './table-with-action-cell';
import TableWithFooter from './table-with-footer';
import TableExpandNested from './table-expand-nested';

const SectionTableVirtual = () => {
  return (
    <DelayedRender delay={200}>
      <div className="p-4 bg-knitto-blue-20 flex flex-col gap-3 mt-10">
        <Typography as="h3">Table Virtual</Typography>
        <div className="h-2 w-72 bg-burnt-orange-100" />

        <div className="grid grid-cols-2 gap-4 auto-rows-auto">
          <div className="flex flex-col gap-4">
            <Card title="Standard (Single Row Header)">
              <TableStandarSingleRow />
            </Card>
            <Card title="Single Row Header with Filter">
              <TableSingleHeaderWithFilter />
            </Card>
            <Card title="Checkbox Selection">
              <TableCheckboxSelection />
            </Card>
            <Card title="Footer">
              <TableWithFooter />
            </Card>
            <Card title="Freezed Column">
              <TableStickyColumn />
            </Card>
            <Card title="Right Click PopUp Card">
              <TableRightKlikPopupCard />
            </Card>
            <Card title="Server Side Filter">
              <TableServerSideFilter />
            </Card>
            <Card title="Expand">
              <TableExpand />
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <Card title="Standard (Double Row Header)">
              <TableStandarDoubleRow />
            </Card>
            <Card title="Double Row Header with Filter">
              <TableDoubleHeaderWithFilter />
            </Card>
            <Card title="Action Cell">
              <TableWithActionCell />
            </Card>
            <Card title="Auto Width">
              <TableAutoWidth />
            </Card>
            <Card title="OnClick Row">
              <TableOnClickRow />
            </Card>
            <Card title="Sub Header">
              <TableSubHeader />
            </Card>
            <Card title="Full Feature">
              <TableFullFeature />
            </Card>
            <Card title="Expand Nested">
              <TableExpandNested />
            </Card>
          </div>
        </div>
      </div>
    </DelayedRender>
  );
};

const Card = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <div className="bg-white shadow p-4 flex flex-col gap-3 h-max">
      <Typography as="h4">{title}</Typography>
      {children}
    </div>
  );
};

export default memo(SectionTableVirtual);
