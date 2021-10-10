import React, {FC} from 'react';
import {joinClassNames} from "../../../utils/joinClassNames";
import {ButtonProps} from "./types";
import styles from "./Button.module.css";

/**
 * Button component. Warm red color by default. Can be overritten via "classes" prop.
 */
const Button: FC<ButtonProps> = ({children, id, onClick, type = "button", size = "medium", classes = []}) => {
  return (
    <button
      className={joinClassNames(styles.button, styles[size], ...classes)}
      id={id}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
