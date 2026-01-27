import { useCart } from './UseCart';

const Favorites = ({ favorites, removeFromFavorites }) => {
  const { addToCart } = useCart();

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
              <div key={product.id} className='cart-item cart-item-favorites'>
                <div className='cart-item-left'>
                  <img src={product.image} alt={product.title} width='50' />
                  <div>
                    <h4>{product.title}</h4>
                    <p className='cart-item-price'>
                      Price: {product.price.toFixed(2)}€
                    </p>
                    <div className='cart-item-favorites-buttons'>
                      <button
                        className='productCard-addToCart'
                        onClick={() => {
                          addToCart(product);
                        }}
                      >
                        <i className='fa-solid fa-cart-plus'></i>
                      </button>
                      <button
                        className='trash-cart'
                        onClick={() => removeFromFavorites(product.id)}
                      >
                        <i className='fa-regular fa-trash-can'></i>
                      </button>
                    </div>
                  </div>
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
