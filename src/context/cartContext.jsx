import React, { createContext, useReducer } from 'react'
import { createAction } from '../utils/reducer/reducer';

const addCartItem = (cartItems, productToAdd) => {

    // find if cartItems contains productToAdd
     const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    // if found, increment quantity

    if(existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id 
        ? { ...cartItem, quantity: cartItem.quantity + 1 } 
        : cartItem
    ); 
    }

    // return new array with modified cartItems/ new cart item.
   
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    //find the cart item to remove
      const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    //check if quantity is equal to 1, if it is remove that item from the cart
    if(existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }

    //return back cartItems with matching cart item with reduced quantity.
      return cartItems.map((cartItem) => 
            cartItem.id === cartItemToRemove.id 
        ? { ...cartItem, quantity: cartItem.quantity - 1 } 
        : cartItem
    ); 
}

const clearCartItem = (cartItems, cartItemToClear) => 
      cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);


export const CartContext = createContext({
     isCartOpen: false,
     setIsCartOpen: () => {},
     cartitems: [],
     additemToCart: () => {},
     removeItemToCart : () => {},
     clearItemFromCart: () => {},
     cartCount: 0,
     cartTotal: 0,
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN:'SET_IS_CART_OPEN',
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

const cartReducer = (state, action) => {
  const { type, paylaod } = action;

  switch(type){
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return{
      ...state,
      ...paylaod
    };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return{
      ...state,
      isCartOpen: paylaod
    }
    default:
      throw new Error(`unhandled type ${type} in cartReducer`);
  }
}

export function CartProvider({ children }) {
  //   const [isCartOpen, setIsCartOpen] = useState(false);
  //   const [cartItems, setCartItems] = useState([]);
  //   const [cartCount, setCartCount] = useState(0);
  //   const [cartTotal, setCartTotal] = useState(0);

  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  //   useEffect(() => {
  //     const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
  //     setCartCount(newCartCount);
  //   }, [cartItems]);

  //   useEffect(() => {
  //   const newCartTotal = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity * cartItem.price,0);
  //   setCartTotal(newCartTotal);
  // }, [cartItems]);   
  
  const updateCartItemsReduce = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)

    const newCartTotal = newCartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,0);

 dispatch(
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
    cartItems: newCartItems, 
    cartTotal: newCartTotal, 
    cartCount: newCartCount 
  }));
};  
    
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReduce(newCartItems);
    };

   
    
     const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReduce(newCartItems);
    };

     const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReduce(newCartItems);
    };

    const setIsCartOpen = (bool) => {
      dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
    }

    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        cartItems, 
        addItemToCart, 
        cartCount,
        removeItemToCart, 
        clearItemFromCart,
        cartTotal 
    };
  return (
    <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
  )
}
