import cl from './DrawerStyles/Drawer.module.css'

export default function Drawer({ onClose, onRemove, items = [] }) {
  return (
    <div className={cl.overlay} onClick={onClose}>
      <div className={cl.drawer} onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-30 d-flex justify-between">
          Корзина <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Remove" />
        </h2>

        {
          items.length > 0 ? (
            <div>
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
          ) : (
            <div className="cartEmpty d-flex align-center justify-center flex-column flex">
              <img className="mb-20" width={120} height={120} src="/img/empty-cart.png" alt="Empty cart" />
              <h2>Корзина пустая</h2>
              <p className="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
              <button onClick={onClose} className="greenButton">
                <img src="/img/arrow.svg" alt="Arrow" />Вернуться назад
              </button>
            </div>
          )
        }


      </div>
    </div>
  )
}