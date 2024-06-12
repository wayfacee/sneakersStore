import { useEffect, useState } from "react";
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header";
import axios from "axios";
import data from './server/db.json'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favoties from "./pages/Favorites";
import { AppContext } from "./context";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

export default function App() {
  const [items, setItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false)
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // сделали так чтобы, коризна и фаориты, грузились,
        // а потом рендерился айтемс
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('http://localhost:3001/cart'),
          axios.get('http://localhost:3001/favorites'),
          axios.get('http://localhost:3001/sneakers')
        ]);

        setCartItems(cartResponse.data)
        setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data)
      } catch (e) {
        console.log('fetchData', e)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  async function onAddToCart(obj) {
    try {
      if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
        await axios.delete(`http://localhost:3001/cart/${obj.id}`)
      } else {
        setCartItems([...cartItems, obj])
        await axios.post('http://localhost:3001/cart', obj)
      }
    } catch (e) {
      console.log('onAddToCart', e)
    }
  }

  async function onRemoveItem(id) {
    try {
      setCartItems(prev => prev.filter(i => i.id !== id))
      await axios.delete(`http://localhost:3001/cart/${id}`)
    } catch (e) {
      console.log('onRemoveItem', e)
    }
  }

  async function onAddToFavorite(obj) {
    try {
      if (favorites.find(f => Number(f.id) === Number(obj.id))) {
        await axios.delete(`http://localhost:3001/favorites/${obj.id}`)
        setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
      } else {
        const { data } = await axios.post('http://localhost:3001/favorites', obj);
        setFavorites(prev => [...prev, data])
      }
    } catch (e) {
      console.log('onAddToFavorite', e)
    }
  }

  function onChangeSearchInput(e) {
    setSearchValue(e.target.value);
  }

  function isItemAdded(id) {
    return cartItems.some(obj => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}>

      <div className="wrapper clear">
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="*"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            } />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>


      </div>
    </AppContext.Provider>

  )
}