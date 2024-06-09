import { useEffect, useState } from "react";
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header";
import axios from "axios";
import data from './server/db.json'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favoties from "./pages/Favorites";
import { AppContext } from "./context";

export default function App() {
  const [items, setItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false)
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        // сделали так чтобы, коризна и фаориты, грузились,
        // а потом рендерился айтемс
        const cartResponse = await axios.get('http://localhost:3001/cart')
        const favoritesResponse = await axios.get('http://localhost:3001/favorites')
        const itemsResponse = await axios.get('http://localhost:3001/sneakers')

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

  function onAddToCart(obj) {
    try {
      if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
        axios.delete(`http://localhost:3001/cart/${obj.id}`)
        setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
      } else {
        axios.post('http://localhost:3001/cart', obj)
        setCartItems([...cartItems, obj])
      }
    } catch (e) {
      console.log('onAddToCart', e)
    }
  }

  function onRemoveItem(id) {
    axios.delete(`http://localhost:3001/cart/${id}`)
    setCartItems(prev => prev.filter(i => i.id !== id))
  }

  async function onAddToFavorite(obj) {
    try {
      if (favorites.find(f => f.id === obj.id)) {
        axios.delete(`http://localhost:3001/favorites/${obj.id}`)
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

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}>

      <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
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
          <Route path="/favorites" element={<Favoties items={favorites} onAddToFavorite={onAddToFavorite} />} />
        </Routes>


      </div>
    </AppContext.Provider>

  )
}