import {VFC} from "react";
import {DatePickerModalProps} from "./types";
import styles from './DatePicker.module.css';
import {joinClassNames} from "../../../utils/joinClassNames";
import {text_medium_dark, teal_light_bg, teal} from "../../../styles/colors";

const DatePickerModal: VFC<DatePickerModalProps> = ({open, id, availableDates, onDates}) => {
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
        <ul>
          <li tabIndex={0}>test 1</li>
          <li tabIndex={0}>test 2</li>
          <li tabIndex={0}>test 3</li>
        </ul>
      </div>
    </div>
  );
};

export default DatePickerModal;
