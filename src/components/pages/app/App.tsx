import {VFC} from "react";
import StarRating from "../../molecules/star_rating/StarRating";


const App: VFC = () => {
  return (
    <div style={{display: "flex"}}>
      <StarRating score={4.5} votes={100} size="medium" />
    </div>
  );
};

export default App;
