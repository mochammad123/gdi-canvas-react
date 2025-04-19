import { Typography } from '@/components/ui/typhography';
import InputDateTimePickerSchema from '../../dashboard/components/input-date-picker/input-date-time-picker';
import InputDatePickerSchema from '../../dashboard/components/input-date-picker/input-date-picker-schema';
import InputMonthYearPickerSchema from '../../dashboard/components/input-date-picker/input-month-year-picker-schema';

export default function InputDateAndTime() {
  return (
    <div className="p-4 bg-knitto-blue-20 flex flex-col gap-3 mt-10">
      <Typography as="h3">Input Date & Time</Typography>
      <div className="h-2 w-72 bg-burnt-orange-100" />

      <div className="grid grid-cols-2 py-2 gap-4">
        <InputDateTimePickerSchema />
        <InputDatePickerSchema />
        <InputMonthYearPickerSchema />
      </div>
    </div>
  );
}
