export type CalendarDate = Date | number; 
export type ReservationCardProps = {
  startDate: CalendarDate | null;
  endDate: CalendarDate | null;
  availableDates: (CalendarDate)[]
  price: number;
  score: number;
  votes: number;
  setStartDate(start: CalendarDate): void
  setEndDate(end: CalendarDate): void
  onSubmit(): void
}