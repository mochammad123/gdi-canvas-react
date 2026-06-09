import { useState } from 'react';
import InputDateRangePicker from '@/components/ui/inputs/input-date-range-picker';
import ContentExampleCode from '@/components/content-example-code';
import ToggleShowCode from '@/components/toggle-show-code';
import { Typography } from '@/components/ui/typhography';

const CODE_EXAMPLE = {
  number1: `
    <InputDateRangePicker
      value={value}
      classNames={{ toggle: 'h-8', toggleText: 'text-sm!' }}
      onChange={({ startDate, endDate }) => {
        setValue({ startDate, endDate })
      }}
    />
  `,
  number2: `
    <InputDateRangePicker
      classNames={{ toggle: 'h-8', toggleText: 'text-sm!' }}
      label={{ startDate: 'Tanggal Mulai', endDate: 'Tanggal Selesai' }}
      placeholder={{ startDate: 'Pilih Tanggal Mulai', endDate: 'Pilih Tanggal Selesai' }}
      error={{ startDate: 'Tanggal Mulai harus diisi', endDate: 'Tanggal Selesai harus diisi' }}
      value={value}
      onChange={({ startDate, endDate }) => {
        setValue({ startDate, endDate })
      }}
    />
  `,
  number3: `
    <InputDateRangePicker
      keepCalendarOnBottom
      classNames={{ toggle: 'h-8', toggleText: 'text-sm!' }}
      label={{ startDate: 'Tanggal Mulai', endDate: 'Tanggal Selesai' }}
      placeholder={{ startDate: 'Pilih Tanggal Mulai', endDate: 'Pilih Tanggal Selesai' }}
      value={value}
      onChange={({ startDate, endDate }) => {
        setValue({ startDate, endDate })
      }}
    />
  `,
  number4: `
    <InputDateRangePicker
      mode="single"
      classNames={{ toggle: 'h-8', toggleText: 'text-sm!' }}
      label={{ startDate: 'Tanggal Mulai dan Akhir' }}
      placeholder={{ startDate: 'Pilih Tanggal Mulai dan Akhir' }}
      value={value}
      onChange={({ startDate, endDate }) => {
        setValue({ startDate, endDate })
      }}
    />
  `,
  number5: `
    <InputDateRangePicker
      classNames={{ toggle: 'h-8', toggleText: 'text-sm!' }}
      label={{ startDate: 'Tanggal Mulai', endDate: 'Tanggal Selesai' }}
      placeholder={{ startDate: 'Pilih Tanggal Mulai', endDate: 'Pilih Tanggal Selesai' }}
      onChange={({ startDate, endDate }) => {
        setValue({ startDate, endDate })
      }}
      value={value}
      minDate="2025-11-17"
      maxDate="2025-12-31"
    />
  `,
};

