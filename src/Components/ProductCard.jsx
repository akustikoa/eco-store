import { useCart } from './UseCart';
const ProductCard = ({
  id,
  description,
  title,
  price,
  image,
  ecoScore,
  co2Saved,
  waterSaved,
  onProductClick,
  favorites,
  showToast,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
}) => {
  const { cart, addToCart, removeFromCart } = useCart(); //import from context

  //create product object
  const product = {
    id,
    description,
    title,
    price,
    image,
    ecoScore,
    co2Saved,
    waterSaved,
  };

  const productInCart = cart.find((item) => item.id === id);
  const productInCartQuantity = productInCart ? productInCart.quantity : 0;

  return (
    <div className='productCard'>
      <div onClick={() => onProductClick(product)} className='btnProductClick'>
        <div className='productCard-imgWrapper'>
          <img
            className='productCard-img'
            src={image}
            alt={title}
            loading='lazy'
          />
        </div>
        <h3 className='productCard-title '>{title}</h3>
      </div>
      <div className='productCard-info'>
        <p className='productCard-co2Saved'>
          CO2 Saved: {co2Saved} <i className='fa-solid fa-leaf green-leaf'></i>
        </p>
        <p className='productCard-waterSaved'>
          Water Saved: {waterSaved}{' '}
          <i className='fa-solid fa-droplet blue-droplet'></i>
        </p>
        <p className='productCard-price'>{price.toFixed(2)}€ </p>
        <div className='productCard-footer'>
          <div className='productCard-footer-left'>
            <p className='productCard-ecoScore'>
              <i className='fa-solid fa-leaf green-leaf'></i> {ecoScore}
            </p>
          </div>
          <div className='productCard-footer-right'>
            <button
              className='productCard-addToCart'
              onClick={() => {
                addToCart(product);
                showToast('Added to cart');
              }}
            >
              <i className='fa-solid fa-cart-plus'></i>
              {productInCartQuantity > 0 && (
                <span className='cart-count'> {productInCartQuantity}</span>
              )}
            </button>
            <button
              className='productCard-removeFromCart'
              onClick={() => {
                removeFromCart(product.id);
                showToast('Removed from cart');
              }}
            >
              <i className='fa-regular fa-trash-can'></i>
            </button>
            <button
              className='productCard-heart'
              onClick={() => {
                if (isFavorite) {
                  removeFromFavorites(id);
                  showToast('Removed from favorites');
                } else {
                  addToFavorites(product);
                  showToast('Added to favorites');
                }
              }}
            >
              {isFavorite ? (
                <i className='fa-solid fa-heart green-heart'></i>
              ) : (
                <i className='fa-regular fa-heart '></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
