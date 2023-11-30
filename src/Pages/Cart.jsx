import React from 'react';
import { useCart } from '../Context/CartContext';
import './css/Cart.css'

const Cart = () => {
  const { cartState, dispatch } = useCart();

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div className='cart-page'>
      <h1 className='cart-page-title'>Twój Koszyk: </h1>
      {cartState.items.length === 0 ? (
        <p>Koszyk jest pusty.</p>
      ) : (
        <ul>
          {cartState.items.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} -{item.price} zł
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
