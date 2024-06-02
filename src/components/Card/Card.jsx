import cl from './CardStyles/Card.module.css'
import cardData from '../../data/cardData.json'
import { useEffect, useState } from 'react'


export default function Card({ title, price, imageUrl }, props) {
  const [isAdded, setIsAdded] = useState(false);

  function add() {
    setIsAdded(!isAdded);
  }


  return (
    <div key={price} className={cl.card}>
      <div className={cl.favorite}>
        <img src="/img/heart-unliked.svg" alt="Unliked" />
      </div>

      <img width={133} height={112} src={imageUrl} alt={title} />
      <h5 className='mb-15'>{title}</h5>

      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Price:</span>
          <b>{price}</b>
        </div>

        <img
          onClick={add}
          className={cl.plus}
          src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
          alt="Plus" />
      </div >
    </div>
  )
}