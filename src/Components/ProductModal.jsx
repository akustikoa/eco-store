const ProductModal = ({ product, onClose }) => {
  console.log('Modal rep', product);

  return (
    <div className='modal-container'>
      <div className='product-modal'>
        <button
          className='btn-close-modal'
          onClick={() => onClose()}
          aria-label='Close modal'
        >
          <i className='fa-solid fa-times '></i>{' '}
        </button>

        <h2>{product.title}</h2>
        <img src={product.image} alt={product.title} />
        <div className='eco-info'>
          <span>
            <i className='fa-solid fa-star yellow-star'></i> Eco-Score:{' '}
            {product.ecoScore}
          </span>
          <span>
            <i className='fa-solid fa-leaf green-leaf'></i> CO2 Saved:
            {product.co2Saved}
          </span>
          <span>
            <i className='fa-solid fa-droplet blue-droplet'></i> Water Saved:
            {product.waterSaved}
          </span>
        </div>
        <p className='description'>{product.description}</p>
        <p className='price'>{product.price.toFixed(2)} €</p>
      </div>
    </div>
  );
};

export default ProductModal;
