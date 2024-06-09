import React from "react"
import { AppContext } from "../context"
import Card from "../components/Card/Card"

export default function Favoties({items, onAddToFavorite}) {
  // const { favorites, onAddToFavorite } = React.useContext(AppContext)

  return (
    <div className='content p-40'>
      <div className="d-flex align-center justify-between mb-40">
        <h1>My bookmarks</h1>
      </div>

      <div className="d-flex flex-wrap">
        {items.map(data =>
          <Card
            key={data.id}
            title={data.title}
            price={data.price}
            imageUrl={data.imageUrl}
            favorited={true}
            onFavorite={() => onAddToFavorite(data)}
          />
        )}
      </div>

    </div>
  )
}