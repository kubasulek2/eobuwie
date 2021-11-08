import {VFC} from 'react';
import {joinClassNames} from '../../../utils/joinClassNames';
import {StarProps} from './types';
import styles from './Star.module.scss';

/**
 * Rating star component, read only, displays empty, full or half full star icon
 */
const Star: VFC<StarProps> = ({classes = [], rating = 1, size = 'medium'}) => {
	const iconName =
		rating === 1
			? styles['star']
			: rating === 0.5
			? styles['star_half']
			: styles['star_empty'];

	const sizeClass =
		size === 'small'
			? styles.small
			: size === 'medium'
			? styles.medium
			: styles.large;

	const classlist = joinClassNames(styles.icon, iconName, ...classes); // custom classes will override defaults
	
	return (
		<div
			data-testid="star"
			role="presentation"
			aria-hidden="true"
			className={sizeClass}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 279.62 265.93"
				className={classlist}
			>
				<polygon
					className={styles.one}
					points="0 101.58 106.8 101.58 139.81 0 139.81 203.15 53.4 265.93 86.41 164.35 0 101.58"
				/>
				<polygon
					className={styles.two}
					points="279.62 101.58 172.81 101.58 139.81 0 139.81 203.15 226.22 265.93 193.21 164.35 279.62 101.58"
				/>
			</svg>
		</div>
	);
};

export default Star;
