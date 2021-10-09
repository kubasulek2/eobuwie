import {VFC} from "react";
import {joinClassNames} from "../../../utils/joinClassNames";
import {StarProps} from './types';
import {teal} from "../../../styles/colors";
import styles from './Star.module.css';

/**
 * Rating star component, read only, displays empty, full or half full star icon
 */
const Star: VFC<StarProps> = ({classes = [], rating = 1, size = "medium"}) => {
  const sizeClass = size === "small" ? styles.small : size === "medium" ? styles.medium : styles.large;
  const classlist = joinClassNames("material-icons",teal, sizeClass,...classes); // custom classes will override defaults
  const iconName = rating === 1 ? "star" : rating === 0.5 ? "star_half" : "star_border";
  
  return (
    <div data-testid="star" role="presentation">
      <span className={classlist}>
        {iconName}
      </span>
    </div>
  );
};

export default Star;
