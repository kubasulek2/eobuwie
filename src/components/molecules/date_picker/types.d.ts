import {CalendarDate} from "../../organisms/ReservationCard/types";

export type DatePickerProps = {
  startDate: CalendarDate | null;
  endDate: CalendarDate | null;
  availableDates: (CalendarDate)[]
  setStartDate(start: CalendarDate): void
  setEndDate(end: CalendarDate): void
  onSubmit(): void;
  id?: string;
  classes?: string[];
}