function InputDateRangePickerSchema() {
  const [value, setValue] = useState({
    number1: { startDate: '', endDate: '' },
    number2: { startDate: '', endDate: '' },
    number3: { startDate: '', endDate: '' },
    number4: { startDate: '', endDate: '' },
    number5: { startDate: '', endDate: '' },
  });
  const [show, setShow] = useState({ number1: false, number2: false, number3: false, number4: false, number5: false });

  const handleShowCode = (key: keyof typeof show, value: boolean) => {
    setShow({ ...show, [key]: value });
  };

  return (
    <div className="bg-white shadow p-4">
      <Typography as="h4" className="text-navy-100 mb-2.5">
        Date Range Picker
      </Typography>

      <div className="flex flex-col gap-y-6 divide-y">
        {/* Number 1 */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Typography as="global-report-title" className="text-black-100!">
              1. Standard Date Range Picker
            </Typography>
            <ToggleShowCode show={show.number1} setShow={() => handleShowCode('number1', !show.number1)} />
          </div>

          <div className="w-[25rem] mx-auto">
            <InputDateRangePicker
              classNames={{ toggle: 'h-8', toggleText: 'text-sm!' }}
              onChange={(value) => setValue((prev) => ({ ...prev, number1: value }))}
              value={value.number1}
            />
          </div>

          <ContentExampleCode show={show.number1} code={CODE_EXAMPLE.number1} />
        </div>

        {/* Number 2 */}
        <div className="space-y-2 pt-6">
          <div className="flex justify-between items-center">
            <Typography as="global-report-title" className="text-black-100!">
              2. With Label, Placeholder, and Errors
            </Typography>
            <ToggleShowCode show={show.number2} setShow={() => handleShowCode('number2', !show.number2)} />
          </div>

          <div className="w-[25rem] mx-auto">
            <InputDateRangePicker
              classNames={{ toggle: 'h-8', toggleText: 'text-sm!' }}
              label={{ startDate: 'Tanggal Mulai', endDate: 'Tanggal Selesai' }}
              placeholder={{ startDate: 'Pilih Tanggal Mulai', endDate: 'Pilih Tanggal Selesai' }}
              error={{ startDate: 'Tanggal Mulai harus diisi', endDate: 'Tanggal Selesai harus diisi' }}
              onChange={(value) => setValue((prev) => ({ ...prev, number2: value }))}
              value={value.number2}
            />
          </div>

          <ContentExampleCode show={show.number2} code={CODE_EXAMPLE.number2} />
        </div>

        {/* Number 3 */}
        <div className="space-y-2 pt-6">
          <div className="flex justify-between items-center">
            <Typography as="global-report-title" className="text-black-100!">
              3. Calendar position always at bottom
            </Typography>
            <ToggleShowCode show={show.number3} setShow={() => handleShowCode('number3', !show.number3)} />
          </div>

          <div className="w-[25rem] mx-auto">
            <InputDateRangePicker
              keepCalendarOnBottom
              classNames={{ toggle: 'h-8', toggleText: 'text-sm!' }}
              label={{ startDate: 'Tanggal Mulai', endDate: 'Tanggal Selesai' }}
              placeholder={{ startDate: 'Pilih Tanggal Mulai', endDate: 'Pilih Tanggal Selesai' }}
              onChange={(value) => setValue((prev) => ({ ...prev, number3: value }))}
              value={value.number3}
            />
          </div>

          <ContentExampleCode show={show.number3} code={CODE_EXAMPLE.number3} />
        </div>

        {/* Number 4 */}
        <div className="space-y-2 pt-6">
          <div className="flex justify-between items-center">
            <Typography as="global-report-title" className="text-black-100!">
              4. Toggle mode single
            </Typography>
            <ToggleShowCode show={show.number4} setShow={() => handleShowCode('number4', !show.number4)} />
          </div>

          <div className="w-[25rem] mx-auto">
            <InputDateRangePicker
              mode="single"
              classNames={{ toggle: 'h-8', toggleText: 'text-sm!' }}
              label={{ startDate: 'Tanggal Mulai dan Akhir' }}
              placeholder={{ startDate: 'Pilih Tanggal Mulai dan Akhir' }}
              onChange={(value) => setValue((prev) => ({ ...prev, number4: value }))}
              value={value.number4}
            />
          </div>

          <ContentExampleCode show={show.number4} code={CODE_EXAMPLE.number4} />
        </div>

        {/* Number 5 */}
        <div className="space-y-2 pt-6">
          <div className="flex justify-between items-center">
            <Typography as="global-report-title" className="text-black-100!">
              5. With min and max date
            </Typography>
            <ToggleShowCode show={show.number5} setShow={() => handleShowCode('number5', !show.number5)} />
          </div>

          <div className="w-[25rem] mx-auto">
            <InputDateRangePicker
              classNames={{ toggle: 'h-8', toggleText: 'text-sm!' }}
              label={{ startDate: 'Tanggal Mulai', endDate: 'Tanggal Selesai' }}
              placeholder={{ startDate: 'Pilih Tanggal Mulai', endDate: 'Pilih Tanggal Selesai' }}
              onChange={(value) => setValue((prev) => ({ ...prev, number5: value }))}
              value={value.number5}
              minDate="2025-11-17"
              maxDate="2025-12-31"
            />
          </div>

          <ContentExampleCode show={show.number5} code={CODE_EXAMPLE.number5} />
        </div>
      </div>
    </div>
  );
}

export default InputDateRangePickerSchema;
