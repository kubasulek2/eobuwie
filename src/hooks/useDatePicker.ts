import {useEffect, useMemo, useState} from 'react';
import {computeCalendarDays} from '../utils/computeCalendarDays';
import {getCalendarMonthBoundries} from '../utils/getCalendarMonthBoundries';
import {usePickerKeyboardControl} from './usePickerKeyboardControl';
import {usePrevious} from './usePrevious';

export type CalendarDate = Date | number;
export type IMonthDay = {
	timeStamp: number;
	available: boolean;
	today: boolean;
	weekDay: 0 | 1 | 2 | 3 | 4 | 5 | 6;
	monthDay: number;
	dateString: string;
};

type SetDate = (d: CalendarDate | null) => void;

/**
 * Handles all the logic associated with date picker.
 */
export function useDatePicker(
	setStartDate: SetDate,
	setEndDate: SetDate,
	startDate: CalendarDate | null,
	endDate: CalendarDate | null,
	unavailableDates: CalendarDate[],
	id?: string,
) {
	/* Handles picker state */
	const [pickerOpen, setPickerOpen] = useState<boolean>(false);
	/* Date for calendar manipulation */
	const [pickerDate, setPickerDate] = useState<Date>(new Date());

	/* Stores all relevant days informations */
	const [monthDays, setMonthDays] = useState<IMonthDay[]>([]);

	// Use previous Date because availableDates array may be not memoized, causing constant component rerenders.
	// Using prevDate will prevent hook belowe from recalculating monthDays all the time
	const prevDate = usePrevious<Date>(pickerDate);

	/* Remember previous startDate and pickerOpen to optimize state recalculation in useEffect */
	const prevStartDate = usePrevious(startDate);
	const prevOpen = usePrevious(pickerOpen);

	const pickerId = id || 'reservation_date_picker';

	// use memoization for modalId, to prevent useEffect extensive calls;
	const modalId = useMemo(
		() => (id ? id + '_modal' : 'reservation_date_picker_modal'),
		[id],
	);

	// Handles focus, and keyboard control
	usePickerKeyboardControl(pickerOpen, setPickerOpen, pickerId, modalId);

	// Clear dates each time picker is open. Otherwise start date can never be changed
	// Also when date setting is not complete, clear on close
	useEffect(() => {
		if ((pickerOpen && !prevOpen) || (!pickerOpen && !endDate)) {
			setStartDate(null);
			setEndDate(null);
		}
	}, [pickerOpen, setStartDate, setEndDate, endDate, prevOpen]);
	// Compute month days on each calendar date change
	// This hooks computes days only when startDate not set
	useEffect(() => {
		// Prevent uneccessary recomputations
		if (!pickerOpen) return;
		// either no date yet or monthDays already computer and date hasn't changed
		if (!pickerDate || (monthDays.length && pickerDate === prevDate)) return;

		// calculate first and last day to display
		const [start, end] = getCalendarMonthBoundries(pickerDate);

		// calculate and set MonthDay object's array
		setMonthDays(computeCalendarDays(start, end, unavailableDates, pickerDate));
	}, [
		pickerDate,
		prevDate,
		pickerOpen,
		unavailableDates,
		setMonthDays,
		monthDays,
		startDate,
	]);

	// Recalculate month days when either startDate, or both startDate and endDate are set.
	// User shouldn't be able to have unavailable date between start and end dates
	// This hooks computes days only when at least startDate is set
	useEffect(() => {
		// Prevent unecessary recomputation
		if (!pickerOpen || !pickerDate || !monthDays.length) return;
		if (!startDate) return;
		if (startDate === prevStartDate) return;

		// calculate first and last day to display
		const [start, end] = getCalendarMonthBoundries(pickerDate);
		let lastAvailableTimestamp: number | undefined;

		if (startDate) {
			// Find last available date after startDate, and render all dates after unavailable
			const startTimeStamp =
				'number' === typeof startDate ? startDate : startDate.getTime();
			const firstUnavailableIndex = monthDays.findIndex(
				(day) => !day.available && day.timeStamp > startTimeStamp,
			);
			// number of undefined if day not found
			lastAvailableTimestamp = (monthDays[firstUnavailableIndex - 1] || {})
				.timeStamp;
		}

		const calDays = computeCalendarDays(
			start,
			end,
			unavailableDates,
			pickerDate,
			lastAvailableTimestamp,
		);

		// calculate and set MonthDay object's array
		setMonthDays(calDays);
	}, [
		pickerDate,
		pickerOpen,
		unavailableDates,
		setMonthDays,
		monthDays,
		startDate,
		prevStartDate,
	]);

	return {
		pickerOpen,
		setPickerOpen,
		pickerDate,
		setPickerDate,
		monthDays,
		pickerId,
		modalId,
	};
}
