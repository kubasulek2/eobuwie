import React, {VFC, FormEvent, useState} from 'react';
import Button from "../../atoms/button/Button";
import Divider from "../../atoms/divider/Divider";
import Input from "../../atoms/input/Input";
import ReservationHeader from "../../molecules/card_header/ReservationHeader";
import styles from './ReservationCard.module.css';
import {ReservationCardProps} from "./types";

const ReservationCard: VFC<ReservationCardProps> = ({price, score, votes, onSubmit, startDate}) => {
  /* Call prevent default, as page should not be reloaded */
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit();
  };
  const [date, setDate] = useState("");
  return (
    <div className={styles.card}>
      <ReservationHeader price={price} score={score} votes={votes} />
      <Divider />
      <form onSubmit={handleSubmit}>
        <div className={styles.formControl}>
          <Button type="submit" size="medium">Submit</Button>
        </div>
        <Input placeholder="Check In" value="" type="date" onChange={() => {}} classes={['visually-hidden']} />
        <input type="date" value={date} onChange={e => setDate(e.target.value)}  />
      </form>
    </div>
  );
};

export default ReservationCard;
