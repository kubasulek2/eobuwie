import {VFC} from "react";
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
import MonthDay from "../../atoms/month_day/MonthDay";
import {IMonthDay} from "../../organisms/ReservationCard/types";


/** Week days abbreviations */
const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
  const calendarRows = Array.from(
    {length: monthDays.length / 7},
    (_, i) => i
  );

  // Transform Date|number|null to number|null
  const startTimestamp = !startDate ? null : "number" === typeof startDate ? startDate : startDate.getTime();
  const endTimestamp = !endDate ? null : "number" === typeof endDate ? endDate : endDate.getTime();
  
  // Check if particular day is selected
  const isDaySelected = (day: IMonthDay) => !endTimestamp ? day.timeStamp === startTimestamp : day.timeStamp >= (startTimestamp || 0) && day.timeStamp <= endTimestamp; 
  
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
            onClick={() => setPickerDate((prev) => addMonths(prev, -1))}
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
            {format(pickerDate, "LLLL")} {pickerDate.getFullYear()}
          </div>
          <button
            data-column={6}
            className={styles.month_arrow_btn}
            onClick={() => setPickerDate((prev) => addMonths(prev, 1))}
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
                .filter((_, i) => i < (index + 1) * 7 && i >= index * 7)
                .map((day, i) => (
                  <MonthDay
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
  );
};

export default DatePickerModal;
