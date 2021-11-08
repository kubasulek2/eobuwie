import {FC} from 'react';
import {joinClassNames} from "../../../utils/joinClassNames";
import {ButtonProps} from "./types";
import styles from "./Button.module.scss";

/**
 * Button component. Warm red color by default. Can be overritten via "classes" prop.
 */
const Button: FC<ButtonProps> = ({children, id, onClick, type = "button", size = "medium", classes = [], disabled, ...htmlProps}) => {
  return (
    <button
      {...htmlProps}
      /* Do not add disabled atribute due to accessibility reasons, make it class instead */
      className={joinClassNames(styles.button, styles[size], (disabled ? styles.disabled : ""),  ...classes)}
      /* Make sure if disabled is on, aria-disabled is set */
      aria-disabled={disabled ? "true" : "false"}
      id={id}
      type={type}
      onClick={!disabled ? onClick : undefined}
    >
      {children}
    </button>
  );
};

export default Button;
