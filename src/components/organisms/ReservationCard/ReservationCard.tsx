import {VFC, FormEvent, useState} from 'react';
import {joinClassNames} from "../../../utils/joinClassNames";
import Button from "../../atoms/button/Button";
import Divider from "../../atoms/divider/Divider";
import Input from "../../atoms/input/Input";
import Label from "../../atoms/label/Label";
import ReservationHeader from "../../molecules/card_header/ReservationHeader";
import styles from './ReservationCard.module.css';
import {ReservationCardProps} from "./types";

const ReservationCard: VFC<ReservationCardProps> = ({price, score, votes, onSubmit, startDate}) => {
  /* Displays form errors, indicates validity of the form */
  const [formError, setFormError] = useState("");

  /* Call prevent default, as page should not be reloaded */
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit();
  };


  return (
    <div className={styles.card}>
      <ReservationHeader price={price} score={score} votes={votes} />
      <Divider />
      <form onSubmit={handleSubmit}>
        <div className={styles.formControl}>
          <Label idFor="dummy1" title="Dummy 1" size="small" />
          <Input id="dummy1" placeholder="Dummy content" value="" onChange={() => {}} />
        </div>
        <div className={styles.formControl}>
          <Label idFor="dummy1" title="Dummy 2" size="small" />
          <Input id="dummy2" placeholder="Dummy content 2" value="" onChange={() => {}} />
        </div>

        <div className={styles.formControl}>
          <p 
            className={joinClassNames(styles.errMsg, formError ? styles.error : "")}>
            {formError}
            </p>
          <Button type="submit" size="medium" disabled={Boolean(formError)}>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default ReservationCard;
