import cl from './CardStyles/Card.module.css'
import ContentLoader from "react-content-loader"
import { useContext, useState } from 'react'
import { AppContext } from '../../context';

export default function Card({
  id,
  title,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false
}) {
  const { isItemAdded } = useContext(AppContext)
  const [isFavorite, setIsFavorite] = useState(favorited)
  const obj = { id, title, imageUrl, price };

  function add() {
    onPlus(obj);
  }

  function favorite() {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  }

  return (
    <div key={price} className={cl.card}>
      {
        loading ? (
          <ContentLoader
            speed={2}
            width={150}
            height={195}
            viewBox="0 0 150 195"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
            <rect x="0" y="100" rx="5" ry="5" width="150" height="15" />
            <rect x="0" y="120" rx="5" ry="5" width="100" height="15" />
            <rect x="0" y="169" rx="5" ry="5" width="80" height="25" />
            <rect x="116" y="162" rx="10" ry="10" width="32" height="32" />
          </ContentLoader>
        ) : (
          <>
            {onFavorite && <div className={cl.favorite} onClick={favorite}>
              <img onClick={() => setIsFavorite(!isFavorite)} src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'} />
            </div>}

            <img src={imageUrl} width='100%' height={135} alt={title} />
            <h5 className='mb-15'>{title}</h5>

            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Price:</span>
                <b>{price}</b>
              </div>

              {onPlus && <img
                onClick={add}
                className={cl.plus}
                src={isItemAdded(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
                alt="Plus" />}
            </div >
          </>
        )
      }

    </div>
  )
}