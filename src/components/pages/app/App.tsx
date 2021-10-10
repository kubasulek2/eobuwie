import {VFC} from "react";
import styles from "./App.module.css";
import Divider from "../../atoms/divider/Divider";
import StarRating from "../../molecules/star_rating/StarRating";
import {joinClassNames} from "../../../utils/joinClassNames";
import {gray_light_bg} from "../../../styles/colors";


const App: VFC = () => {
  return (
    <div className={joinClassNames(styles.app, gray_light_bg)}>
      <StarRating score={4.5} votes={100} size="medium" />
      <Divider />
    </div>
  );
};

export default App;
