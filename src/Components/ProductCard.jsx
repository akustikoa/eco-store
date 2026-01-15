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
}) => {
  const { addToCart, removeFromCart } = useCart(); //importo funcions del context
  //creem el producte per passar-lo al Cart
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

  return (
    <div className='productCard'>
      <div className='productCard-imgWrapper'>
        <img
          className='productCard-img'
          src={image}
          alt={title}
          loading='lazy'
        />
      </div>
      <h3 className='productCard-title '>{title}</h3>
      <div className='productCard-info'>
        <p className='productCard-co2Saved'>CO2 Saved: {co2Saved}</p>
        <p className='productCard-waterSaved'>Water Saved: {waterSaved}</p>
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
              }}
            >
              <i className='fa-solid fa-cart-plus'></i>
            </button>
            <button
              className='productCard-removeFromCart'
              onClick={() => {
                removeFromCart(product.id);
              }}
            >
              <i className='fa-regular fa-trash-can'></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
