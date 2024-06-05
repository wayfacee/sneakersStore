import { useEffect, useState } from "react";
import Card from "./components/Card/Card";
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header";
import PostSerivce from "./API/PostService";

export default function App() {
  const [items, setItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false)
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function fetchSneakers() {
      const sneakers = await PostSerivce.getSneakers();
      setItems(sneakers);
    }

    fetchSneakers();
  }, [])

  function onAddToCart(obj) {
    console.log(obj)
    setCartItems([...cartItems, obj]);
  }

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} />}
      <Header onClickCart={() => setCartOpened(true)} />

      <div className='content p-40'>
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input type="text" placeholder="Search..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.map(data =>
            <Card
              key={data.id}
              title={data.title}
              price={data.price}
              imageUrl={data.imageUrl}
              onPlus={onAddToCart}
            />
          )}
        </div>

      </div>
    </div>
  )
}