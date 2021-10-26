import isToday from 'date-fns/isToday';
import getDay from 'date-fns/getDay';
import isBefore from 'date-fns/isBefore';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import addDays from 'date-fns/addDays';
import isSameDay from 'date-fns/isSameDay';
import isSameMonth from 'date-fns/isSameMonth';
import format from "date-fns/format";
import {CalendarDate, IMonthDay} from "../components/organisms/ReservationCard/types";

/**
 * Function takes two dates as Date objects or timestamps and returns array of formatted MonthDay objects.
 */
export function computeCalendarDays (
  startDate: CalendarDate,
  endDate: CalendarDate,
  unavailableDates: CalendarDate[],
  selectedDate: CalendarDate = new Date()
): IMonthDay[] {

  if (isBefore(endDate, startDate)) throw new TypeError('End date must not be before start date');
  const daysDiff = differenceInCalendarDays(endDate, startDate);
  const today = new Date();

  // for performance reasons filter available dates now, rather than check it each time in a loop
  unavailableDates = unavailableDates.filter(d => isSameMonth(d, selectedDate));

  const days: IMonthDay[] = [];
  for (let i = 0; i <= daysDiff; i++) {
    const currentDay = addDays(startDate, i);
    const notPast = differenceInCalendarDays(currentDay,today) >= 0;
    days.push({
      available: notPast && !unavailableDates.some(d => isSameDay(d, currentDay)),
      weekDay: getDay(currentDay),
      today: isToday(currentDay),
      timeStamp: currentDay.getTime(),
      monthDay: currentDay.getDate(),
      dateString: format(currentDay, "dd/MM/yyyy")
    });
  }
  return days;
}