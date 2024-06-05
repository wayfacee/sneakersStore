export default function Header({onClickCart}) {
  return (
    <header className="d-flex justify-between align-center p-40">

      <div className='d-flex align-center'>
        <img style={{ width: 40, height: 40 }} src="/img/header-logo.png" alt="HeaderLogo" />

        <div>
          <h3 className="text-uppercase">REACT SNEAKERS</h3>
          <p className="opacity-5">Магазин лучших кроссовок</p>
        </div>
      </div>


      <ul className='d-flex'>
        <li className="mr-30 cu-p" onClick={onClickCart}>
          <img style={{ width: 18, height: 18 }} src="/img/cart.svg" alt="cart" />
          <span>1205 rub.</span>
        </li>

        <li>
          <img syle={{ width: 18, height: 18 }} src="/img/user.svg" alt="user" />
        </li>
      </ul>


    </header>
  )
}