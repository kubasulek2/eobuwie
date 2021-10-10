import {VFC} from 'react';
import styles from "./Input.module.css";
import {InputProps} from "./types";
import {joinClassNames} from "../../../utils/joinClassNames";
import {text_medium} from "../../../styles/colors";

/**
 * Text or date input. Controlled via props.
 */
const Input: VFC<InputProps> = ({value, onChange, id, placeholder, type="text", classes=[]}) => {
  return (
    <input
      className={joinClassNames(styles.input, text_medium, ...classes)}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      id={id}
    />
  );
};

export default Input;
