import {screen, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import format from 'date-fns/format';
import {CalendarDate} from '../../../hooks/useDatePicker';
import {computeCalendarDays} from '../../../utils/computeCalendarDays';
import {getCalendarMonthBoundries} from '../../../utils/getCalendarMonthBoundries';
import DatePickerModal, {DAYS_OF_WEEK} from './DatePickerModal';

beforeEach(() => {
	jest.clearAllMocks();
});

const setPickerDate = jest.fn();
const onDateClick = jest.fn();
const id = 'picker';
/************************* DEFAULT DATE - 07.09.2021 *********************************/
const defaultDate = new Date(2021, 9, 7);

const renderer = (
	open = true,
	// 07.09.2021
	date = defaultDate,
	unavailableDates: CalendarDate[] = [],
) => {
	// calculate first and last day to display
	const [start, end] = getCalendarMonthBoundries(date);
	// calculate and set MonthDay object's array
	const monthDays = computeCalendarDays(start, end, unavailableDates, date);

	return {
		...render(
			<DatePickerModal
				setPickerDate={setPickerDate}
				onDateClick={onDateClick}
				open={open}
				endDate={null}
				startDate={null}
				monthDays={monthDays}
				pickerDate={date}
				id={id}
				unavailableDates={unavailableDates}
			/>,
		),
		monthDays,
	};
};

describe('Rendering', () => {
	it('Matches the snapshot', () => {
		expect(renderer()).toMatchSnapshot();
	});

	it('Renders', () => {
		renderer();
		expect(screen.getByRole('dialog')).toBeInTheDocument();
	});

	it('Is hidden when not open', () => {
		renderer(false);
		expect(screen.getByRole('dialog', {hidden: true})).not.toBeVisible();
	});

	it('It displays days of the week', () => {
		renderer();
		DAYS_OF_WEEK.forEach((name) => screen.getByText(name));
	});

	it('It displays days of the month', () => {
		renderer();
		/* Month set as default has 30 days */
		/* allByText because some days will repeat itself, ie. 1 of Oct and 1 Nov */
		Array.from(Array(30), (_, i) => i + 1).forEach((day) =>
			screen.getAllByText(day),
		);
	});

	it('It displays two buttons', () => {
		renderer();
		expect(screen.getAllByRole('button')).toHaveLength(2);
	});

	it('It displays a year', () => {
		renderer();
		screen.getByText('2021', {exact: false});
	});

	it('It displays a month', () => {
		renderer();
		screen.getByText('October', {exact: false});
	});
});

describe('Accessibility', () => {
	it('Has dialog role', () => {
		renderer();
		screen.getByRole("dialog");
	});
	
	it('Has proper label', () => {
		renderer();
		screen.getByLabelText('Choose reservation dates');
		
	});
	
	it('Has aria-modal role', () => {
		renderer();
		const modal = screen.getByRole("dialog");
		expect(modal.getAttribute("aria-modal")).toBe("true");
	});
	
	it('closed modal has aria-modal="false" attribute', () => {
		renderer(false);
		const modal = screen.getByRole("dialog", {hidden: true});
		expect(modal.getAttribute("aria-modal")).toBe("false");
	});
	
	it('Icon buttons have accessible title', () => {
		renderer();
		expect(screen.getAllByTitle(/^Previous month$|^Next month$/i)).toHaveLength(2);
	});
	
	it('Icons in icon buttons are hidden from assistive technologies', () => {
		renderer();
		const [btn1, btn2] = screen.getAllByTitle(/^Previous month$|^Next month$/i);
		expect(btn1.querySelector('span[aria-hidden="true"]')).toBeInTheDocument();
		expect(btn2.querySelector('span[aria-hidden="true"]')).toBeInTheDocument();
	});
	
	it('Calendar has grid role', () => {
		renderer();
		screen.getByRole("grid");
	});
	
	it('Calendar grid has 7 columns header', () => {
		renderer();
		const headers = screen.getAllByRole('columnheader');
		expect(headers).toHaveLength(7);
		expect(headers[0]).toHaveTextContent(DAYS_OF_WEEK[0]);
	});
	
	it('Each day has grid cell role', () => {
		const {monthDays} = renderer();
		expect(screen.getAllByRole("gridcell")).toHaveLength(monthDays.length);
	});
	
	it('Each week is groupped in a row and one extra row for week day names', () => {
		const {monthDays} = renderer();
		expect(screen.getAllByRole("row")).toHaveLength(Math.floor(monthDays.length / 7) + 1);
	});

});

describe('Functionality', () => {
	it('Clicks the date when available', () => {
		// only always available date is current date, any future date may turn out out of month boundries, any past date is unavailable by default
		const d = new Date();
		renderer(true, d);

		userEvent.click(
			screen.getByLabelText(`choose ${format(d, 'dd/MM/yyyy')}`, {
				exact: false,
			}),
		);
		expect(onDateClick).toBeCalledTimes(1);
	});

	it('Does not click the date when available', () => {
		const d = new Date();
		// only always available date is current date, but wi specify it as unavailable
		renderer(true, d, [d]);

		userEvent.click(
			screen.getByLabelText(`choose ${format(d, 'dd/MM/yyyy')}`, {
				exact: false,
			}),
		);
		expect(onDateClick).not.toBeCalled();
	});

	it('Each past date is unavailable', () => {
		// default date is in the past
		renderer();

		userEvent.click(
			screen.getByText('15'),
		);
		expect(onDateClick).not.toBeCalled();
	});
	
	it('Clicks change month buttons', () => {
		// default date is in the past
		renderer();
		const buttons = screen.getAllByRole("button");
		userEvent.click(buttons[0]);
		userEvent.click(buttons[1]);
		expect(setPickerDate).toBeCalledTimes(2);
	});
});
