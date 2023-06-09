// Importing necessary dependencies and components from libraries and files
import Container from "react-bootstrap/Container"; // Importing the Container component from React Bootstrap
import Nav from "react-bootstrap/Nav"; // Importing the Nav component from React Bootstrap
import Navbar from "react-bootstrap/Navbar"; // Importing the Navbar component from React Bootstrap
import Button from "react-bootstrap/Button"; // Importing the Button component from React Bootstrap
import { Outlet } from "react-router-dom"; // Importing the Outlet component from React Router
import { auth } from "../firebase-config"; // Importing the Firebase authentication configuration
import { signOut } from "firebase/auth"; // Importing the signOut function from the Firebase authentication library

// Header component
function Header({ setIsAuth }) {
  // Setting up references and variables
  let storage = localStorage.getItem("isAuth"); // Retrieving the "isAuth" item from local storage

  // Function to sign the user out
  const signUserOut = () => {
    signOut(auth).then(() => {
      // Signing out the user and handling the result
      localStorage.removeItem("isAuth"); // Removing the "isAuth" item from local storage
      setIsAuth(false); // Updating the authentication state in the parent component
      window.location.pathname = "/login"; // Redirecting the user to the login page
    });
  };

  // Rendering the header
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Chores4Sale</Navbar.Brand>{" "}
          {/* Displaying the brand name */}
          <Nav className="ml-auto ">
            {storage ? (
              // Conditionally rendering navigation links based on authentication status
              <>
                <Nav.Link href="/post">Add Post</Nav.Link>{" "}
                {/* Displaying the "Add Post" link */}
                <button onClick={signUserOut}>Logout</button>{" "}
                {/* Displaying the logout button */}
              </>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
          <Outlet /> {/* Rendering the nested routes */}
        </Container>
      </Navbar>
    </>
  );
}

export default Header; // Exporting the Header component for use in other files
