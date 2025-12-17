import { useCart } from './UseCart';
import { Link } from 'react-router-dom';

const Header = () => {
  const { cart } = useCart();

  const totalItems = cart.reduce(
    (acc, producte) => acc + (producte.quantity || 1),
    0
  );

  return (
    <>
      <header>
        <h1 className='Title'>
          <i className='fa-solid fa-leaf green-leaf'></i> ECO STORE
        </h1>

        <nav>
          <Link to='/' className='header-btn'>
            Home
          </Link>
          <Link to='/cart' className='header-btn'>
            Cart
          </Link>
          <div className='cart-icon'>
            <i className='fa-solid fa-cart-shopping'></i>
            <span className='cart-count'> {totalItems}</span>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
