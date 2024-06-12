import React, { useContext } from "react"
import { AppContext } from "../context"
import Card from "../components/Card/Card"

export default function Favorites() {
  const { favorites, onAddToFavorite } = useContext(AppContext)

  return (
    <div className='content p-40'>
      <div className="d-flex align-center justify-between mb-40">
        <h1>My bookmarks</h1>
      </div>

      <div className="d-flex flex-wrap">
        {favorites.map(favorite =>
          <Card
            key={favorite.id}
            favorited={true}
            onFavorite={() => onAddToFavorite(favorite)}
            {...favorite}
          />
        )}
      </div>

    </div>
  )
}