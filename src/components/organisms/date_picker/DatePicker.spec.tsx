import {render, screen, act} from '@testing-library/react';
import startOfMonth from 'date-fns/startOfMonth';
import addDays from 'date-fns/addDays';
import DatePicker from './DatePicker';
import format from 'date-fns/format';
import userEvent from '@testing-library/user-event';
import {DatePickerProps} from './types';

const setStartDate = jest.fn();
const setEndDate = jest.fn();
const defaultProps: DatePickerProps = {
	startDate: null,
	setEndDate,
	setStartDate,
	endDate: null,
	unavailableDates: [],
};
beforeEach(() => {
	jest.clearAllMocks();
});

describe('snapshot', () => {
	it('Matches the snapshot', () => {
		expect(render(<DatePicker {...defaultProps} />)).toMatchSnapshot();
	});
});

describe('Rendering and accessibility', () => {
	it('Renders', () => {
		render(<DatePicker {...defaultProps} />);
		expect(screen.getByTestId('date_picker')).toBeInTheDocument();
	});

	/* Button */

	it('Renders button with accessible role', () => {
		render(<DatePicker {...defaultProps} />);
		screen.getByRole('button');
	});

	it('Button displays check in/check out info, when dates not set', () => {
		render(<DatePicker {...defaultProps} />);
		screen.getByText('check in', {exact: false});
		screen.getByText('check out', {exact: false});
	});

	it('Button displays in and out dates, when dates are set', () => {
		// start date yesterday, end date todat
		const yesterdayDate = Date.now() - 1000 * 60 * 60 * 24;
		const todayDate = Date.now();

		render(
			<DatePicker
				{...defaultProps}
				startDate={yesterdayDate}
				endDate={todayDate}
			/>,
		);

		screen.getByText(format(yesterdayDate, 'dd/MM/yyyy'), {exact: false});
		screen.getByText(format(todayDate, 'dd/MM/yyyy'), {exact: false});
	});

	it('Button has accessible label', () => {
		render(<DatePicker {...defaultProps} />);
		// aria-label
		screen.getByLabelText('datepicker', {exact: false});
	});

	it('Button has accessible description', () => {
		render(<DatePicker {...defaultProps} />);
		// aria-describedby
		const descId = screen.getByRole('button').getAttribute('aria-describedBy');
		const container = screen.getByTestId('date_picker');
		const description = container.querySelector('#' + descId)!.textContent;
		expect(description).toMatch('opens popup dialog');
	});

	it('Button has proper aria attributes', () => {
		render(<DatePicker {...defaultProps} />);
		const btn = screen.getByRole('button');

		expect(btn).toHaveAttribute('aria-controls');
		expect(btn).toHaveAttribute('aria-haspopup', 'true');
	});

	/* Picker */

	it('Picker is hidden by default', () => {
		render(<DatePicker {...defaultProps} />);
		expect(() => screen.getByRole('dialog')).toThrow();
	});

	it('Open Picker has accessible role', async () => {
		render(<DatePicker {...defaultProps} />);
		userEvent.click(screen.getByRole('button'));

		await screen.findByRole('dialog');
	});

	it('Picker has accessible label', () => {
		render(<DatePicker {...defaultProps} />);
		screen.getByLabelText('reservation dates', {exact: false});
	});

	it('Picker has accessible, but not visible description', () => {
		render(<DatePicker {...defaultProps} />);
		const desc = screen.getByText(
			'This button opens popup dialog, where reservation dates can be chosen',
			{exact: false},
		);
		expect(desc.className).toMatch(/visually-hidden/);
	});
});

describe('Functionality', () => {
	it('Changes month forward ', async () => {
		render(<DatePicker {...defaultProps} />);
		userEvent.click(screen.getByRole('button'));
		const days = await screen.findAllByRole('gridcell');
		// use act for ale use effects to take place
		act(() => {
			userEvent.click(screen.getByTitle('Next month'));
		});

		const nextMonthDays = await screen.findAllByRole('gridcell');
		expect(days[0].textContent).not.toBe(nextMonthDays[0].textContent);
	});

	it('Changes month backward ', async () => {
		render(<DatePicker {...defaultProps} />);
		userEvent.click(screen.getByRole('button'));
		const days = await screen.findAllByRole('gridcell');
		// use act for ale use effects to take place
		act(() => {
			userEvent.click(screen.getByTitle('Previous month'));
		});

		const prevMonthDays = await screen.findAllByRole('gridcell');
		expect(days[0].textContent).not.toBe(prevMonthDays[0].textContent);
	});

	it('It Picks the dates', async () => {
		render(<DatePicker {...defaultProps} />);
		let pickerBtn = screen.getByLabelText('Controls reservation datepicker');
		// open picker
		userEvent.click(pickerBtn);
		// use act for ale use effects to take place
		act(() => {
			// change to next month to be sure not to target past dates
			userEvent.click(screen.getByTitle('Next month'));
		});

		const days = await screen.findAllByRole('gridcell');

		act(() => userEvent.click(days[days.length - 6]));
		expect(setStartDate).toBeCalled();
		act(() => userEvent.click(days[days.length - 3]));
		expect(setEndDate).toBeCalled();
	});

	it("Recalculates available dates after setting startDate, so one can't select enndDate behind first unavailable", async () => {
		const date = startOfMonth(addDays(new Date(), 30)); // start of next month
		render(
			<DatePicker {...defaultProps} unavailableDates={[addDays(date, 3)]} />, // first unavailable 4th of next month
		);

		let pickerBtn = screen.getByLabelText('Controls reservation datepicker');
		// open picker
		userEvent.click(pickerBtn);
		// change to next month
		act(() => userEvent.click(screen.getByTitle('Next month')));
		const days = await screen.findAllByRole('gridcell');
		const firstDayIndex = days.findIndex((el) => el.textContent === '1');

		// use act to wait for first click effect
		act(() => userEvent.click(days[firstDayIndex]));
		jest.clearAllMocks();
		// wait for effects of next clicks
		act(() => userEvent.click(days[firstDayIndex + 3]));
		act(() => userEvent.click(days[firstDayIndex + 4]));
		// those days should be unavailable now
		expect(setEndDate).not.toBeCalled();
	});
});
