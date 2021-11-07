import {screen, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import addDays from 'date-fns/addDays';
import {CalendarDate} from '../../../hooks/useDatePicker';
import ReservationCard from './ReservationCard';

beforeEach(() => {
	jest.clearAllMocks();
});

const onSubmit = jest.fn();
const setStartDate = jest.fn();
const setEndDate = jest.fn();
const price = 999;
const score = 4;
const votes = 888;

const renderer = (
	startDate: CalendarDate | null = null,
	endDate: CalendarDate | null = null,
	unavailableDates: CalendarDate[] = [],
) => {
	return render(
		<ReservationCard
			score={score}
			votes={votes}
			price={price}
			unavailableDates={unavailableDates}
			startDate={startDate}
			endDate={endDate}
			setEndDate={setEndDate}
			setStartDate={setStartDate}
			onSubmit={onSubmit}
		/>,
	);
};

describe('Rendering', () => {
	it('Matches the snapshot', () => {
		expect(renderer()).toMatchSnapshot();
	});

	it('Renders', () => {
		renderer();
		expect(screen.getByTestId('reservation_card')).toBeInTheDocument();
	});

	it('Renders price', () => {
		renderer();
		screen.getByText(price, {exact: false});
	});

	it('Renders votes', () => {
		renderer();
		screen.getByText(votes);
	});

	it('Renders score', () => {
		renderer();
		const stars = screen.getAllByTestId('star');
		expect(stars.length).toBe(5);
		// one should be empty
		expect(
			stars[stars.length - 1].firstElementChild!.classList.contains(
				'star_empty',
			),
		).toBe(true);
	});

	it('Renders form', () => {
		renderer();
		screen.getByRole('form');
	});

	it('Renders 2 inputs', () => {
		renderer();
		const stars = screen.getAllByRole('textbox');
		expect(stars.length).toBe(2);
	});

	it('Renders 2 buttons', () => {
		renderer();
		const buttons = screen.getAllByRole('button');
		expect(buttons.length).toBe(2);
	});
});

describe('Accessibility', () => {
	it('It uses form element', () => {
		renderer();
		screen.getByRole('form');
	});

	it('Inputs have accessible labels', () => {
		renderer();
		expect(screen.getAllByLabelText('dummy', {exact: false})).toHaveLength(2);
	});

	it('Has accessible error information', async () => {
		renderer();
		const errorMsg = screen.getByRole('alert');

		expect(errorMsg.getAttribute('aria-atomic')).toBe('true');
	});
});

describe('Functionality', () => {
	it('Calls onSubmit when dates are set properly', () => {
		renderer(new Date(), new Date());
		userEvent.click(screen.getByText('submit', {exact: false}));
		expect(onSubmit).toBeCalled();
	});

	it('Does not call onSubmit when startDate not set', () => {
		renderer(null, new Date());
		userEvent.click(screen.getByText('submit', {exact: false}));
		expect(onSubmit).not.toBeCalled();
	});

	it('Does not call onSubmit when endDate not set', () => {
		renderer(new Date(), null);
		userEvent.click(screen.getByText('submit', {exact: false}));
		expect(onSubmit).not.toBeCalled();
	});

	it('Does not call onSubmit when startDate in the past', () => {
		renderer(addDays(new Date(), -2), new Date());
		userEvent.click(screen.getByText('submit', {exact: false}));
		expect(onSubmit).not.toBeCalled();
	});

	it('Does not call onSubmit when endDate in the past', () => {
		renderer(addDays(new Date(), -2), addDays(new Date(), -2));
		userEvent.click(screen.getByText('submit', {exact: false}));
		expect(onSubmit).not.toBeCalled();
	});

	it('Does not call onSubmit when endDate before startDate', () => {
		renderer(addDays(new Date(), 2), addDays(new Date(), 1));
		userEvent.click(screen.getByText('submit', {exact: false}));
		expect(onSubmit).not.toBeCalled();
	});

	it('Does not call onSubmit when unavailable date between start and end dates', () => {
		renderer(new Date(), addDays(new Date(), 3), [addDays(new Date(), 1)]);
		userEvent.click(screen.getByText('submit', {exact: false}));
		expect(onSubmit).not.toBeCalled();
	});

	it('Displays error when submit not validated', () => {
		renderer();
		const errMsg = screen.getByRole('alert');
		expect(errMsg).toBeEmptyDOMElement();
		userEvent.click(screen.getByText('submit', {exact: false}));
		expect(errMsg.textContent).toMatch(/Both dates must be set/);
	});
	
	it('Clears error when any date is clicked', async () => {
		renderer();
		userEvent.click(screen.getByText('submit', {exact: false}));
		expect(screen.getByRole('alert').textContent).toMatch(
			/Both dates must be set/,
		);
		userEvent.click(screen.getByText("Check in", {exact: false}));
		const dates = screen.getAllByRole('gridcell');
		/* Must by future date */
		userEvent.click(dates[dates.length -1]);
		expect(screen.getByRole('alert')).toBeEmptyDOMElement();
	});
});
