import {VFC} from 'react';
import {ReservationHeaderProps} from "./types";
import styles from "./ReservationHeader.module.css";
import StarRating from "../star_rating/StarRating";
import {joinClassNames} from "../../../utils/joinClassNames";
import {text_dark} from "../../../styles/colors";

/**
 * Reservation card header, containing price, rating and number of votes.
 */
const ReservationHeader: VFC<ReservationHeaderProps> = ({price,score,votes,id}) => {
  return (
    <div data-testid="card_header" id={id}>
      <h3 className={joinClassNames(styles.price, text_dark)} aria-label="Reservation price">{price} zł</h3>
      <StarRating score={score} votes={votes} size="small" />
    </div>
  );
};

export default ReservationHeader;
