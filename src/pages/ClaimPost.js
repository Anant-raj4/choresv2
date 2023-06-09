// Importing necessary dependencies and components from libraries and files
import React, { useState, useEffect } from "react";
import "./CreatePost.css";
import { addDoc, collection } from "firebase/firestore"; // Importing functions from the Firebase Firestore library
import { db, auth } from "../firebase-config"; // Importing the Firebase database and authentication configurations
import { useNavigate } from "react-router-dom"; // Importing the routing hook from React Router
import { getDoc, deleteDoc, doc } from "firebase/firestore"; // Importing additional functions from the Firebase Firestore library
import emailjs from "emailjs-com"; // Importing the email service library

// ClaimPost component
const ClaimPost = () => {
  // Setting up state variables using the useState hook
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [number, setNumber] = useState();

  // Setting up references and variables
  const postId = localStorage.getItem("docId"); // Retrieving the "docId" item from local storage
  const postsCollectionRef = collection(db, "claims"); // Creating a reference to the "claims" collection in Firestore
  let navigate = useNavigate(); // Initializing the navigate function from React Router
  let storage = localStorage.getItem("isAuth"); // Retrieving the "isAuth" item from local storage

  // Function to send an email using the email service library
  const emailSender = (e) => {
    // e.preventDefault();
    var templateParams = {
      name: localStorage.getItem("employeeName"), // Retrieving the "employeeName" item from local storage
    };
    emailjs
      .send(
        "service_qsn5ba5",
        "template_4mu2s88",
        templateParams,
        "rRB4KYOVYaXQqCfD9"
      )
      .then((res) => {
        console.log(res); // Logging the response from the email service
      })
      .catch((err) => {
        console.log(err); // Logging any errors that occur during email sending
      });
  };

  // Function to claim a post
  const claimPost = async () => {
    await addDoc(postsCollectionRef, {
      // Adding a new document to the "claims" collection in Firestore
      time,
      date,
      number,
      postId,
      author: {
        name: auth.currentUser.displayName, // Storing the name of the current user
        id: auth.currentUser.uid, // Storing the user ID of the current user
        email: auth.currentUser.email, // Storing the email of the current user
      },
    });
    const postDoc = doc(db, "posts", postId); // Creating a reference to the claimed post document
    emailSender(); // Calling the emailSender function to send an email
    console.log();
    await deleteDoc(postDoc); // Deleting the claimed post document from the "posts" collection
    window.location.reload(); // Reloading the page
    window.location.pathname = "/"; // Redirecting to the home page
  };

  // useEffect hook to check if the user is authenticated
  useEffect(() => {
    if (!storage) {
      navigate("/login"); // Navigating to the login page if the user is not authenticated
    }
  }, []);

  // Rendering the claim post form
  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Claim a Post</h1>
        <div className="inputGp">
          <label>Phone Number:</label>
          <input
            placeholder="Phone..."
            onChange={(event) => {
              setNumber(event.target.value); // Updating the number state when the input value changes
            }}
          />
        </div>
        <div className="inputGp">
          <label>Date Available:</label>
          <input
            type="date"
            onChange={(event) => {
              setDate(event.target.value); // Updating the date state when the input value changes
            }}
          />
        </div>
        <div className="inputGp">
          <label>Time Available:</label>
          <input
            type="time"
            onChange={(event) => {
              setTime(event.target.value); // Updating the time state when the input value changes
            }}
          />
        </div>
        <button onClick={claimPost}>Submit Post</button>
      </div>
    </div>
  );
};

export default ClaimPost; // Exporting the ClaimPost component for use in other files
