import React, {VFC} from 'react';
import {scoreToStarValue} from "../../../utils/scoreToStarValue";
import Star from "../../atoms/star/Star";
import {StarRatingProps} from "./types";
import styles from "./StarRating.module.css";
import {joinClassNames} from "../../../utils/joinClassNames";
import {text_medium_dark} from "../../../styles/colors";

/**
 * Component displays 5 star rating.
 */
const StarRating: VFC<StarRatingProps> = ({score, votes, id, size = "medium"}) => {
  return (
    <div
      data-testid="star_rating"
      className={joinClassNames(styles.container, styles["container_" + size])}
      id={id}
    >
      <div
        className={styles.wrapper}
        aria-label={`Rating: ${ score }. Based on ${ votes } votes.`}
      >
        {[1, 2, 3, 4, 5].map(num => <Star rating={scoreToStarValue(score, num)} size={size} key={num} />)}
      </div>
      <span className={joinClassNames(styles.votes, text_medium_dark, styles["votes_" + size])}>{votes}</span>
    </div>
  );
};

export default StarRating;
