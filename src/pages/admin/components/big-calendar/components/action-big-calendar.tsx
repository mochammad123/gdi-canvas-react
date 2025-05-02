import { Button } from '@/components/ui/button';
import InputMonthYearPicker from '@/components/ui/inputs/input-month-year-picker';

type ActionBigCalendarProps = {
  monthYear: string;
  setMonthYear: (value: string) => void;
  addSchedule: () => void;
};

export const ActionBigCalendar = ({ monthYear, setMonthYear, addSchedule }: ActionBigCalendarProps) => (
  <div className="flex flex-row gap-4">
    <div className="flex-1">
      <InputMonthYearPicker value={monthYear} onChange={setMonthYear} from={2000} to={2040} />
    </div>

    <Button rounded onClick={addSchedule}>
      Add Schedule
    </Button>
  </div>
);
