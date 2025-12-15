import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  return (
    <div className='product-list'>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
