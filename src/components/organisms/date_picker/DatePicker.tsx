import {useCallback, VFC} from 'react';
import isSameDay from 'date-fns/isSameDay';
import format from 'date-fns/format';
import DatePickerModal from '../../molecules/date_picker_modal/DatePickerModal';
import styles from './DatePicker.module.css';
import {DatePickerProps} from './types';
import {text_medium_dark, teal_light_bg, teal} from '../../../styles/colors';
import {joinClassNames} from '../../../utils/joinClassNames';
import {useDatePicker, IMonthDay} from '../../../hooks/useDatePicker';

/**
 * Displays datepicker button. Renders calendar popup component. Handles all picker logic
 */
const DatePicker: VFC<DatePickerProps> = ({
	startDate,
	endDate,
	id,
	unavailableDates,
	setStartDate,
	setEndDate,
}) => {
	/* Dates formated to string */
	const startDateString = startDate
		? format(startDate, 'dd/MM/yyyy')
		: 'Check In';
	const endDateString = endDate ? format(endDate, 'dd/MM/yyyy') : 'Check Out';

	// Handles all the picker logic
	const {
		monthDays,
		pickerDate,
		pickerOpen,
		setPickerDate,
		setPickerOpen,
		pickerId,
		modalId,
	} = useDatePicker(
		setStartDate,
		setEndDate,
		startDate,
		endDate,
		unavailableDates,
		id,
	);

	/* Concatenated classes of dates buttons */
	const startDateClasses =
		pickerOpen && !startDate
			? joinClassNames(styles.date, teal, teal_light_bg)
			: styles.date;

	const endDateClasses =
		pickerOpen && startDate && !endDate
			? joinClassNames(styles.date, teal, teal_light_bg)
			: styles.date;

	/* Memoized date handler */
	const onDateClick = useCallback(
		(day: IMonthDay): void => {
			// Ignore unavailable dates clicks
			if (!day.available) return;

			// Neither start or end dates set
			if (!startDate) return setStartDate(day.timeStamp);

			// Set or cancel startDate when endDate not yet set
			if (startDate && !endDate) {
				return setEndDate(day.timeStamp);
			}

			// Reset or cancel ebdDate when endDate already set
			if (endDate) {
				const sameDay = isSameDay(endDate, day.timeStamp);
				return setEndDate(sameDay ? null : day.timeStamp);
			}
		},
		[startDate, endDate, setStartDate, setEndDate],
	);

	return (
		<div data-testid="date_picker" id={pickerId} className={styles.wrapper}>
			<button
				onMouseDown={(e) => e.preventDefault()}
				onClick={() => setPickerOpen((prev) => !prev)}
				className={joinClassNames(
					styles.picker,
					text_medium_dark,
					pickerOpen ? styles.modal_open : '',
				)}
				aria-controls={pickerId + '_dialog'}
				aria-haspopup="true"
				aria-label="Controls reservation datepicker"
				aria-describedby={pickerId + '_info'}
			>
				<span className={startDateClasses}>{startDateString}</span>
				<span className={joinClassNames(styles.arrow, text_medium_dark)}></span>
				<span className={endDateClasses}>{endDateString}</span>
			</button>
			<span className="visually-hidden" id={pickerId + '_info'}>
				This button opens popup dialog, where reservation dates can be chosen.
			</span>

			<DatePickerModal
				open={pickerOpen}
				monthDays={monthDays}
				unavailableDates={unavailableDates}
				id={modalId}
				onDateClick={onDateClick}
				setPickerDate={setPickerDate}
				pickerDate={pickerDate}
				startDate={startDate}
				endDate={endDate}
			/>
		</div>
	);
};

export default DatePicker;
