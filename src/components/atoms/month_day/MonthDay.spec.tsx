import {screen, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MonthDay from './MonthDay';
import styles from './MonthDay.module.css';

const onClick = jest.fn();
const dateString = '12/10/2020';

afterEach(() => {
	jest.clearAllMocks();
});
const renderer = (
	available = true,
	first = false,
	last = false,
	selected = false,
	today = false
) =>
	render(
		<MonthDay
			onClick={onClick}
			available={available}
			column={1}
			today={today}
			dateString={dateString}
			firstSelected={first}
			lastSelected={last}
			monthDay={12}
			selected={selected}
			timeStamp={112030404}
		/>
	);

describe('Rendering', () => {
	it.todo(
		'Matches screenshot' //() => {
		//   expect(renderer()).toMatchSnapshot();
		// }
	);

	it('Renders', () => {
		renderer();
		expect(screen.getByTestId('month_day')).toBeInTheDocument();
	});

	it('Renders month day', () => {
		renderer();
		screen.getByText('12');
	});
});

describe('Accessibility', () => {
	it('Has gridcell role', () => {
		renderer();
		screen.getByRole('gridcell');
	});

	it('Is aria-disabled when not available', () => {
		renderer(false);
		expect(screen.getByRole('gridcell')).toHaveAttribute(
			'aria-disabled',
			'true'
		);
	});

	it('Is aria-enabled when available', () => {
		renderer();
		expect(screen.getByRole('gridcell')).toHaveAttribute(
			'aria-disabled',
			'false'
		);
	});

	it('Is has accessible label', () => {
		renderer();
		expect(screen.getByLabelText(dateString, {exact: false})).toHaveAttribute(
			'aria-disabled',
			'false'
		);
	});
});

describe('Functionality', () => {
	it('Calls onClick handler when available', () => {
		renderer();
		userEvent.click(screen.getByRole('gridcell'));
		expect(onClick).toBeCalledTimes(1);
	});

	it('Does not call onClick handler when not available', () => {
		renderer(false);
		userEvent.click(screen.getByRole('gridcell'));
		expect(onClick).not.toBeCalled();
	});

	it('Throws when firstSelected but not selected', () => {
		expect(() => renderer(true, true, false, false)).toThrow();
	});

	it('Throws when selected but not available', () => {
		expect(() => renderer(false, true, false, true)).toThrow();
	});

	it('Has proper class when today', () => {
		renderer(true, false, false, false, true);
		const container = screen.getByRole('gridcell').parentElement!;
		expect(container.querySelector('.' + styles.today)).toBeInTheDocument();
	});
	
  it('Has proper class when available', () => {
		renderer();
		const container = screen.getByRole('gridcell').parentElement!;
		expect(container.querySelector('.' + styles.available)).toBeInTheDocument();
	});
  
  it('Has no available class when not available', () => {
		renderer(false);
		const container = screen.getByRole('gridcell').parentElement!;
		expect(container.querySelector('.' + styles.available)).toBeNull();
	});

  it('Has proper class when selected', () => {
		renderer(true, false, false, true);
		const container = screen.getByRole('gridcell').parentElement!;
		expect(container.querySelector('.' + styles.selected)).toBeInTheDocument();
	});
  
  it('Has proper class when firstSelected', () => {
    renderer(true, true, false, true);
		const container = screen.getByRole('gridcell').parentElement!;
		expect(container.querySelector('.' + styles.available)).toBeInTheDocument();
	});
  
  it('Has proper class when lastSelected', () => {
    renderer(true, false, true, true);
		const container = screen.getByRole('gridcell').parentElement!;
		expect(container.querySelector('.' + styles.available)).toBeInTheDocument();
	});
});
