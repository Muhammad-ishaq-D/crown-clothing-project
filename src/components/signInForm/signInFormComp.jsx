import React, { useContext, useState } from 'react'
import { signInWithGooglePopup, 
         createUserDocumentFromAuth, 
         signInAuthUserWithEmailAndPassword 
    } from '../../utils/firebase/firebaseUtils';

import FormInput from '../formInput/formInputComp';
import './signInStyles.scss'
import Button, { BUTTON_TYPE_CLASSES } from '../button/buttonComp';
import { useDispatch } from 'react-redux';
import { signInWithGoogleSaga } from '../../store/user/userSaga';
// import { emailSignInStart, googleSignInStart } from '../../store/user/userAction';
// import { UserContext } from '../../context/userContext';

const defaultFormFields = {
    email: '',
    password: '',
} 

export default function SignInForm() {
    const dispatch = useDispatch();
    const [fromFields, setFormFields] = useState(defaultFormFields)
    const  { email, password, } = fromFields;

    // console.log(fromFields)

    // const { setCurrentUser } = useContext(UserContext)

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    };

      const signInWithGoogle = async () => {
        //   const { user } = await signInWithGooglePopup();
        //   await createUserDocumentFromAuth(user)
        // signInWithGooglePopup();
        dispatch({ type: 'user/signInWithGoogle' });
      };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormFields({...fromFields, [name]: value});
    };

    const handleSubmit = async(e) => {             // Practise it.
        e.preventDefault();
   
        try {
            // const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            // dispatch(emailSignInStart(email, password));
              e.preventDefault();
                dispatch({
                   type: 'user/signInWithEmail',
                   payload: { email, password },
                        });

            resetFormFields();
            // setCurrentUser(user); 
            // console.log(user) 
        } catch (error) {
            switch(error.code){
              case 'auth/wrong-password':
              alert('Incorrect password for email');
              break;
              case 'auth/user-not-found':
              alert('no user associated with this email');
              break;
              default:
                console.log(error);
            }
        }
    };

  return (
    <div className='sign-up-container'>
        <h2>Already have an account?</h2>
        <span>Sign in with email and password</span>
        <form action="" onSubmit={handleSubmit}>
            <FormInput label='Email' type="email" required onChange={handleChange} name='email' value={email}/>
            <FormInput label='Password' type="password" required onChange={handleChange} name='password' value={password}/>
            <div className='buttons-container'>
            <Button type='submit'>Sign In</Button>
            <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign in</Button>
            </div>
        </form>
    </div>
  )
}
