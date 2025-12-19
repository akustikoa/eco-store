import { useCart } from './UseCart';
const Cart = () => {
  const { cart, removeFromCart, addToCart } = useCart();
  const total = cart.reduce(
    (sum, producte) => sum + producte.price * producte.quantity || 1,
    0
  );

  const totalCO2 = cart.reduce((sum, producte) => {
    const co2Value = parseFloat(producte.co2Saved.replace('kg', '').trim());
    return sum + (co2Value * producte.quantity || 1);
  }, 0);

  const totalWater = cart.reduce((sum, producte) => {
    const waterValue = parseFloat(producte.waterSaved.replace('L', '').trim());
    return sum + (waterValue * producte.quantity || 1);
  }, 0);

  return (
    <div className='cart'>
      <h2>
        Cart <i className='fa-solid fa-cart-shopping'></i>
      </h2>

      {cart.length === 0 ? (
        <p className='message-empty'>El carret de compra està buit...</p>
      ) : (
        <>
          <div className='cart-items'>
            {cart.map((product) => (
              <div key={product.id} className='cart-item'>
                <div className='cart-item-left'>
                  <img src={product.image} alt={product.title} width='50' />
                  <div>
                    <h4>{product.title}</h4>
                    <p className='productCard-co2Saved'>
                      CO2 Saved: {product.co2Saved}
                    </p>
                    <p className='productCard-waterSaved'>
                      Water Saved: {product.waterSaved}
                    </p>
                    <p>Price: {product.price}€</p>
                  </div>
                </div>
                <div className='cart-item-right'>
                  <div className='cart-quantity'>
                    <button onClick={() => removeFromCart(product.id)}>
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button onClick={() => addToCart(product)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='cart-summary'>
            <h4>
              Total Price: <span> {total.toFixed(2)}€</span>
            </h4>
            <h4>
              Total CO2 Saved:{' '}
              <span>
                {' '}
                {totalCO2.toFixed(2)}Kg{' '}
                <i className='fa-solid fa-leaf green-leaf'></i>
              </span>
            </h4>
            <h4>
              Total Water Saved:{' '}
              <span>
                {' '}
                {totalWater.toFixed(2)}L{' '}
                <i className='fa-solid fa-leaf green-leaf'></i>
              </span>
            </h4>
            <button className='checkout-btn'>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
