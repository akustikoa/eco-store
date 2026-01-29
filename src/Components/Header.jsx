import { useCart } from './UseCart';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const Header = ({
  categoryFilter,
  ecoScoreFilter,
  setCategoryFilter,
  setEcoScoreFilter,
}) => {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Ref Cart
  const cartIconMobileRef = useRef(null);
  const cartIconDesktopRef = useRef(null);
  const prevCartItemsRef = useRef(0);

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

  useEffect(() => {
    if (
      prevCartItemsRef.current !== 0 &&
      totalCartItems > prevCartItemsRef.current
    ) {
      cartIconMobileRef.current?.classList.add('cart-animation');
      cartIconDesktopRef.current?.classList.add('cart-animation-desk');

      setTimeout(() => {
        cartIconMobileRef.current?.classList.remove('cart-animation');
        cartIconDesktopRef.current?.classList.remove('cart-animation-desk');
      }, 300);
    }
    prevCartItemsRef.current = totalCartItems;
  }, [totalCartItems]);

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

  // Selects
  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    closeMenu();
    navigate('/');
  };

  const handleEcoScoreChange = (e) => {
    setEcoScoreFilter(e.target.value);
    closeMenu();
    navigate('/');
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

        <Link to='/cart' className='mobile-cart-count' ref={cartIconMobileRef}>
          <i className='cart-responsive fa-solid fa-cart-shopping'></i>
          {totalCartItems > 0 && (
            <span className='cart-count'> {totalCartItems}</span>
          )}
        </Link>

        <Link to='/favorites' className='mobile-heart'>
          <i className='cart-responsive fa-solid fa-heart'></i>
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

          <Link to='/favorites' className='header-btn' onClick={closeMenu}>
            Favorites
          </Link>

          <div
            className='cart-icon'
            onClick={closeMenu}
            style={{ cursor: 'pointer' }}
          >
            <Link
              to='/cart'
              className='cart-count-header-desktop'
              ref={cartIconDesktopRef}
            >
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
