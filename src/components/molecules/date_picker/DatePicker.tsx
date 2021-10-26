import {useMemo, useState, VFC} from 'react';
import {DatePickerProps} from "./types";
import styles from './DatePicker.module.css';
import {joinClassNames} from "../../../utils/joinClassNames";
import {text_medium_dark, teal_light_bg, teal} from "../../../styles/colors";
import format from "date-fns/format";
import {usePickerKeyboardControl} from "../../../hooks/usePickerKeyboardControl";
import DatePickerModal from "./DatePickerModal";

const DatePicker: VFC<DatePickerProps> = ({startDate, endDate, id, unavailableDates}) => {
  /* Handles picker state */
  const [pickerOpen, setPickerOpen] = useState<boolean>(false);

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
        unavailableDates={unavailableDates}
        id={modalId}
        onDates={() => {}}
      />
    </div>
  );
};

export default DatePicker;
