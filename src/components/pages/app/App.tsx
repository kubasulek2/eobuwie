import {VFC} from "react";
import styles from "./App.module.css";
import {joinClassNames} from "../../../utils/joinClassNames";
import {gray_light_bg} from "../../../styles/colors";
import ReservationCard from "../../organisms/ReservationCard/ReservationCard";


const App: VFC = () => {
  return (
    <div className={joinClassNames(styles.app, gray_light_bg)}>
      <ReservationCard
        score={4.5}
        votes={100}
        price={200}
        unavailableDates={[]}
        startDate={null}
        endDate={null}
        setEndDate={() => {}}
        setStartDate={() => {}}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default App;
