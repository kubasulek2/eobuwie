import {VFC} from 'react';
import {joinClassNames} from '../../../utils/joinClassNames';
import {StarProps} from './types';
import styles from './Star.module.css';

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
	
			const classlist = joinClassNames(
		'material-icons',
		iconName,
		sizeClass,
		...classes,
	); // custom classes will override defaults

	return (
		<div data-testid="star" role="presentation" aria-hidden="true">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 595.28 841.89"
				className={classlist}
			>
				<polygon
					className={styles.one}
					points="162.73 472.56 269.54 472.56 302.54 370.98 302.54 574.13 216.14 636.91 249.14 535.33 162.73 472.56"
				/>
				<polygon
					className={styles.two}
					points="442.45 472.56 335.64 472.56 302.64 370.98 302.64 574.13 389.04 636.91 356.04 535.33 442.45 472.56"
				/>
			</svg>
		</div>
	);
};

export default Star;
