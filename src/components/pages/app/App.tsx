import {VFC} from "react";
import Star from "../../atoms/star/Star";

const App: VFC = () => {
  return (
    <div style={{display: "flex"}}>
    <Star size="small" rating={1} />
    <Star size="small" rating={1} />
    <Star size="small" rating={1} />
    <Star size="small" rating={1} />
    <Star size="small" rating={0.5} />
    </div>
  );
}

export default App;
