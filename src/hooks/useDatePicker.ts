import {useEffect, useMemo, useState} from 'react';
import startOfDay from 'date-fns/startOfDay';
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
	const [pickerDate, setPickerDate] = useState<Date>(startOfDay(new Date()));

	/* Stores all relevant days informations */
	const [monthDays, setMonthDays] = useState<IMonthDay[]>([]);


	/* Remember previous startDate to optimize state recalculation in useEffect */
	const prevStartDate = usePrevious(startDate);

	const pickerId = id || 'reservation_date_picker';

	// use memoization for modalId, to prevent useEffect extensive calls;
	const modalId = useMemo(
		() => (id ? id + '_modal' : 'reservation_date_picker_modal'),
		[id],
	);

	// Handles focus, and keyboard control
	usePickerKeyboardControl(pickerOpen, setPickerOpen, pickerId, modalId);

	// Clear dates each time picker is open. Otherwise start date can never be changed
	useEffect(() => {
		if (pickerOpen) {
			setStartDate(null);
			setEndDate(null);
			setPickerDate(startOfDay(new Date()));
		}
	}, [pickerOpen, setStartDate, setEndDate]);

	
	// When picker date changes, days must be recalculated
	useEffect(() => {
		if (!pickerDate) return;
		// calculate first and last day to display
		const [start, end] = getCalendarMonthBoundries(pickerDate);

		// calculate and set MonthDay object's array
		setMonthDays(
			computeCalendarDays(
				start,
				end,
				unavailableDates,
				pickerDate,
				startDate ? startDate : undefined,
			),
		);
	}, [pickerDate, unavailableDates, startDate]);

	// Recalculate month days when each time start date changed.
	// User shouldn't be able to pick dates either before startDate, or after first unavailable after startDate
	useEffect(() => {
		if (!startDate) return;
		if (startDate === prevStartDate) return;
		
		// calculate first and last day to display
		const [start, end] = getCalendarMonthBoundries(pickerDate);

		const calDays = computeCalendarDays(
			start,
			end,
			unavailableDates,
			pickerDate,
			startDate,
		);

		// calculate and set MonthDay object's array
		setMonthDays(calDays);
	}, [pickerDate, unavailableDates, startDate, prevStartDate]);

	// When date setting is not complete, clear on close picker
	useEffect(() => {
		if (pickerOpen) return;
		if (startDate && endDate) return;
		setStartDate(null);
		setEndDate(null);
	}, [pickerOpen, startDate, endDate, setEndDate, setStartDate]);


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
