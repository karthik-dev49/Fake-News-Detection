import './Auth.css'

import React from 'react'
import { Link } from 'react-router-dom'
import { Signup } from '../components/auth/Signup';
import { Login } from '../components/auth/Login';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
export const Auth = () => {
  const [boollogState, setboolLogState] = React.useState(false);

  const validateUser = () => {
    const storedUserName = sessionStorage.getItem("userName") || "";
          if(storedUserName!=="Guest" && storedUserName!==""){
            alert("You will be logged in with previous user session as "+storedUserName + " . If you want to use as Guest, please logout and try again.");
          }
  };
  const handleSignupSuccess = () => {
    // Set logState to false when registration is successful
    setboolLogState(false);
  };
  return (
    <>
      <Header
        title="Major Project - Fake News Detection App"
      />
      <div className="registrationBoxes">
        <div className="logBox">
          {boollogState ? (
            <div>
              <Signup onSignupSuccess={handleSignupSuccess} />
              <div className="route-container">
                <p>Already Have Account</p>
                {/* <Link to="/auth/login" className="go-to-link">
                Login
              </Link> */}
                <div
                  className="go-to-link"
                  onClick={() => setboolLogState(false)}
                >
                  Login
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Login />
              <div className="route-container">
                <p>Create an Account</p>
                {/* <Link to="/auth/register" className="go-to-link">
                Signup
              </Link> */}
                <div
                  className="go-to-link"
                  onClick={() => setboolLogState(true)}
                >
                  Signup
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="guest-user">
          <Link to="/home" onClick={() => validateUser()}>
            Use as Guest
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
