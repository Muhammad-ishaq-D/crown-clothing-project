import React, { useContext } from 'react'
import './checkoutStyles.scss'
import { CartContext } from '../../context/cartContext'
import CheckoutItem from '../../components/chectoutItem/checkoutItemComp';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../store/cart/cartSelector';
import PaymentForm from '../../components/paymentForm/paymentFormComp';

export default function Checkout() {
    // const { cartItems, cartTotal } = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

  return (
    <div className='checkout-container'>
     <div className='checkout-header'>
        <div className='header-block'>
            <span>Product</span>
        </div>
        <div className='header-block'>
            <span>description</span>
        </div>
        <div className='header-block'>
            <span>Quantity</span>
        </div>
        <div className='header-block'>
            <span>Price</span>
        </div>
        <div className='header-block'>
            <span>Remove</span>
        </div>
    </div>
            {
                cartItems.map((cartItem) => 
                    <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                )
            }
            <span className='total'>TOTAL: ${cartTotal}</span>
            <PaymentForm />
        </div>
  )
}
