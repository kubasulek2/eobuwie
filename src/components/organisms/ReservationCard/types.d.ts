export type CalendarDate = Date | number; 
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

type IMonthDay = {
  timeStamp: number;
  available: boolean;
  today: boolean;
  weekDay: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  monthDay: number;
  dateString: string;
}