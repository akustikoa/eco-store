import { useEffect, useState } from 'react';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';
import { enhanceProductWithEcoData } from './utils/productUtils';
import Header from './Components/Header';
import { CartProvider } from './context/CartContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  const [products, setProducts] = useState([]);

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
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<ProductList products={products} />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};
export default App;
