import {Dispatch, SetStateAction} from "react";
import {CalendarDate, IMonthDay} from "../../organisms/ReservationCard/types";

export type DatePickerProps = {
  startDate: CalendarDate | null;
  endDate: CalendarDate | null;
  unavailableDates: (CalendarDate)[]
  setStartDate(start: CalendarDate | null): void
  setEndDate(end: CalendarDate | null): void
  id?: string;
  classes?: string[];
}

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