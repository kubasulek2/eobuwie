import {useState, VFC} from "react";
import format from "date-fns/format";
import addMonths from "date-fns/addMonths";
import {DatePickerModalProps} from "./types";
import styles from './DatePicker.module.css';
import {joinClassNames} from "../../../utils/joinClassNames";
import {text_medium_dark, cyan_bg, text_white} from "../../../styles/colors";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DatePickerModal: VFC<DatePickerModalProps> = ({open, id, availableDates, onDates}) => {
  const [date, setDate] = useState<Date>(new Date());
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
      <div

      >
        <div className={joinClassNames(styles.modal_header, cyan_bg, text_white)}>
          <button className={styles.month_arrow_btn} onClick={() => setDate(prev => addMonths(prev, -1))}>
            <span className={joinClassNames(text_medium_dark, styles.month_arrow, styles.month_arrow_left)}></span>
          
          </button>
          <div className={styles.month}>{format(date, "LLLL")} {date.getFullYear()}</div>
          <button className={styles.month_arrow_btn} onClick={() => setDate(prev => addMonths(prev, 1))}>
            <span className={joinClassNames(text_medium_dark, styles.month_arrow, styles.month_arrow_right)}></span>
          
          </button>
        </div>
        <ul>
          <li tabIndex={0}>test 1</li>
          <li tabIndex={0}>test 2</li>
          <li tabIndex={0}>test 3</li>
        </ul>
      </div>
    </div >
  );
};

export default DatePickerModal;
