import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context'
import useMath from './hooks/useCart'
import useCart from './hooks/useCart'

export default function Header({ onClickCart }) {
  const { totalPrice } = useCart()

  return (
    <header className="d-flex justify-between align-center p-40">

      <Link to='/'>
        <div className='d-flex align-center'>
          <img style={{ width: 40, height: 40 }} src="/img/header-logo.png" alt="HeaderLogo" />

          <div>
            <h3 className="text-uppercase">REACT SNEAKERS</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>

      <ul className='d-flex'>
        <li className="mr-30 cu-p" onClick={onClickCart}>
          <img style={{ width: 18, height: 18 }} src="/img/cart.svg" alt="Cart" />
          <span>{totalPrice} rub.</span>
        </li>

        <Link to='/favorites'>
          <li className="mr-20 cu-p">
            <img syle={{ width: 18, height: 18 }} src="/img/heart.svg" alt="Favorites" />
          </li>
        </Link>

        <Link to='/orders'>
          <li className="mr-20 cu-p">
            <img syle={{ width: 18, height: 18 }} src="/img/user.svg" alt="User" />
          </li>
        </Link>

      </ul>


    </header>
  )
}