import {VFC} from 'react';
import format from 'date-fns/format';
import addMonths from 'date-fns/addMonths';
import {DatePickerModalProps} from './types';
import styles from './DatePickerModal.module.scss';
import {joinClassNames} from '../../../utils/joinClassNames';
import MonthDay from '../../atoms/month_day/MonthDay';
import {IMonthDay} from '../../../hooks/useDatePicker';

/** Week days abbreviations */
export const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Displays calendar popup.
 */
const DatePickerModal: VFC<DatePickerModalProps> = ({
	open,
	id,
	monthDays,
	pickerDate,
	setPickerDate,
	onDateClick,
	startDate,
	endDate,
}) => {
	// Calculates number of weeks in month view. This will serve as rows in our calendar.
	const calendarRows = Array.from({length: monthDays.length / 7}, (_, i) => i);

	// Transform Date|number|null to number|null
	const startTimestamp = !startDate
		? null
		: 'number' === typeof startDate
		? startDate
		: startDate.getTime();
	const endTimestamp = !endDate
		? null
		: 'number' === typeof endDate
		? endDate
		: endDate.getTime();

	// Check if particular day is selected
	const isDaySelected = (day: IMonthDay) =>
		!endTimestamp
			? day.timeStamp === startTimestamp
			: day.timeStamp >= (startTimestamp || 0) && day.timeStamp <= endTimestamp;

	// Check if particular day is selected and only one selected
	const isOnlySelected = (day: IMonthDay) =>
		isDaySelected(day) &&
		(!endTimestamp ||
			(day.timeStamp === endTimestamp && day.timeStamp === startTimestamp));

	return (
		<div
			className={styles.modal}
			hidden={!open}
			aria-modal={open ? 'true' : 'false'}
			role="dialog"
			aria-label="Choose reservation dates"
			id={id}
		>
			<div>
				<div
					className={styles.modal_header}
				>
					<button
						title="Previous month"
						data-column={0}
						className={styles.month_arrow_btn}
						onClick={() => setPickerDate(addMonths(pickerDate, -1))}
					>
						<span
							aria-hidden="true"
							className={joinClassNames(
								styles.month_arrow,
								styles.month_arrow_left,
							)}
						></span>
					</button>
					<div className={styles.month}>
						{format(pickerDate, 'LLLL')} {pickerDate.getFullYear()}
					</div>
					<button
						title="Next month"
						data-column={6}
						className={styles.month_arrow_btn}
						onClick={() => setPickerDate(addMonths(pickerDate, 1))}
					>
						<span
							aria-hidden="true"
							className={joinClassNames(
								styles.month_arrow,
								styles.month_arrow_right,
							)}
						></span>
					</button>
				</div>
				<div role="grid" className={styles.calendar_container}>
					<div>
						<div role="row" className={styles.week_names}>
							{DAYS_OF_WEEK.map((day) => (
								<div
									key={day}
									role="columnheader"
									className={styles.week_day}
								>
									{day}
								</div>
							))}
						</div>
						{calendarRows.map((index) => (
							<div
								role="row"
								key={'row_' + index}
								className={styles.calendar_row}
							>
								{monthDays
									.filter((_, i) => i < (index + 1) * 7 && i >= index * 7)
									.map((day, i) => (
										<MonthDay
											onlySelected={isOnlySelected(day)}
											available={day.available}
											column={i}
											dateString={day.dateString}
											firstSelected={day.timeStamp === startTimestamp}
											lastSelected={day.timeStamp === endTimestamp}
											selected={isDaySelected(day)}
											monthDay={day.monthDay}
											timeStamp={day.timeStamp}
											today={day.today}
											onClick={() => onDateClick(day)}
											key={day.dateString}
										/>
									))}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DatePickerModal;
