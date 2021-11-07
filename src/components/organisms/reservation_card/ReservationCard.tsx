import {VFC, FormEvent, useState, useCallback} from 'react';
import {CalendarDate} from '../../../hooks/useDatePicker';
import {joinClassNames} from '../../../utils/joinClassNames';
import Button from '../../atoms/button/Button';
import Divider from '../../atoms/divider/Divider';
import Input from '../../atoms/input/Input';
import Label from '../../atoms/label/Label';
import ReservationHeader from '../../molecules/reservation_header/ReservationHeader';
import DatePicker from '../date_picker/DatePicker';
import styles from './ReservationCard.module.css';
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

		// just in case check if startDate equal or lesser than endDate
		if (startDate > endDate) {
			setFormError('Calendar');
			return false;
		}

		// just in case check if no unvalid dates chosen
		if (unavailableDates.some((date) => date >= startDate && date <= endDate)) {
			setFormError('Calendar');
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
		<div className={styles.card}>
			<ReservationHeader price={price} score={score} votes={votes} />
			<Divider />
			<form onSubmit={handleSubmit}>
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
					/>
				</div>

				<div className={styles.formControl}>
					<Label idFor="dummy1" title="Dummy 2" size="small" />
					<Input
						id="dummy2"
						placeholder="Dummy content 2"
            onChange={() => setFormError("")}
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
