import {VFC} from "react";
import Divider from "../../atoms/divider/Divider";
import StarRating from "../../molecules/star_rating/StarRating";


const App: VFC = () => {
  return (
    <div style={{display: "flex"}}>
      <StarRating score={4.5} votes={100} size="medium" />
      <Divider />
    </div>
  );
};

export default App;
