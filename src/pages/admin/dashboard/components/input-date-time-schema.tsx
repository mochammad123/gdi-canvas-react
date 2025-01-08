import InputDatePicker from '@/components/ui/inputs/input-date-picker';
import InputDateTimePicker from '@/components/ui/inputs/input-date-time-picker';
import { Typography } from '@/components/ui/typhography';
import { useParams } from '@/lib/hooks/hooks';

const InputDateTimeSchema = () => {
  const { dateTime, setDateTime, tanggal_awal, setTanggalAwal } = useParams();
  return (
    <div className="flex flex-col gap-3 mt-10">
      <Typography as="h3">Input Date & Time</Typography>
      <div className="h-2 w-72 bg-burnt-orange-100" />

      <div className="grid grid-cols-4 py-2 gap-4">
        <div className="bg-white shadow p-4 flex flex-col gap-3 items-center">
          <Typography as="h4" className="text-navy-100">
            Date Time Picker
          </Typography>
          <div className="grid w-full">
            <InputDateTimePicker value={dateTime} onChange={setDateTime} />
          </div>
        </div>
        <div className="bg-white shadow p-4 flex flex-col gap-3 items-center">
          <Typography as="h4" className="text-navy-100">
            Date Picker
          </Typography>
          <div className="grid w-full">
            <InputDatePicker value={tanggal_awal} onChange={setTanggalAwal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputDateTimeSchema;
