import React, { useContext, useEffect, useState } from 'react';
import Card from '../components/Card/Card';
import axios from 'axios';
import { AppContext } from '../context';

const Orders = () => {
  const { onAddToFavorite, onAddToCart } = useContext(AppContext)
  const [orders, setOrders] = useState([]);
  // нельзя юзать лоад. App.jsx
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.get('http://localhost:3001/orders')
        setOrders(data.map(obj => obj.items).flat());
        // setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
      })();
    } catch (e) {
      console.log('Orders', e)
    } finally {
      setIsLoading(false);
    }
  }, [])

  return (
    <div className='content p-40'>
      <div className="d-flex align-center justify-between mb-40">
        <h1>My orders</h1>
      </div>

      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(10)] : orders)
          .map((item, index) =>
            <Card
              key={index}
              loading={isLoading}
              {...item}
            />
          )}
      </div>

    </div>
  );
};

export default Orders;