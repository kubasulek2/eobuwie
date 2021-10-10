import {VFC} from 'react';
import {LabelProps} from "./types";
import styles from './Label.module.css';
import {joinClassNames} from "../../../utils/joinClassNames";
import {text_medium_dark} from "../../../styles/colors";

/**
 *  Input label, should be given an input id via props.
 */
const Label: VFC<LabelProps> = ({idFor, title, classes = [], required = false, size = "small"}) => {
  return (
    <label
      data-testid="label"
      htmlFor={idFor}
      className={joinClassNames(text_medium_dark, styles.label, styles[size], ...classes)}
    >
      {title} {required ? " *" : ""}
    </label>
  );
};

export default Label;
