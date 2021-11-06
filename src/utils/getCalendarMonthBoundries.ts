import startOfWeek from 'date-fns/startOfWeek';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import endOfMonth from 'date-fns/endOfMonth';
import isSameDay from 'date-fns/isSameDay';
import startOfMonth from 'date-fns/startOfMonth';
import differenceInDays from 'date-fns/differenceInDays';
import addDays from 'date-fns/addDays';
import {CalendarDate} from "../hooks/useDatePicker";


/**
 * returns first Sunday and last Saturday to display in month view (which usually contains 35 days, but sometimes 28 or 42)
 */
export function getCalendarMonthBoundries (date: CalendarDate): [CalendarDate, CalendarDate] {
  // First day of month
  const firstDay = startOfMonth(date);

  // Last day of month
  const lastDay = endOfMonth(date);

  // Sunday of first week of the month, our start day
  const firstDayOfWeek = startOfWeek(firstDay);

  // Difference in days between start day of the month and start day of view
  const daysToFirst = differenceInDays(firstDay, firstDayOfWeek);

  // How many days given month has
  const monthLength = getDaysInMonth(date);

  // Some months need only 28 days to display in view 
  const shortView = monthLength === 28 && isSameDay(firstDay, firstDayOfWeek);

  // Some months need 42 days to display in view 
  const longView = monthLength + daysToFirst > 35;

  const viewDays = longView ? 42 : 35;

  // How many days need to be added to last day of the month for the view to have last day on Saturday
  const daysToAdd = viewDays - (daysToFirst + monthLength);


  // Non-leap year February starting on Sunday
  if (shortView) return [firstDay, lastDay];


  // Return Sunday as first day, and Saturday as last
  return [firstDayOfWeek, addDays(lastDay, daysToAdd)];
}