import {CalendarDate} from "../../organisms/ReservationCard/types";

export type DatePickerProps = {
  startDate: CalendarDate | null;
  endDate: CalendarDate | null;
  unavailableDates: (CalendarDate)[]
  setStartDate(start: CalendarDate): void
  setEndDate(end: CalendarDate): void
  id?: string;
  classes?: string[];
}
export type DatePickerModalProps = {
  open: boolean;
  id: string;
  unavailableDates: (CalendarDate)[]
  onDates(start: CalendarDate, end: CalendarDate): void; 
}