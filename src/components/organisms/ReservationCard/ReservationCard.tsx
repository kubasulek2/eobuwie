import React, {VFC} from 'react';
import Divider from "../../atoms/divider/Divider";
import ReservationHeader from "../../molecules/card_header/ReservationHeader";
import styles from './ReservationCard.module.css';
import {ReservationCardProps} from "./types";

const ReservationCard: VFC<ReservationCardProps> = ({price, score, votes, onSubmit}) => {
  return (
    <div className={styles.card}>
      <ReservationHeader price={price} score={score} votes={votes} />
      <Divider />
      <form onSubmit={onSubmit}>

      </form>
    </div>
  );
};

export default ReservationCard;
