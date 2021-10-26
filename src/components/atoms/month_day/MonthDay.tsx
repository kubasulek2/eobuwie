import {VFC} from 'react';
import {MonthDayProps} from './types';
import styles from './MonthDay.module.css';
import {joinClassNames} from '../../../utils/joinClassNames';

const MonthDay: VFC<MonthDayProps> = ({
	dateString,
	timeStamp,
	monthDay,
	column,
	available,
	onClick,
	firstSelected,
	lastSelected,
	selected,
	today
}) => {
	// Prevent user from misusing component
	if ((firstSelected || lastSelected) && !selected)
		throw new Error(
			'MonthDay cannot be firstSelected or lastSelected without being selected'
		);

	if (!available && selected)
		throw new Error('MonthDay cannot be selected without being available');

	const availableClass = available ? styles.available : '';
	const todayClass = today ? styles.today : '';
	const selectedClass = selected ? styles.selected : '';
	const firstClass = firstSelected ? styles.first : '';
	const lastClass = lastSelected ? styles.last : '';

	return (
		<div
			data-testid="month_day"
			onClick={available ? () => onClick(timeStamp) : undefined}
			role="gridcell"
			data-column={column}
			aria-label={`You choose ${ dateString }`}
			tabIndex={0}
			aria-disabled={!available}
			data-date={dateString}
			className={joinClassNames(
				styles.container,
				availableClass,
				todayClass,
				selectedClass,
				firstClass,
				lastClass
			)}
		>
			<div className={styles.wrapper}>
				<div className={styles.day}>{monthDay}</div>
			</div>
		</div>
	);
};

export default MonthDay;
