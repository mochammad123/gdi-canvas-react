import { Typography, ISelect } from '@knittotextile/react-ui';
import { ReactNode } from 'react';
import SelectionDefault from './selection-default';
import SelectionMultiple from './selection-multiple';
import SelectionLabel from './selection-label';
import SelectionHint from './selection-hint';
import SelectionPlaceholder from './selection-placeholder';
import SelectionPrefixIcon from './selection-prefix-icon';
import SelectionStatus from './selection-status';
import SelectionDisabled from './selection-disabled';
import SelectionCustomLabel from './selection-custom-label';
import SelectionDisabledOption from './selection-disabled-option';
import SelectionIgnoreUnknownValue from './selection-ignore-unknown-value';
import SelectionDisableSearch from './selection-disable-search';
import SelectionBigData from './selection-big-data';
import SelectionLoading from './selection-loading';
import SelectionOptionIcon from './selection-option-icon';

export default function Selection() {
  const options: ISelect['options'] = Array(50)
    .fill(true)
    .map((_, idx) => ({
      label: 'Item List ' + idx,
      value: 'item-list-' + idx,
    }));

  return (
    <div className="flex flex-col gap-3 mt-10">
      <Typography as="h3">Selection</Typography>
      <div className="h-2 w-72 bg-burnt-orange-100" />

      <div className="grid grid-cols-3 gap-5 auto-rows-auto">
        <div className="flex flex-col gap-5">
          <Card title="Basic Usage">
            <SelectionDefault options={options} />
          </Card>
          <Card title="Placeholder">
            <SelectionPlaceholder options={options} />
          </Card>
          <Card title="Status">
            <SelectionStatus options={options} />
          </Card>
          <Card title="Disable Search">
            <SelectionDisableSearch options={options} />
          </Card>
          <Card title="Big data">
            <SelectionBigData />
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card title="Multiple">
            <SelectionMultiple options={options} />
          </Card>
          <Card title="Hint Text">
            <SelectionHint options={options} />
          </Card>
          <Card title="Custom Render Label">
            <SelectionCustomLabel options={options} />
          </Card>
          <Card title="Disabled">
            <SelectionDisabled options={options} />
          </Card>
          <Card title="Loading">
            <SelectionLoading options={options} />
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card title="With Label">
            <SelectionLabel options={options} />
          </Card>
          <Card title="Prefix Icon">
            <SelectionPrefixIcon options={options} />
          </Card>
          <Card title="Option with Icon">
            <SelectionOptionIcon options={options} />
          </Card>
          <Card title="Disabled Option">
            <SelectionDisabledOption options={options} />
          </Card>
          <Card title="Ignore Unknown Value">
            <SelectionIgnoreUnknownValue options={options} />
          </Card>
        </div>
      </div>
    </div>
  );
}

const Card = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <div className="p-4 flex flex-col gap-4 bg-white dark:bg-black-80 shadow-md h-max">
      <Typography as="h4" className="text-navy-100 dark:text-greyish-semi-white">
        {title}
      </Typography>
      {children}
    </div>
  );
};
