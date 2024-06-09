import Card from "../components/Card/Card";
import data from '../server/db.json'

export default function Home({
  items,
  cartItems,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading
}) {

  function renderItems() {
    const filtredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    return (isLoading ? [...Array(10)] : filtredItems)
      .map((item, index) =>
        <Card
          key={index}
          onFavorite={(obj) => onAddToFavorite(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          added={cartItems.some(obj => Number(obj.id) === Number(item.id))}
          loading={isLoading}
          {...item}
        />
      )
  }

  return (
    <div className='content p-40'>
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue
          ? `Поиск по запросу: ${searchValue}`
          : `Все кроссовки`
        }</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && <img onClick={() => setSearchValue('')} className='clear cu-p' src="/img/btn-remove.svg" alt="Clear" />}
          <input onChange={onChangeSearchInput} value={searchValue} type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {renderItems()}
      </div>

    </div>
  )
}