import styles from './Header.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { useCart } from '../../hooks/useCart';

function Header(props) {
	const { totalPrice } = useCart();

	return (
		<header className={cx('d-flex justify-between align-center p-40', styles.header)}>
			<Link to="/">
				<div className="d-flex align-center">
					<img className="mr-15" src="/img/logo.png" width={40} height={40} alt="Logotype" />
					<div className="headerInfo">
						<h3 className="text-uppercase">Sneakers</h3>
						<p className="opacity-5">Магазин лучших кроссовок</p>
					</div>
				</div>
			</Link>
			<ul className="d-flex">
				<li onClick={props.onClickCart} className="mr-30 cu-p">
					<img src="/img/cart.svg" width={18} height={18} alt="Корзина" />
					<span> {totalPrice} dol.</span>
				</li>
				<Link to="/favorites">
					<li className="mr-25 cu-p">
						<img src="/img/heart.svg" width={20} height={20} alt="Закладки" />
					</li>
				</Link>
				<Link to="/orders">
					<li>
						<img src="/img/user.svg" width={20} height={20} alt="Пользователь" />
					</li>
				</Link>
			</ul>
		</header>
	);
}

export default Header;
