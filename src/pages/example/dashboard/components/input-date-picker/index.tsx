import { Typography } from '@knittotextile/react-ui';
import DatePickerSchema from './input-date-picker-schema';
import DateTimePickerSchema from './input-date-time-picker';
import MonthYearPickerSchema from './input-month-year-picker-schema';

const InputDateTimeSchema = () => {
  return (
    <div className="flex flex-col gap-3 mt-10">
      <Typography as="h3">Input Date & Time</Typography>
      <div className="h-2 w-72 bg-burnt-orange-100" />

      <div className="grid grid-cols-2 py-2 gap-4">
        <DateTimePickerSchema />
        <DatePickerSchema />
        <MonthYearPickerSchema />
      </div>
    </div>
  );
};

export default InputDateTimeSchema;
