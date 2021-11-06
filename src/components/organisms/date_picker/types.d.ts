import {CalendarDate} from "../../../hooks/useDatePicker";

export type DatePickerProps = {
  startDate: CalendarDate | null;
  endDate: CalendarDate | null;
  unavailableDates: (CalendarDate)[]
  setStartDate(start: CalendarDate | null): void
  setEndDate(end: CalendarDate | null): void
  id?: string;
  classes?: string[];
}
