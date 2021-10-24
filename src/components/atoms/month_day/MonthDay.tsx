import {VFC} from "react";
import {MonthDayProps} from "./types";
import styles from './MonthDay.module.css';

const MonthDay: VFC<MonthDayProps> = ({dateString, timeStamp, monthDay, column, available, onClick}) => {
  const 

  return (
    <div
      onClick={available ? () => onClick(timeStamp) : undefined}
      role="gridcell"
      data-column={column}
      aria-label={`You choose ${ dateString }`}
      tabIndex={0}
      aria-disabled={!available}
      data-date={dateString}
      key={dateString}
      className={styles.calendar_cell}
    >
      <div>
        {monthDay}
      </div>
    </div>
  );
};

export default MonthDay;