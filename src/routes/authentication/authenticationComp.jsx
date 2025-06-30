import React from "react";
import './authenticationStyles.scss'
import SignInForm from "../../components/signInForm/signInFormComp";
import SignUpForm from "../../components/signUpForm/signUpFormComp";


export default function Authentication() {

  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
}
