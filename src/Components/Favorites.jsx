const Favorites = ({ favorites, removeFromFavorites }) => {
  return (
    <div className='cart'>
      <h2>
        Favorites <i className='fa-solid fa-heart'></i>
      </h2>

      {favorites.length === 0 ? (
        <p className='message-empty'>Favourites is empty</p>
      ) : (
        <>
          <div className='cart-items'>
            {favorites.map((product) => (
              <div key={product.id} className='cart-item'>
                <div className='cart-item-left'>
                  <img src={product.image} alt={product.title} width='50' />
                  <div>
                    <h4>{product.title}</h4>
                    <p className='cart-item-price'>
                      Price: {product.price.toFixed(2)}€
                    </p>
                    <button onClick={() => removeFromFavorites(product.id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
                <div className='cart-item-right'>
                  <button onClick={() => removeFromFavorites(product.id)}>
                    <i className='fa-regular fa-trash-can'></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
