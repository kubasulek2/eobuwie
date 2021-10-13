import {useState, VFC} from 'react';
import {DatePickerProps} from "./types";
import styles from './DatePicker.module.css';
import {joinClassNames} from "../../../utils/joinClassNames";
import {text_medium_dark, teal_light_bg, teal} from "../../../styles/colors";
import format from "date-fns/format";

const DatePicker: VFC<DatePickerProps> = ({startDate, endDate, id}) => {
  /* Handles picker state */
  const [pickerOpen, setPickerOpen] = useState<boolean>(false);

  const pickerId = id || "reservation_date_picker";

  /* Dates formated to string */
  const startDateString = startDate ? format(startDate, "dd/MM/yyyy") : "Check In";
  const endDateString = endDate ? format(endDate, "dd/MM/yyyy") : "Check Out";

  /* Concatenated classes of dates buttons */
  const startDateClasses = (pickerOpen || startDate) ? joinClassNames(styles.date, teal, teal_light_bg) : styles.date;
  const endDateClasses = endDate ? joinClassNames(styles.date, teal, teal_light_bg) : styles.date;

  return (
    <div data-testid="date_picker" id={pickerId}>
      <button
        onClick={() => setPickerOpen(prev => !prev)}
        className={joinClassNames(styles.picker, text_medium_dark)}
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
      <div
        aria-hidden={pickerOpen ? "false" : "true"}
        aria-modal={pickerOpen ? "true" : "false"}
        role="dialog"
        aria-label="Choose reservation dates"
      ></div>
    </div>
  );
};

export default DatePicker;
