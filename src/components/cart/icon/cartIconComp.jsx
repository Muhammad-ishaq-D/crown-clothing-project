import React, { useContext } from 'react'
import { CartContext } from '../../../context/cartContext'
import { CartIconContainer, ShoppingIcon, ItemCount } from './cartIconStyles';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount, selectCartIsOpen } from '../../../store/cart/cartSelector';
import { setIsCartOpen } from '../../../store/cart/cartAction';


export default function CartIcon() {
  // const { isCartOpen, setIsCartOpen,cartCount } = useContext(CartContext);
   const isCartOpen = useSelector(selectCartIsOpen);
   const cartCount = useSelector(selectCartCount);
   const dispatch = useDispatch();
 
    const toggleIsCartOpen = () => {
    dispatch(setIsCartOpen(!isCartOpen));
    console.log('isCartOpen:', !isCartOpen); // Verify the state is updating
  };

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount className='item-count'>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}
