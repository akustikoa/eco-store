import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { useState } from 'react';
const ProductList = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const onClose = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <div className='product-list'>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onProductClick={handleProductClick}
          />
        ))}
      </div>
      {selectedProduct !== null && (
        <ProductModal product={selectedProduct} onClose={onClose} />
      )}
    </>
  );
};

export default ProductList;
