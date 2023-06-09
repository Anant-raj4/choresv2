// Importing necessary dependencies and components from libraries and files
import React from "react";
import { auth, provider } from "../firebase-config"; // Importing the Firebase authentication and provider configurations
import { signInWithPopup } from "firebase/auth"; // Importing the function to sign in with a popup from the Firebase authentication library
import { useNavigate } from "react-router-dom"; // Importing the routing hook from React Router

// Login component
const Login = ({ setIsAuth }) => {
  // Setting up references and variables
  let navigate = useNavigate(); // Initializing the navigate function from React Router

  // Function to sign in with Google
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      // Signing in with a popup and handling the result
      localStorage.setItem("isAuth", true); // Setting the "isAuth" item to true in local storage
      setIsAuth(true); // Updating the authentication state in the parent component
      navigate("/"); // Navigating to the home page
    });
  };

  // Rendering the login form
  return (
    <div className="loginPage">
      <p>Sign In With Google to Continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign In With Google
      </button>
    </div>
  );
};

export default Login; // Exporting the Login component for use in other files
