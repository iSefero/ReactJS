import styles from './Drawer.module.scss';
import React from 'react';
import cx from 'classnames';

import Info from '../Info';
import { useCart } from '../../hooks/useCart';

import axios from 'axios';

function Drawer({ onClose, onRemove, items = [], opened }) {
	const { cartItems, setCartItems, totalPrice } = useCart();
	const [orderId, setOrderId] = React.useState(null);
	const [isOrderComplete, setIsOrderComplete] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);

	const onClickOrder = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.post('https://62017a1afdf5090017249a2e.mockapi.io/orders', {
				items: cartItems,
			});
			await axios.get(`https://62017a1afdf5090017249a2e.mockapi.io/orders`, []);
			setOrderId(data.id);
			setIsOrderComplete(true);
			setCartItems([]);
		} catch (error) {
			alert('Ошибка при создании заказа :(');
		}
		setIsLoading(false);
	};

	return (
		<div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
			<div className={cx('d-flex flex-column', styles.drawer)}>
				<h2 className="mb-30 d-flex justify-between">
					Корзина{' '}
					<img
						onClick={onClose}
						className={cx('cu-p', styles.removeBtn)}
						src="/img/btn-remove.svg"
						alt="Close"
					/>
				</h2>
				{items.length > 0 ? (
					<div className="d-flex flex-column flex">
						<div className={styles.items}>
							{items.map((obj) => (
								<div
									key={obj.id}
									className={cx('d-flex align-center mb-20 pr-15 pl-15', styles.cartItems)}>
									<img className="mr-30" src={obj.imageUrl} alt="Sneakers" height={70} width={70} />
									<div className="mr-20">
										<p className="mb-5">{obj.title}</p>
										<b>{obj.price} dol.</b>
									</div>
									<img
										onClick={() => onRemove(obj.id)}
										className={styles.removeBtn}
										src="/img/btn-remove.svg"
										alt="Remove"
									/>
								</div>
							))}
						</div>
						<div className={styles.cartTotalBlock}>
							<ul>
								<li className="d-flex">
									<span>Итого:</span>
									<div></div>
									<b>{totalPrice} dol.</b>
								</li>
								<li className="d-flex">
									<span>Налог 5%:</span>
									<div></div>
									<b>{totalPrice * 0.05} dol.</b>
								</li>
							</ul>
							<button disabled={isLoading} onClick={onClickOrder} className={styles.greenButton}>
								Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
							</button>
						</div>
					</div>
				) : (
					<Info
						title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
						description={
							isOrderComplete
								? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
								: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
						}
						image={isOrderComplete ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'}
					/>
				)}
			</div>
		</div>
	);
}

export default Drawer;
