import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Drawer from './components/Drawer';

import Home from './pages/Home';
import Orders from './pages/Orders';
import Favorites from './pages/Favorites';

import axios from 'axios';

export const AppContext = React.createContext({});

function App() {
	const [items, setItems] = React.useState([]);
	const [cartItems, setCartItems] = React.useState([]);
	const [favorites, setFavorites] = React.useState([]);
	const [searchValue, setSearchValue] = React.useState('');
	const [cartOpened, setCartOpened] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		async function fetchData() {
			try {
				const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
					axios.get('https://62017a1afdf5090017249a2e.mockapi.io/cart'),
					axios.get('https://62017a1afdf5090017249a2e.mockapi.io/favorites'),
					axios.get('https://62017a1afdf5090017249a2e.mockapi.io/items'),
				]);

				setIsLoading(false);

				setCartItems(cartResponse.data);
				setFavorites(favoritesResponse.data);
				setItems(itemsResponse.data);
			} catch (error) {
				alert('Ошибка при запросе данных ;(');
				console.error(error);
			}
		}
		fetchData();
	}, []);

	const onAddToCart = async (obj) => {
		console.log(obj);
		try {
			const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
			if (findItem) {
				setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
				await axios.delete(`https://62017a1afdf5090017249a2e.mockapi.io/cart/${findItem.id}`);
			} else {
				setCartItems((prev) => [...prev, obj]);
				const { data } = await axios.post('https://62017a1afdf5090017249a2e.mockapi.io/cart', obj);
				setCartItems((prev) =>
					prev.map((item) => {
						if (item.parentId === data.parentId) {
							return { ...item, id: data.id };
						}
						return item;
					}),
				);
			}
		} catch (error) {
			alert('Не удалось добавить в корзину');
			console.error(error);
		}
	};

	const onAddToFavorite = async (obj) => {
		try {
			if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
				axios.delete(`https://62017a1afdf5090017249a2e.mockapi.io/favorites/${obj.id}`);
			} else {
				const { data } = await axios.post(
					'https://62017a1afdf5090017249a2e.mockapi.io/favorites',
					obj,
				);
				setFavorites((prev) => [...prev, data]);
			}
		} catch (error) {
			alert('Не удалось добавить в фавориты');
			console.error(error);
		}
	};

	const onRemoveItem = (id) => {
		try {
			axios.delete(`https://62017a1afdf5090017249a2e.mockapi.io/cart/${id}`);
			setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
		} catch (error) {
			alert('Ошибка при удалении из корзины');
			console.error(error);
		}
	};

	const onChangeSearchInput = (event) => {
		setSearchValue(event.target.value);
	};

	const isItemAdded = (id) => {
		return cartItems.some((obj) => Number(obj.parentId) === Number(id));
	};

	return (
		<AppContext.Provider
			value={{
				items,
				cartItems,
				favorites,
				onAddToCart,
				isItemAdded,
				onAddToFavorite,
				setCartOpened,
				setCartItems,
			}}>
			<div className="Wrapper clear">
				<Drawer
					items={cartItems}
					onClose={() => setCartOpened(false)}
					onRemove={onRemoveItem}
					opened={cartOpened}
				/>
				<Header onClickCart={() => setCartOpened(true)} />
				<Routes>
					<Route
						exact
						path="/"
						element={
							<Home
								cartItems={cartItems}
								items={items}
								searchValue={searchValue}
								setSearchValue={setSearchValue}
								onAddToFavorite={onAddToFavorite}
								onAddToCart={onAddToCart}
								onChangeSearchInput={onChangeSearchInput}
								isLoading={isLoading}
							/>
						}
					/>
					<Route exact path="/favorites" element={<Favorites />} />
					<Route exact path="/orders" element={<Orders />} />
				</Routes>
			</div>
		</AppContext.Provider>
	);
}
export default App;
