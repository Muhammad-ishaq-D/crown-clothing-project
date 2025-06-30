import React, { useContext } from 'react'
import { Outlet, } from 'react-router'
import Logo from '../../assets/crown.svg'
import { signOutUser } from '../../utils/firebase/firebaseUtils'
// import { UserContext } from '../../context/userContext'
import { useDispatch, useSelector } from 'react-redux'
import CartIcon from '../../components/cart/icon/cartIconComp'
import CartDropdown from '../../components/cart/dropdown/dropdownComp'
import { CartContext } from '../../context/cartContext'
import { LogoContainer, NavigationContainer, NavLinks,  NavLink } from './navigationStyles'
import { selectCurrentUser } from '../../store/user/userSelector'
import { selectCartIsOpen } from '../../store/cart/cartSelector'
import { signOutSaga } from '../../store/user/userSaga'

export default function Navigation() {
  // const { currentUser, setCurrentUser } = useContext(UserContext);
  const currentUser = useSelector(selectCurrentUser);
  // const { isCartOpen } = useContext(CartContext)
  const isCartOpen = useSelector(selectCartIsOpen);
  const dispatch = useDispatch();
  // const signOutHandler = async () => {
  //   await signOutUser(); 
  //   setCurrentUser(null);
  // };
  
 const signOutUser = () => dispatch(dispatch({ type: 'user/signOut' }));

  return (
    <>
     <NavigationContainer>                   {/*  Using fragment it does not render on page  */}
       <LogoContainer to='/'>
       <img src={Logo} alt="logo" /> 
       </LogoContainer>
       <NavLinks>
        <NavLink to='/shop'>
        SHOP
       </NavLink>

       {
        currentUser ? (
          <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
         ) : ( 
        <NavLink to='/auth'>
        SIGN IN
        </NavLink>
        )
       } 
       
        <CartIcon />
        

       </NavLinks>
       {isCartOpen && <CartDropdown /> }
     </NavigationContainer>
       <Outlet />         {/* Use it to render the Nested router  */}
    </>
  )
}
