// Importing necessary dependencies and components from libraries and files
import React, { useState, useEffect } from "react";
import "./CreatePost.css";
import { addDoc, collection } from "firebase/firestore"; // Importing functions from the Firebase Firestore library
import { db, auth } from "../firebase-config"; // Importing the Firebase database and authentication configurations
import { useNavigate } from "react-router-dom"; // Importing the routing hook from React Router

// CreatePost component
const CreatePost = () => {
  // Setting up state variables using the useState hook
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState();
  const [number, setNumber] = useState();

  // Setting up references and variables
  const postsCollectionRef = collection(db, "posts"); // Creating a reference to the "posts" collection in Firestore
  let navigate = useNavigate(); // Initializing the navigate function from React Router
  let storage = localStorage.getItem("isAuth"); // Retrieving the "isAuth" item from local storage

  // Function to create a new post
  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      // Adding a new document to the "posts" collection in Firestore
      title,
      details,
      price,
      address1,
      address2,
      city,
      state,
      zip,
      number,
      author: {
        name: auth.currentUser.displayName, // Storing the name of the current user
        id: auth.currentUser.uid, // Storing the user ID of the current user
        email: auth.currentUser.email, // Storing the email of the current user
      },
    });
    window.location.pathname = "/"; // Redirecting to the home page
  };

  // useEffect hook to check if the user is authenticated
  useEffect(() => {
    if (!storage) {
      navigate("/login"); // Navigating to the login page if the user is not authenticated
    }
  }, []);

  // Rendering the create post form
  return (
    <form onSubmit={createPost}>
      <div className="createPostPage">
        <div className="cpContainer">
          <h1>Create a Post</h1>
          <div className="inputGp">
            <label>Title:</label>
            <input
              placeholder="Title..."
              onChange={(event) => {
                setTitle(event.target.value); // Updating the title state when the input value changes
              }}
              required
            />
          </div>
          <div className="inputGp">
            <label>Post Details:</label>
            <textarea
              placeholder="Post..."
              onChange={(event) => {
                setDetails(event.target.value); // Updating the details state when the textarea value changes
              }}
              required
            />
          </div>
          <div className="inputGp">
            <label>Price: $</label>
            <input
              placeholder="Dollars"
              type="number"
              maxLength={5}
              onChange={(event) => {
                setPrice(event.target.value); // Updating the price state when the input value changes
              }}
              required
            />
          </div>
          <div className="inputGp">
            <label>Address line 1:</label>
            <input
              onChange={(event) => {
                setAddress1(event.target.value); // Updating the address1 state when the input value changes
              }}
              required
            />
            <label>Address line 2:</label>
            <input
              onChange={(event) => {
                setAddress2(event.target.value); // Updating the address2 state when the input value changes
              }}
              required
            />
            <label>City</label>
            <input
              onChange={(event) => {
                setCity(event.target.value); // Updating the city state when the input value changes
              }}
              required
            />
            <label>State</label>
            <input
              maxLength={12}
              onChange={(event) => {
                setState(event.target.value); // Updating the state state when the input value changes
              }}
              required
            />
            <label>Zip</label>
            <input
              type="number"
              onChange={(event) => {
                setZip(event.target.value); // Updating the zip state when the input value changes
              }}
              required
            />
          </div>
          <div className="inputGp">
            <label>Phone Number:</label>
            <input
              maxLength={10}
              type="number"
              onChange={(event) => {
                setNumber(event.target.value); // Updating the number state when the input value changes
              }}
              required
            />
          </div>
          <button type="submit">Submit Post</button>
        </div>
      </div>
    </form>
  );
};

export default CreatePost; // Exporting the CreatePost component for use in other files
