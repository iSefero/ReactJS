import styles from './Card.module.scss';
import cx from 'classnames';
import ContentLoader from 'react-content-loader';
import React from 'react';
import { AppContext } from '../../App';

function Card({
	id,
	onFavorite,
	onPlus,
	price,
	imageUrl,
	title,
	favorited = false,
	loading = false,
}) {
	const { isItemAdded } = React.useContext(AppContext);
	const [isFavorite, setIsFavorite] = React.useState(favorited);
	const obj = { id, parentId: id, price, imageUrl, title };

	const onClickPlus = () => {
		onPlus(obj);
	};
	const buildImgUrl = (imgLink) => {
		console.log('test1');
		let isProd = window.location.hostname === 'isefero.github.io';
		return (isProd ? '/ReactJS/' : '') + imgLink;
	};

	const onClickFavorite = () => {
		onFavorite(obj);
		setIsFavorite(!isFavorite);
	};

	return (
		<div className={cx('d-flex flex-column', styles.card)}>
			{loading ? (
				<ContentLoader
					speed={2}
					width={150}
					height={187}
					viewBox="0 0 150 187"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb">
					<rect x="24" y="17" rx="0" ry="0" width="1" height="0" />
					<rect x="23" y="21" rx="0" ry="0" width="1" height="1" />
					<rect x="76" y="94" rx="0" ry="0" width="1" height="0" />
					<rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
					<rect x="0" y="106" rx="5" ry="5" width="150" height="15" />
					<rect x="43" y="113" rx="0" ry="0" width="1" height="0" />
					<rect x="0" y="165" rx="5" ry="5" width="80" height="25" />
					<rect x="120" y="160" rx="5" ry="5" width="30" height="30" />
					<rect x="60" y="157" rx="0" ry="0" width="1" height="0" />
					<rect x="0" y="127" rx="5" ry="5" width="90" height="15" />
					<rect x="50" y="151" rx="0" ry="0" width="0" height="1" />
				</ContentLoader>
			) : (
				<>
					{onFavorite && (
						<div className={styles.favorite} onClick={onClickFavorite}>
							<img src={isFavorite ? 'img/liked.svg' : 'img/unliked.svg'} alt="Unliked" />
						</div>
					)}
					<img src={imageUrl} alt="Sneakers" width={133} height={112} />
					<h5>{title}</h5>
					<div className="d-flex justify-between align-center">
						<div className="d-flex flex-column">
							<span>Цена:</span>
							<b>{price} dol.</b>
						</div>
						{onPlus && (
							<img
								className="cu-p"
								src={isItemAdded(id) ? 'img/btn-cheked.svg' : 'img/btn-plus.svg'}
								alt="Plus"
								onClick={onClickPlus}
							/>
						)}
					</div>
				</>
			)}
		</div>
	);
}

export default Card;
