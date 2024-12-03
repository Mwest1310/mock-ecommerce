import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { calculateTotalAmount, clearAllCart, decrementQuantity, incrementQuantity, removeFromCart } from '../slices/cartSlice';

const Cart = () => {
    const { cartItems } = useSelector((state) => state.carts);
    const { cartTotalAmount } = useSelector((state) => state.carts);
    const dispatch = useDispatch();
    const handleClearCart = () => {
        dispatch(clearAllCart());
    }
    const handleRemoveItem = (cart) => {
        dispatch(removeFromCart(cart));
    }
    const handleIncrement = (cart) => {
        dispatch(incrementQuantity(cart));
    }
    const handleDecrement = (cart) => {
        dispatch(decrementQuantity(cart));
    }

    useEffect(() => {
        dispatch(calculateTotalAmount());
    }, [cartItems, dispatch]);

  return (
    <div id="cart" className="page">
        <h2>Shopping Cart</h2>
        <div className="cart-container">
            <div className="cart-div cart-left">
                
                <ul>
                {cartItems.map((cart) => {
                    return (
                        <li className="cart-item" key={cart.product._id}>
                            <div>
                                <img src={cart.product.image} />
                                <h3><a href="#">{cart.product.name}</a></h3>
                            </div>
                            <p>£{cart.product.price * cart.qty}</p>
                            <div>
                                <button className="qty" onClick={() => handleIncrement(cart)}>+</button>
                                <p>{cart.qty}</p>
                                <button className="qty" onClick={() => handleDecrement(cart)}>-</button>
                            </div>
                            <div>
                                <button className="delete" onClick={() => handleRemoveItem(cart)}><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                            
                        </li>
                    )
                })}
                    
                </ul>
            </div>
            <div className="cart-div cart-right">
                <div className="total">
                    <h3>Total</h3>
                    <h4>£{cartTotalAmount}</h4>
                </div>
                <button className="purchase" onClick={handleClearCart}>Purchase</button>
            </div>
        </div>
        
    </div>
  );
};

export default Cart;