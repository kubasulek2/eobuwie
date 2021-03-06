import {useMemo, useState, VFC} from "react";
import styles from "./App.module.scss";
import ReservationCard from "../../organisms/reservation_card/ReservationCard";
import {CalendarDate} from "../../../hooks/useDatePicker";
import {addDays} from "date-fns";


/**
 * Main Component, added to project to render ReservationCard
 */
const App: VFC = () => {
  const [startDate, setStartDate] = useState<CalendarDate | null>(null);
  const [endDate, setEndDate] = useState<CalendarDate | null>(null);
  const unavailableDates = useMemo(() => [addDays(new Date(), 5)], []);
  return (
    <div className={styles.app}>
      <ReservationCard
        score={2.5}
        votes={100}
        price={200}
        unavailableDates={unavailableDates}
        startDate={startDate}
        endDate={endDate}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default App;
