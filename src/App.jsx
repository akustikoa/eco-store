import { useEffect, useState } from 'react';
import { CartProvider } from './context/CartContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';
import { enhanceProductWithEcoData } from './utils/productUtils';
import Header from './Components/Header';
import Footer from './Components/Footer';

const App = () => {
  const [products, setProducts] = useState([]);

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [ecoScoreFilter, setEcoScoreFilter] = useState('all');

  useEffect(() => {
    async function fetchedProducts() {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        const enhancedData = data.map(enhanceProductWithEcoData);
        setProducts(enhancedData);
        console.log(enhancedData);
      } catch (error) {
        console.error('Error fetching products', error);
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
      //agafem la primera lletra
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
            element={<ProductList products={filteredProducts} />}
          />
          <Route path='/cart' element={<Cart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
};
export default App;
