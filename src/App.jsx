import { useEffect, useState } from 'react';
import ProductList from './Components/ProductList';
import { enhanceProductWithEcoData } from './utils/productUtils';

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
    <>
      <ProductList products={products} />
    </>
  );
};

export default App;
