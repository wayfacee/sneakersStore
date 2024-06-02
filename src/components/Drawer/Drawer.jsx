import cl from './DrawerStyles/Drawer.module.css'

export default function Drawer() {
  return (
    <div style={{ display: 'none' }} className={cl.overlay}>
      <div className={cl.drawer}>
        <h2 className="mb-30 d-flex justify-between">
          Корзина <img className="cu-p" src="/img/btn-remove.svg" alt="Remove" />
        </h2>

        <div className={cl.items}>
          <div className="cartItem d-flex align-center mb-20">
            <div style={{ backgroundImage: 'url(/img/sneakers-1.jpg)' }} className={cl.cartItemImg}></div>
            <div className="mr-20 flex">
              <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 rub.</b>
            </div>
            <img className={cl.removeBtn} src="/img/btn-remove.svg" alt="Remove" />
          </div>


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