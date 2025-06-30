import React from 'react'
import { useEffect } from "react";
import { createUserDocumentFromAuth, getCurrentUser, onAuthChangeListner, signOutUser } from "./utils/firebase/firebaseUtils";
import { Routes,Route } from 'react-router'
import Home from './routes/home/homeComponent'
import Navigation from './routes/navigation/navComponent'
import Authentication from './routes/authentication/authenticationComp'
import Shop from './routes/shop/shopComp'
import CartIcon from './components/cart/icon/cartIconComp'
import Checkout from './routes/checkout/checkoutComp'
// import { checkUserSession, setCurrentUser } from './store/user/userAction';
import { useDispatch } from 'react-redux';
import { checkUserSessionSaga } from './store/user/userSaga';



export default function App() {
  const dispatch = useDispatch();
  
    // useEffect(() => {     
    //   const unsubscribe = onAuthChangeListner((user) => {
    //     // console.log(user)
    //     if(user) {
    //       createUserDocumentFromAuth(user);
    //     }
    //     dispatch(setCurrentUser(user));
    //       });
  
    //   return unsubscribe;
    // }, []);

useEffect(() => {     
  dispatch({ type: 'user/checkUserSession' });
}, []);
  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Navigation/>}>         {/* Main Route */} 
         <Route index element={<Home />} />               {/* Nested Routes */}       
         <Route path='shop/*' element={<Shop />} />
         <Route path='auth' element={<Authentication />} /> 
         <Route path='cart-icon' element={<CartIcon />} />  
         <Route path='checkout' element={<Checkout />} />  
        </Route>
      </Routes>
    </div>
  )
}


