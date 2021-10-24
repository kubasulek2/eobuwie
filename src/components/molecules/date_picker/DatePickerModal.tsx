import { useEffect, useState, VFC } from "react";
import format from "date-fns/format";
import addMonths from "date-fns/addMonths";
import { DatePickerModalProps } from "./types";
import styles from "./DatePicker.module.css";
import { joinClassNames } from "../../../utils/joinClassNames";
import {
  text_medium_dark,
  cyan_bg,
  text_white,
  text_medium,
} from "../../../styles/colors";
import { MonthDay } from "../../organisms/ReservationCard/types";
import { getCalendarMonthBoundries } from "../../../utils/getCalendarMonthBoundries";
import { usePrevious } from "../../../hooks/usePrevious";
import { computeCalendarDays } from "../../../utils/computeCalendarDays";

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
  availableDates,
  onDates,
}) => {
  /* Date for calendar manipulation */
  const [date, setDate] = useState<Date>(new Date());
  const [monthDays, setMonthDays] = useState<MonthDay[]>([]);

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
    setMonthDays(computeCalendarDays(start, end, availableDates, date));
  }, [date, prevDate, open, availableDates, setMonthDays, monthDays]);

  // Calculates number of weeks in month view. This will serve as rows in our calendar.
  const calendarRows = Array.from(
    { length: monthDays.length / 7 },
    (_, i) => i
  );

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
                className={joinClassNames(text_medium, styles.week_day)}
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
                  <div
                    onClick={() => {}}
                    role="gridcell"
                    data-column={i}
                    aria-label={`You choose ${el.dateString}`}
                    tabIndex={0}
                    data-date={el.dateString}
                    key={el.dateString}
                    className={styles.calendar_cell}
                  >
                    {el.monthDay}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DatePickerModal;
