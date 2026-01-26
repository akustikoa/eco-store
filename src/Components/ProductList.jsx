import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { useState } from 'react';
const ProductList = ({
  products,
  favorites,
  addToFavorites,
  removeFromFavorites,
}) => {
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
        {products.length === 0 ? (
          <p className='message-empty'>No products found</p>
        ) : (
          <>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onProductClick={handleProductClick}
                favorites={favorites}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                isFavorite={favorites.some((fav) => fav.id === product.id)}
              />
            ))}
          </>
        )}
      </div>
      {selectedProduct !== null && (
        <ProductModal product={selectedProduct} onClose={onClose} />
      )}
    </>
  );
};

export default ProductList;
