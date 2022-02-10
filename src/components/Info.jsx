import React from 'react';
import { AppContext } from '../App';
import cx from 'classnames';
import styles from './Drawer/Drawer.module.scss';

const Info = ({ image, title, description }) => {
	const { setCartOpened } = React.useContext(AppContext);
	return (
		<div className={cx('d-flex align-center justify-center flex-column flex', styles.cartEmpty)}>
			<img className="mb-20" width="120px" src={image} alt="Empty" />
			<h2>{title}</h2>
			<p className="opacity-6">{description}</p>
			<button onClick={() => setCartOpened(false)} className={styles.greenButton}>
				<img src="/img/turn-arrow.svg" alt="Arrow" />
				Вернуться назад
			</button>
		</div>
	);
};

export default Info;
