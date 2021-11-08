import {VFC} from 'react';
import {joinClassNames} from "../../../utils/joinClassNames";
import {DividerProps} from "./types";
import styles from "./Divider.module.scss";


/**
 * Horizontal diver line.
 */
const Divider: VFC<DividerProps> = ({classes = []}) =>  <hr data-testid="divider" className={joinClassNames(styles.divider, ...classes)} />;

export default Divider;
