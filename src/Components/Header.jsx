import { useCart } from './UseCart';
import { Link } from 'react-router-dom';

const Header = ({
  categoryFilter,
  ecoScoreFilter,
  setCategoryFilter,
  setEcoScoreFilter,
}) => {
  const { cart } = useCart();
  const totalItems = cart.reduce(
    (acc, producte) => acc + (producte.quantity || 1),
    0
  );

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: "women's clothing", label: "Women's clothing" },
    { value: "men's clothing", label: "Men's clothing" },
    { value: 'jewelery', label: 'Jewelery' },
    { value: 'electronics', label: 'Electronics' },
  ];

  const ecoScoreGroups = [
    { value: 'all', label: 'All EcoScores' },
    { value: 'A', label: 'EcoScore A (A, A+, A++)' },
    { value: 'B', label: 'EcosScore B (B, B+)' },
    { value: 'C', label: 'EcoScore C (C, C+)' },
    { value: 'D', label: ' EcoScore D (D, D+)' },
  ];

  return (
    <>
      <header>
        <h1 className='Title'>
          <i className='fa-solid fa-leaf green-leaf'></i> ECO STORE
        </h1>

        <nav>
          <div className='filter-container'>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className='filter-container'>
            <select
              value={ecoScoreFilter}
              onChange={(e) => setEcoScoreFilter(e.target.value)}
            >
              {ecoScoreGroups.map((group) => (
                <option key={group.value} value={group.value}>
                  {group.label}
                </option>
              ))}
            </select>
          </div>

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
