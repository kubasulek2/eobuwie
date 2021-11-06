import {VFC} from 'react';
import {MonthDayProps} from './types';
import styles from './MonthDay.module.css';
import {joinClassNames} from '../../../utils/joinClassNames';


/**
 * Single day of calendar picker.
 * 
 * Explanation of some of the props:
 * - available: can be selected
 * - selected: is selected, must be available
 * - firstSelected: is first of all selected, must be selected
 * - lastSelected: is last of all selected, must be selected
 * - onlySelected: is only one selected, must be selected
 * 
 */
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
	onlySelected,
	today
}) => {
	// Prevent user from misusing component
	if ((firstSelected || lastSelected || onlySelected) && !selected)
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
	const onlyClass = onlySelected ? styles.only : '';

	return (
		<div
			/* Prevent focus on click */
			onMouseDown={e => e.preventDefault()}
			data-testid="month_day"
			onClick={available ? () => onClick(timeStamp) : undefined}
			role="gridcell"
			data-column={column}
			aria-label={`You choose ${ dateString }`}
			tabIndex={0}
			aria-disabled={available ? "false" : "true"}
			data-date={dateString}
			className={joinClassNames(
				styles.container,
				availableClass,
				todayClass,
				selectedClass,
				firstClass,
				lastClass,
				onlyClass
			)}
		>
			<div className={styles.wrapper}>
				<div className={styles.day}>{monthDay}</div>
			</div>
		</div>
	);
};

export default MonthDay;
