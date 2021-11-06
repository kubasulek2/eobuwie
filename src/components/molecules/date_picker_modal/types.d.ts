import {Dispatch, SetStateAction} from 'react';
import {CalendarDate, IMonthDay} from '../../../hooks/useDatePicker';

export type DatePickerModalProps = {
	open: boolean;
	id: string;
	monthDays: IMonthDay[];
	unavailableDates: CalendarDate[];
	pickerDate: Date;
	setPickerDate: Dispatch<SetStateAction<Date>>;
	onDateClick(day: IMonthDay): void;
	startDate: CalendarDate | null;
	endDate: CalendarDate | null;
};
