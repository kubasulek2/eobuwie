import {VFC} from 'react';
import {DatePickerProps} from "./types";
import styles from './DatePicker.module.css';

const DatePicker: VFC<DatePickerProps> = ({startDate, endDate}) => {
  return (
    <>
      <button className={styles.picker}>
        <span className={styles.date}>{startDate ? "12.02.2020" : "Check In"}</span>
        <span className={styles.arrow}></span>
        <span className={styles.date}>{endDate ? "16.02.2020" : "Check Out"}</span>
      </button>

    </>
  );
};

export default DatePicker;
