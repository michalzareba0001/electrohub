import React from 'react';
import { useCart } from '../Context/CartContext';

const Cart = () => {
  const { cartState, dispatch } = useCart();

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div>
      <h2>Koszyk</h2>
      {cartState.items.length === 0 ? (
        <p>Koszyk jest pusty.</p>
      ) : (
        <ul>
          {cartState.items.map((item) => (
            <li key={item.id}>
              {item.name} - {item.price} zł
              <button onClick={() => removeFromCart(item)}>Usuń</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={clearCart}>Wyczyść koszyk</button>
    </div>
  );
};

export default Cart;
