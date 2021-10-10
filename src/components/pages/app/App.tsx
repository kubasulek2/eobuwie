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
        availableDates={[11234]}  
        startDate={null}  
        endDate={null}  
        onDatesSelected={() => {}}  
        onSubmit={() => {}}  
      />
    </div>
  );
};

export default App;
