import {VFC} from 'react';
import {joinClassNames} from "../../../utils/joinClassNames";
import {gray_bg} from "../../../styles/colors";
import {DividerProps} from "./types";
import styles from "./Divider.module.css";


/**
 * Horizontal diver line.
 */
const Divider: VFC<DividerProps> = ({classes = []}) =>  <hr data-testid="divider" className={joinClassNames(styles.divider, gray_bg, ...classes)} />;

export default Divider;
