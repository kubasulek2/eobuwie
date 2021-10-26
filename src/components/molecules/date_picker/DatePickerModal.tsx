import {useEffect, useState, VFC} from "react";
import format from "date-fns/format";
import addMonths from "date-fns/addMonths";
import {DatePickerModalProps} from "./types";
import styles from "./DatePicker.module.css";
import {joinClassNames} from "../../../utils/joinClassNames";
import {
  text_medium_light,
  text_medium_dark,
  cyan_bg,
  text_white,
} from "../../../styles/colors";
import {IMonthDay} from "../../organisms/ReservationCard/types";
import {getCalendarMonthBoundries} from "../../../utils/getCalendarMonthBoundries";
import {usePrevious} from "../../../hooks/usePrevious";
import {computeCalendarDays} from "../../../utils/computeCalendarDays";
import MonthDay from "../../atoms/month_day/MonthDay";


/**
 */
const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Displays calendar popup.
 * Do most of the dates calculations.
 */
const DatePickerModal: VFC<DatePickerModalProps> = ({
  open,
  id,
  unavailableDates,
  onDates,
}) => {
  /* Date for calendar manipulation */
  const [date, setDate] = useState<Date>(new Date());
  const [monthDays, setMonthDays] = useState<IMonthDay[]>([]);

  // Use previous Date because availableDates array may be not memoized, causing constant component rerenders.
  // Using prevDate will prevent hook belowe from recalculating monthDays all the time
  const prevDate = usePrevious<Date>(date);

  // Compute month days on each calendar date change
  useEffect(() => {
    if (!open) return;
    // either no date yet or monthDays already computer and date hasn't changed
    if (!date || (monthDays.length && date === prevDate)) return;

    // calculate first and last day to display
    const [start, end] = getCalendarMonthBoundries(date);

    // calculate and set MonthDay object's array
    setMonthDays(computeCalendarDays(start, end, unavailableDates, date));
  }, [date, prevDate, open, unavailableDates, setMonthDays, monthDays]);

  // Calculates number of weeks in month view. This will serve as rows in our calendar.
  const calendarRows = Array.from(
    {length: monthDays.length / 7},
    (_, i) => i
  );
  console.log(monthDays);

  return (
    <div
      className={styles.modal}
      hidden={!open}
      aria-hidden={open ? "false" : "true"}
      aria-modal={open ? "true" : "false"}
      role="dialog"
      aria-label="Choose reservation dates"
      id={id}
    >
      <div>
        <div
          className={joinClassNames(styles.modal_header, cyan_bg, text_white)}
        >
          <button
            data-column={0}
            className={styles.month_arrow_btn}
            onClick={() => setDate((prev) => addMonths(prev, -1))}
          >
            <span
              className={joinClassNames(
                text_medium_dark,
                styles.month_arrow,
                styles.month_arrow_left
              )}
            ></span>
          </button>
          <div className={styles.month}>
            {format(date, "LLLL")} {date.getFullYear()}
          </div>
          <button
            data-column={6}
            className={styles.month_arrow_btn}
            onClick={() => setDate((prev) => addMonths(prev, 1))}
          >
            <span
              className={joinClassNames(
                text_medium_dark,
                styles.month_arrow,
                styles.month_arrow_right
              )}
            ></span>
          </button>
        </div>
        <div role="grid" className={styles.calendar_container}>
          <div role="row" className={styles.week_names}>
            {DAYS_OF_WEEK.map((day) => (
              <div
                key={day}
                role="columnheader"
                className={joinClassNames(text_medium_light, styles.week_day)}
              >
                {day}
              </div>
            ))}
          </div>
          {calendarRows.map((index) => (
            <div
              role="row"
              key={"row_" + index}
              className={styles.calendar_row}
            >
              {monthDays
                .filter((el, i) => i < (index + 1) * 7 && i >= index * 7)
                .map((el, i) => (
                  <MonthDay
                    available={el.available}
                    column={i}
                    dateString={el.dateString}
                    firstSelected={el.monthDay === 27 && !el.dateString.includes("/09/")}
                    lastSelected={el.monthDay === 31}
                    selected={el.monthDay >= 27 && !el.dateString.includes("/09/") }
                    monthDay={el.monthDay}
                    timeStamp={el.timeStamp}
                    today={el.today}
                    onClick={() => { }}
                    key={el.dateString}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DatePickerModal;
