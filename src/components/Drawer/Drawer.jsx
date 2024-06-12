import { useContext, useState } from 'react'
import Info from '../Info'
import cl from './DrawerStyles/Drawer.module.css'
import { AppContext } from '../../context'
import db from '../../server/db.json'
import axios from 'axios';
import useCart from '../hooks/useCart'

// const delay = (ms) => new Promise((res) => setTimeout(res, ms))
export default function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart()
  const [orderId, setOrderId] = useState(null)
  const [isOrderComplete, setIsOrderComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function onClickOrder() {
    try {
      setIsLoading(true);
      const { data } = await axios.post('http://localhost:3001/orders', {
        items: cartItems,
      })
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`http://localhost:3001/cart/${item.id}`)
      }
    } catch (e) {
      console.log('onClickOrder', e);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`${cl.overlay} ${opened ? cl.overlayVisible : ''}`} onClick={onClose}>
      <div className={cl.drawer} onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-30 d-flex justify-between">
          Корзина <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Remove" />
        </h2>

        {
          items.length > 0 ? (
            <div className='d-flex flex-column flex'>
              <div className={cl.items}>
                {items.map((item) =>
                  <div key={item.id} className="cartItem d-flex align-center mb-20">
                    <div style={{ backgroundImage: `url(${item.imageUrl})` }} className='cartItemImg'></div>
                    <div className="mr-20 flex">
                      <p className="mb-5">{item.title}</p>
                      <b>{item.price}</b>
                    </div>
                    <img onClick={() => onRemove(item.id)} className='removeBtn' src="/img/btn-remove.svg" alt="Remove" />
                  </div>
                )}
              </div>

              <div className='cartTotalBlock'>
                <ul>
                  <li>
                    <span>Итого:</span>
                    <div></div>
                    <b>{totalPrice} rub. </b>
                  </li>

                  <li>
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>{Math.round(totalPrice / 100 * 5)} rub. </b>
                  </li>
                </ul>

                <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /></button>
              </div>
            </div>
          ) : (
            <Info
              title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
              description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
              image={isOrderComplete ? '/img/complete-order.png' : '/img/empty-cart.png'}
            />
          )
        }


      </div>
    </div>
  )
}