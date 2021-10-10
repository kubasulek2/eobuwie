export type CalendarDate = Date | number; 
export type ReservationCardProps = {
  startDate:  | null;
  endDate: CalendarDate | null;
  availableDates: (CalendarDate)[]
  price: number;
  score: number;
  votes: number;
  onDatesSelected(start: CalendarDate, end: CalendarDate): void
  onSubmit(): void
}