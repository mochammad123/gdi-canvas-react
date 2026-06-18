import { Button, MonthYearPicker } from '@knittotextile/react-ui';

type ActionBigCalendarProps = {
  monthYear: string;
  setMonthYear: (value: string) => void;
  addSchedule: () => void;
};

export const ActionBigCalendar = ({ monthYear, setMonthYear, addSchedule }: ActionBigCalendarProps) => (
  <div className="flex flex-row gap-4">
    <div className="flex-1">
      <MonthYearPicker value={monthYear} onChange={setMonthYear} from={2000} to={2040} />
    </div>

    <Button rounded onClick={addSchedule}>
      Add Schedule
    </Button>
  </div>
);
