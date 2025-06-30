import { confirmPasswordReset } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebaseUtils';
import FormInput from '../formInput/formInputComp';
import './signUpStyles.scss'
import Button from '../button/buttonComp';
import { useDispatch } from 'react-redux';
import { signUpSaga } from '../../store/user/userSaga';
// import { UserContext } from '../../context/userContext';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

export default function SignUpForm() {
    const dispatch = useDispatch();
    const [fromFields, setFormFields] = useState(defaultFormFields)
    const  { displayName, email, password, confirmPassword } = fromFields;

    // console.log(fromFields)

    // const { setCurrentUser } = useContext(UserContext)

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormFields({...fromFields, [name]: value});
    };

    const handleSubmit = async(e) => {             // Practise it.
        e.preventDefault();

        if(password !== confirmPassword){
            alert('passwords do not match')
            return;
        }

        try {
            // const  { user } = await createAuthUserWithEmailAndPassword(email, password)
            // await createUserDocumentFromAuth(user, { displayName })
            // setCurrentUser(user);
            // dispatch(signUpSaga(email, password, displayName))
            dispatch({
  type: 'user/signUp',
  payload: { email, password, displayName },
});
            resetFormFields();
            //  console.log(user)
        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use');
            }
            console.log('user creation enccoutered an error', error)
        }
    }

  return (
    <div className='sign-up-container'>
        <h2>Don't have an account?</h2>
        <span>Sign up with email and password</span>
        <form action="" onSubmit={handleSubmit}>
            <FormInput label='Name' type="text" required onChange={handleChange} name='displayName' value={displayName}/>
            <FormInput label='Email' type="email" required onChange={handleChange} name='email' value={email}/>
            <FormInput label='Password' type="password" required onChange={handleChange} name='password' value={password}/>
            <FormInput label='Confirm Password' type="password" required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>

            <Button type='submit'>Sign Up</Button>
        </form>
    </div>
  )
}
