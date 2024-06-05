import cl from './DrawerStyles/Drawer.module.css'

export default function Drawer({ onClose, items = [] }) {
  return (
    <div className={cl.overlay} onClick={onClose}>
      <div className={cl.drawer} onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-30 d-flex justify-between">
          Корзина <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Remove" />
        </h2>

        <div className={cl.items}>
          {items.map(item =>
            <div key={item.id} className="cartItem d-flex align-center mb-20">
              <div style={{ backgroundImage: `url(${item.imageUrl})` }} className={cl.cartItemImg}></div>
              <div className="mr-20 flex">
                <p className="mb-5">{item.title}</p>
                <b>{item.price}</b>
              </div>
              <img className={cl.removeBtn} src="/img/btn-remove.svg" alt="Remove" />
            </div>
          )}
        </div>

        <div className='cartTotalBlock'>
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>21 498 rub. </b>
            </li>

            <li>
              <span>Налог 5%:</span>
              <div></div>
              <b>1074 rub. </b>
            </li>
          </ul>

          <button className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /></button>
        </div>
      </div>
    </div>
  )
}