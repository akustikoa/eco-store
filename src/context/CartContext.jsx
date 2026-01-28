import { useEffect } from 'react';
import { createContext, useState } from 'react';

const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('ecoStoreCart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error carregant cart:', error);
      return [];
    }
  });

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        } else {
          return item;
        }
      });
      setCart(updatedCart);
    } else {
      setCart([{ ...product, quantity: 1 }, ...cart]);
    }
  };

  const removeFromCart = (id) => {
    const existingProduct = cart.find((item) => item.id === id);
    if (!existingProduct) return;
    if (existingProduct.quantity === 1) {
      const confirmDelete = window.confirm(
        'Are you sure you want to remove this product?',
      );

      if (confirmDelete) {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
      }
    } else {
      const updatedCart = cart.map((item) => {
        if (item.id == id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      setCart(updatedCart);
    }
  };

  const removeAllFromCart = (id) => {
    const existingProduct = cart.filter((item) => item.id !== id);
    setCart(existingProduct);
  };

  useEffect(() => {
    try {
      localStorage.setItem('ecoStoreCart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error guardant cart:', error);
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, removeAllFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
