import { useCart } from './UseCart';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = ({
  categoryFilter,
  ecoScoreFilter,
  setCategoryFilter,
  setEcoScoreFilter,
}) => {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  // Tancar menú
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // marge superior obrir tancar menu responsive
  useEffect(() => {
    const content =
      document.querySelector('.product-list') ||
      document.querySelector('main') ||
      document.body;

    if (menuOpen) {
      const nav = document.querySelector('nav');
      const menuHeight = nav ? nav.offsetHeight : 250;
      content.style.marginTop = `${menuHeight + 100}px`;
    } else {
      content.style.marginTop = '';
    }

    return () => {
      content.style.marginTop = '';
    };
  }, [menuOpen]);

  const totalCartItems = cart.reduce(
    (acc, producte) => acc + (producte.quantity || 1),
    0,
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

  // Funció per manejar els canvis als selects (que també tanqui el menú)
  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    closeMenu(); // Tanca el menú quan canvies categoria
  };

  const handleEcoScoreChange = (e) => {
    setEcoScoreFilter(e.target.value);
    closeMenu(); // Tanca el menú quan canvies EcoScore
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const nav = document.querySelector('nav');
      const menuToggle = document.querySelector('.menu-toggle');

      if (
        menuOpen &&
        nav &&
        !nav.contains(event.target) &&
        menuToggle &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <header>
        <Link to='/' className='logo-link'>
          <h1 className='title'>
            <i className='fa-solid fa-leaf green-leaf leaf-header'></i> ECO
            STORE
          </h1>
        </Link>

        {/* Menu responsive */}
        <Link to='/' className='mobile-home'>
          <i className='cart-responsive fa-solid fa-home'></i>
        </Link>

        <Link to='/cart' className='mobile-cart-count'>
          <i className='cart-responsive fa-solid fa-cart-shopping'></i>
          {totalCartItems > 0 && (
            <span className='cart-count'> {totalCartItems}</span>
          )}
        </Link>

        {/* hamburger menu */}
        <button
          className='menu-toggle'
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label='Toggle menu'
        >
          <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </button>

        {/* Menu hidden by default*/}
        <nav className={menuOpen ? 'active' : ''}>
          <div className='filter-container'>
            <select value={categoryFilter} onChange={handleCategoryChange}>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className='filter-container'>
            <select value={ecoScoreFilter} onChange={handleEcoScoreChange}>
              {ecoScoreGroups.map((group) => (
                <option key={group.value} value={group.value}>
                  {group.label}
                </option>
              ))}
            </select>
          </div>

          <Link to='/' className='header-btn' onClick={closeMenu}>
            Home
          </Link>

          <Link to='/cart' className='header-btn' onClick={closeMenu}>
            Cart
          </Link>

          <div
            className='cart-icon'
            onClick={closeMenu}
            style={{ cursor: 'pointer' }}
          >
            <Link to='/cart' className='cart-count-header-desktop'>
              <i className='fa-solid fa-cart-shopping'></i>
              <span className='cart-count'> {totalCartItems}</span>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
