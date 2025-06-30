import { createContext, useEffect, useState, useReducer } from "react";
import { createUserDocumentFromAuth, onAuthChangeListner, signOutUser } from "../utils/firebase/firebaseUtils";
import { createAction } from "../utils/reducer/reducer";

export const UserContext = createContext({      
  setCurrentUser: () => null,  // Placeholder function
  currentUser: null            // Default value before user logs in
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER:'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch(type){
    case USER_ACTION_TYPES.SET_CURRENT_USER:
     return{
      ...state,
      currentUser: payload
     }
    default:
      throw new Error(`unhandled type ${type} in userReducer`);
      
  }
}

const INITIAL_STATE = {
  currentUser: null
}

export const UserProvider = ({ children }) => {

  // const [currentUser, setCurrentUser] = useState(null);    
   
  const [ state, dispatch ] = useReducer(userReducer, INITIAL_STATE);
 
  const { currentUser } = state;
  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
  }
  const value = { currentUser, setCurrentUser };    
  
  // signOutUser();
  
  useEffect(() => {     
    const unsubscribe = onAuthChangeListner((user) => {
      // console.log(user)
      if(user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
        });

    return unsubscribe;
  }, []);

  return (

    <UserContext.Provider value={value}>
      {children}  {/* Render all nested components inside this provider */}
    </UserContext.Provider>
  )
};
