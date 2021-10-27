import {useCallback, useEffect, useMemo, useState, VFC} from 'react';
import {DatePickerProps} from "./types";
import styles from './DatePicker.module.css';
import {joinClassNames} from "../../../utils/joinClassNames";
import {text_medium_dark, teal_light_bg, teal} from "../../../styles/colors";
import format from "date-fns/format";
import {usePickerKeyboardControl} from "../../../hooks/usePickerKeyboardControl";
import DatePickerModal from "./DatePickerModal";
import {getCalendarMonthBoundries} from "../../../utils/getCalendarMonthBoundries";
import {computeCalendarDays} from "../../../utils/computeCalendarDays";
import {IMonthDay} from "../../organisms/ReservationCard/types";
import {usePrevious} from "../../../hooks/usePrevious";
import {isSameDay} from "date-fns";

const DatePicker: VFC<DatePickerProps> = ({startDate, endDate, id, unavailableDates, setStartDate, setEndDate}) => {
  /* Handles picker state */
  const [pickerOpen, setPickerOpen] = useState<boolean>(false);
  /* Date for calendar manipulation */
  const [pickerDate, setPickerDate] = useState<Date>(new Date());
  /* Stores all relevant days informations */
  const [monthDays, setMonthDays] = useState<IMonthDay[]>([]);

  // Use previous Date because availableDates array may be not memoized, causing constant component rerenders.
  // Using prevDate will prevent hook belowe from recalculating monthDays all the time
  const prevDate = usePrevious<Date>(pickerDate);

  const pickerId = id || "reservation_date_picker";
  // use memoization for modalId, to prevent useEffect extensive calls;
  const modalId = useMemo(() => id ? id + "_modal" : "reservation_date_picker_modal", [id]);

  /* Dates formated to string */
  const startDateString = startDate ? format(startDate, "dd/MM/yyyy") : "Check In";
  const endDateString = endDate ? format(endDate, "dd/MM/yyyy") : "Check Out";

  /* Concatenated classes of dates buttons */
  const startDateClasses = (pickerOpen || startDate) ? joinClassNames(styles.date, teal, teal_light_bg) : styles.date;
  const endDateClasses = endDate ? joinClassNames(styles.date, teal, teal_light_bg) : styles.date;


  // Handles focus, and keyboard control
  usePickerKeyboardControl(pickerOpen, setPickerOpen, modalId);



  // Compute month days on each calendar date change
  // This hooks computes days only when startDate not set
  useEffect(() => {
    // Prevent uneccessary recomputations
    if (!pickerOpen || startDate) return;
    // either no date yet or monthDays already computer and date hasn't changed
    if (!pickerDate || (monthDays.length && pickerDate === prevDate)) return;

    // calculate first and last day to display
    const [start, end] = getCalendarMonthBoundries(pickerDate);

    // calculate and set MonthDay object's array
    setMonthDays(computeCalendarDays(start, end, unavailableDates, pickerDate));
  }, [pickerDate, prevDate, pickerOpen, unavailableDates, setMonthDays, monthDays, startDate]);

  // Recalculate month days when either startDate, or both startDate and endDate are set.
  // User shouldn't be able to have unavailable date between start and end dates
  // This hooks computes days only when at least startDate is set
  useEffect(() => {
    // Prevent unecessary recomputation
    if (!pickerOpen || !pickerDate || !monthDays.length) return;
    if (!startDate) return;

    // calculate first and last day to display
    const [start, end] = getCalendarMonthBoundries(pickerDate);
    let lastAvailableTimestamp: number | undefined;

    if (startDate) {
      // Find last available date after startDate, and render all dates after unavailable
      const startTimeStamp = "number" === typeof startDate ? startDate : startDate.getTime();
      const firstUnavailableIndex = monthDays.findIndex(day => !day.available && day.timeStamp > startTimeStamp);
      // number of undefined if day not found
      lastAvailableTimestamp = (monthDays[firstUnavailableIndex - 1] || {}).timeStamp;

    }

    const calDays = computeCalendarDays(start, end, unavailableDates, pickerDate, lastAvailableTimestamp);

    // calculate and set MonthDay object's array
    setMonthDays(calDays);
  }, [pickerDate, pickerOpen, unavailableDates, setMonthDays, monthDays, startDate]);


  /* Memoized date handler */
  const onDateClick = useCallback((day: IMonthDay): void => {
    // Ignore unavailable dates clicks
    if (!day.available) return;

    // Neither start or end dates set
    if (!startDate) return setStartDate(day.timeStamp);
    
    // Set or cancel startDate when endDate not yet set
    if (startDate && !endDate) {
      const sameDay = isSameDay(startDate, day.timeStamp);
      return sameDay ? setStartDate(null) : setEndDate(day.timeStamp);
    }

    // Reset or cancel ebdDate when endDate already set
    if (endDate) {
      const sameDay = isSameDay(endDate, day.timeStamp);
      return setEndDate(sameDay ? null : day.timeStamp);
    }

  }, [startDate, endDate, setStartDate, setEndDate]);

  return (
    <div data-testid="date_picker" id={pickerId} className={styles.wrapper}>
      <button
        onClick={() => setPickerOpen(prev => !prev)}
        className={joinClassNames(styles.picker, text_medium_dark, pickerOpen ? styles.modal_open : "")}
        aria-controls={pickerId + "_dialog"}
        aria-haspopup="true"
        aria-label="Controls reservation datepicker"
        aria-describedby={pickerId + "_info"}
      >
        <span className={startDateClasses}>{startDateString}</span>
        <span className={joinClassNames(styles.arrow, text_medium_dark)}></span>
        <span className={endDateClasses}>{endDateString}</span>
      </button>
      <span className="visually-hidden" id={pickerId + "_info"}>This button opens popup dialog, where reservation dates can be chosen.</span>

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
