import {VFC} from 'react';
import styles from "./Input.module.scss";
import {InputProps} from "./types";
import {joinClassNames} from "../../../utils/joinClassNames";

/**
 * Text or date input. Controlled or uncontrolled. Pass "value" and "onChange" props to make it controlled 
 */
const Input: VFC<InputProps> = ({value, onChange, id, placeholder, type="text", classes=[], ...htmlProps}) => {
  return (
    <input
      {...htmlProps}
      className={joinClassNames(styles.input, ...classes)}
      value={value}
      onChange={e => onChange ? onChange(e.target.value) : undefined}
      placeholder={placeholder}
      type={type}
      id={id}
    />
  );
};

export default Input;
