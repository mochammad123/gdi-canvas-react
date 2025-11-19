import { Typography } from '@/components/ui/typhography';
import InputDateTimePickerSchema from './input-date-time-picker';
import InputDatePickerSchema from './input-date-picker-schema';
import InputMonthYearPickerSchema from './input-month-year-picker-schema';
import InputDateRangePickerSchema from './input-date-range-picker-schema';

export default function InputDateAndTime() {
  return (
    <div className="p-4 bg-knitto-blue-20 flex flex-col gap-3">
      <Typography as="h3">Input Date & Time</Typography>
      <div className="h-2 w-72 bg-burnt-orange-100" />

      <div className="grid grid-cols-2 gap-4">
        <div className="w-full flex flex-col gap-y-4">
          <InputDateTimePickerSchema />
          <InputMonthYearPickerSchema />
        </div>

        <div className="w-full flex flex-col gap-y-4">
          <InputDatePickerSchema />
          <InputDateRangePickerSchema />
        </div>
      </div>
    </div>
  );
}
