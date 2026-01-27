import { useEffect, useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { CartProvider } from './context/CartContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';
import { enhanceProductWithEcoData } from './utils/productUtils';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Favorites from './Components/Favorites';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useLocalStorage('favorites', []); //import from hooks([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [ecoScoreFilter, setEcoScoreFilter] = useState('all');

  useEffect(() => {
    async function fetchedProducts() {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) {
          throw new Error(`Http Error ${res.status}`);
        }
        const data = await res.json();
        const enhancedData = data.map(enhanceProductWithEcoData);
        setProducts(enhancedData);
      } catch (error) {
        console.error('Error fetching products', error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchedProducts();
  }, []);

  // Filtar productes
  const filteredProducts = products.filter((product) => {
    if (categoryFilter !== 'all' && product.category !== categoryFilter) {
      return false;
    }

    if (ecoScoreFilter !== 'all') {
      //agafem la primera lletra del product
      const productFirstLetter = product.ecoScore.charAt(0).toLowerCase();

      // forcem minuscules al filter usuari
      const filterFirstLetter = ecoScoreFilter.toLowerCase();

      //comparem
      if (productFirstLetter !== filterFirstLetter) {
        return false;
      }
    }
    return true;
  });

  const addToFavorites = (product) => {
    const existingProduct = favorites.find((item) => item.id === product.id);
    if (existingProduct) {
      return;
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  return (
    <CartProvider>
      <BrowserRouter>
        <Header
          categoryfilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          ecoScoreFilter={ecoScoreFilter}
          setEcoScoreFilter={setEcoScoreFilter}
        />
        <Routes>
          <Route
            path='/'
            element={
              <ProductList
                products={filteredProducts}
                favorites={favorites}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                isLoading={isLoading}
              />
            }
          />
          <Route path='/cart' element={<Cart />} />
          <Route
            path='/favorites'
            element={
              <Favorites
                favorites={favorites}
                removeFromFavorites={removeFromFavorites}
              />
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
};
export default App;
