import { Typography } from '@knittotextile/react-ui';
import DateTimePickerSchema from './input-date-time-picker';
import DatePickerSchema from './input-date-picker-schema';
import MonthYearPickerSchema from './input-month-year-picker-schema';
import DateRangePickerSchema from './input-date-range-picker-schema';

export default function InputDateAndTime() {
  return (
    <div className="p-4 bg-knitto-blue-20 dark:bg-black-100 flex flex-col gap-3 mb-10">
      <Typography as="h3">Input Date & Time</Typography>
      <div className="h-2 w-72 bg-burnt-orange-100" />

      <div className="grid grid-cols-2 gap-4">
        <div className="w-full flex flex-col gap-y-4">
          <DateTimePickerSchema />
          <MonthYearPickerSchema />
        </div>

        <div className="w-full flex flex-col gap-y-4">
          <DatePickerSchema />
          <DateRangePickerSchema />
        </div>
      </div>
    </div>
  );
}
