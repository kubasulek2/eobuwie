export type ReservationCardProps = {
  startDate: CalendarDate | null;
  endDate: CalendarDate | null;
  unavailableDates: (CalendarDate)[]
  price: number;
  score: number;
  votes: number;
  setStartDate(start: CalendarDate): void
  setEndDate(end: CalendarDate): void
  onSubmit(): void
}
