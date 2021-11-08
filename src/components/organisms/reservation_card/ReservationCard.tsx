import {VFC, FormEvent, useState, useCallback} from 'react';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import {CalendarDate} from '../../../hooks/useDatePicker';
import {joinClassNames} from '../../../utils/joinClassNames';
import Button from '../../atoms/button/Button';
import Divider from '../../atoms/divider/Divider';
import Input from '../../atoms/input/Input';
import Label from '../../atoms/label/Label';
import ReservationHeader from '../../molecules/reservation_header/ReservationHeader';
import DatePicker from '../date_picker/DatePicker';
import styles from './ReservationCard.module.scss';
import {ReservationCardProps} from './types';

/**
 * Reservation Card component. Displays reservation info, and dates picking form. Handles validation of the form.
 */
const ReservationCard: VFC<ReservationCardProps> = ({
	price,
	score,
	votes,
	onSubmit,
	startDate,
	endDate,
	unavailableDates,
	setEndDate,
	setStartDate,
}) => {
	/* Displays form errors, indicates validity of the form */
	const [formError, setFormError] = useState('');

	const validateForm = (): boolean => {
		//  check if dates are set
		if (!startDate || !endDate) {
			setFormError('Both dates must be set');
			return false;
		}
		
    //  check if any date in the past
		if (
			differenceInCalendarDays(startDate, new Date()) < 0 ||
			differenceInCalendarDays(endDate, new Date()) < 0
		) {
			setFormError('Cannot reserve past dates');
			return false;
		}

		// just in case check if startDate equal or lesser than endDate
		if (startDate > endDate) {
			setFormError('End date may not be before start date.');
			return false;
		}

		// just in case check if no unvalid dates chosen
		if (unavailableDates.some((date) => date >= startDate && date <= endDate)) {
			setFormError('Unavailable date(s) are checked');
			return false;
		}

		return true;
	};

	/* Call prevent default, as page should not be reloaded */
	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		if (validateForm()) onSubmit();
	};

	/* Set startDate, clear formError. UseCallback to prevent rerendering */
	const handleStartDate = useCallback(
		(date: CalendarDate | null) => {
			setStartDate(date);
			if (date) setFormError('');
		},
		[setStartDate, setFormError],
	);

	/* Set endDate, clear formError. UseCallback to prevent rerendering */
	const handleEndDate = useCallback(
		(date: CalendarDate | null) => {
			setEndDate(date);
			if (date) setFormError('');
		},
		[setEndDate, setFormError],
	);

	return (
		<div className={styles.card} data-testid="reservation_card">
			<div className={styles.formControl}>
			<ReservationHeader price={price} score={score} votes={votes} />
			<Divider />
			</div>
			<form onSubmit={handleSubmit} name="reservation_form">
				<div className={styles.formControl}>
					<Label idFor="dummy1" title="Dates" size="small" />
					<DatePicker
						unavailableDates={unavailableDates}
						startDate={startDate}
						endDate={endDate}
						setStartDate={handleStartDate}
						setEndDate={handleEndDate}
					/>
				</div>

				<div className={styles.formControl}>
					<Label idFor="dummy1" title="Dummy 1" size="small" />
					<Input
						id="dummy1"
						placeholder="Dummy content"
            onChange={() => setFormError("")}
            name="dummy1"
					/>
				</div>

				<div className={styles.formControl}>
					<Label idFor="dummy2" title="Dummy 2" size="small" />
					<Input
						id="dummy2"
						placeholder="Dummy content 2"
            onChange={() => setFormError("")}
            name="dummy2"
					/>
				</div>

				<div className={styles.formControl}>
					<p
						role="alert"
						aria-atomic="true"
						className={joinClassNames(
							styles.errMsg,
							formError ? styles.error : '',
						)}
					>
						{formError}
					</p>
					<Button type="submit" size="medium" disabled={Boolean(formError)}>
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
};

export default ReservationCard;
