import isToday from 'date-fns/isToday';
import getDay from 'date-fns/getDay';
import isBefore from 'date-fns/isBefore';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import addDays from 'date-fns/addDays';
import isSameDay from 'date-fns/isSameDay';
import format from 'date-fns/format';
import {CalendarDate, IMonthDay} from '../hooks/useDatePicker';

/**
 * Function takes two dates as Date objects or timestamps and returns array of formatted MonthDay objects.
 */
export function computeCalendarDays(
	startDate: CalendarDate,
	endDate: CalendarDate,
	unavailableDates: CalendarDate[],
	calendarDate: CalendarDate = new Date(),
	selectedDate?: CalendarDate,
): IMonthDay[] {
	// Add some validity checking
	if (isBefore(endDate, startDate))
		throw new TypeError('End date must not be before start date');

	// calculate number of days between two dates
	const daysDiff = differenceInCalendarDays(endDate, startDate);
	const today = new Date();

	// sort it ascending, in case not sorted
	unavailableDates = unavailableDates.sort((a: any, b: any) => a - b);

	// find first unavailable
	const unavailableFrom = selectedDate ? unavailableDates.find(d => d > selectedDate) : undefined;

	// initialize structure to be returned
	const days: IMonthDay[] = [];

	for (let i = 0; i <= daysDiff; i++) {
		// this is
		const currentDay = addDays(startDate, i);
		// exclude past dates from available dates
		const notPast = differenceInCalendarDays(currentDay, today) >= 0;
		let available =
			notPast && !unavailableDates.some((d) => isSameDay(d, currentDay));

		// extra check, if available before first unavailable
		if (unavailableFrom && available)
			available = differenceInCalendarDays(currentDay, unavailableFrom) < 0;

		// extra check, if available date do not before selectedDate
		if (selectedDate && available)
			available = differenceInCalendarDays(currentDay, selectedDate) >= 0;
		
		// set all monthDay properties
		days.push({
			available: available,
			weekDay: getDay(currentDay),
			today: isToday(currentDay),
			timeStamp: currentDay.getTime(),
			monthDay: currentDay.getDate(),
			dateString: format(currentDay, 'dd/MM/yyyy'),
		});
	}

	return days;
}
