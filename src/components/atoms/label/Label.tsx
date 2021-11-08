import {VFC} from 'react';
import {LabelProps} from "./types";
import styles from './Label.module.scss';
import {joinClassNames} from "../../../utils/joinClassNames";

/**
 *  Input label, should be given an input id via props.
 */
const Label: VFC<LabelProps> = ({idFor, title, classes = [], required = false, size = "small"}) => {
  return (
    <label
      data-testid="label"
      htmlFor={idFor}
      className={joinClassNames(styles.label, styles[size], ...classes)}
    >
      {title} {required ? " *" : ""}
    </label>
  );
};

export default Label;
