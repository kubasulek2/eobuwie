import {CalendarDate} from "../../organisms/ReservationCard/types";

export type DatePickerProps = {
  startDate: CalendarDate | null;
  endDate: CalendarDate | null;
  availableDates: (CalendarDate)[]
  setStartDate(start: CalendarDate): void
  setEndDate(end: CalendarDate): void
  id?: string;
  classes?: string[];
}
export type DatePickerButtonProps = {
  startDate: CalendarDate | null;
  endDate: CalendarDate | null;
  onClick(): void; 
}