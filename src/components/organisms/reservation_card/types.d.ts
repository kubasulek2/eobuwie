import {CalendarDate} from "../../../hooks/useDatePicker";

export type ReservationCardProps = {
  startDate: CalendarDate | null;
  endDate: CalendarDate | null;
  unavailableDates: (CalendarDate)[]
  price: number;
  score: number;
  votes: number;
  setStartDate(start: CalendarDate | null): void
  setEndDate(end: CalendarDate | null): void
  onSubmit(): void
}
