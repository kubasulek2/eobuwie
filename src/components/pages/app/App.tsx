import {useState, VFC} from "react";
import styles from "./App.module.css";
import {joinClassNames} from "../../../utils/joinClassNames";
import {gray_light_bg} from "../../../styles/colors";
import ReservationCard from "../../organisms/reservation_card/ReservationCard";
import {CalendarDate} from "../../../hooks/useDatePicker";


/**
 * Main Component, added to project to render ReservationCard
 */
const App: VFC = () => {
  const [startDate, setStartDate] = useState<CalendarDate | null>(null);
  const [endDate, setEndDate] = useState<CalendarDate | null>(null);
  
  return (
    <div className={joinClassNames(styles.app, gray_light_bg)}>
      <ReservationCard
        score={4.5}
        votes={100}
        price={200}
        unavailableDates={[]}
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
