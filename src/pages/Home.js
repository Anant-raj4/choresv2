// Importing necessary dependencies and components from libraries and files
import React, { useState, useEffect } from "react";
import { getDocs, deleteDoc, doc } from "firebase/firestore"; // Importing functions from the Firebase Firestore library
import { collection } from "firebase/firestore"; // Importing the collection function from the Firebase Firestore library
import { db, auth } from "../firebase-config"; // Importing the Firebase database and authentication configurations
import "./Home.css"; // Importing the CSS file for styling
import { useNavigate } from "react-router-dom"; // Importing the routing hook from React Router
import PostCard from "../components/PostCard"; // Importing the PostCard component

// Home component
const Home = () => {
  // Setting up state variables using the useState hook
  const [postsLists, setPostsList] = useState([]); // State for the list of posts
  let navigate = useNavigate(); // Initializing the navigate function from React Router

  const postsCollectionRef = collection(db, "posts"); // Creating a reference to the "posts" collection in Firestore
  let storage = localStorage.getItem("isAuth"); // Retrieving the "isAuth" item from local storage

  useEffect(() => {
    // useEffect hook to fetch posts from Firestore
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef); // Retrieving all documents from the "posts" collection
      setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); // Updating the postsList state with the retrieved data
    };
    getPosts();
  }, []);

  // Rendering the home page with the list of posts
  return (
    <div className="homePage">
      {postsLists.map((post) => {
        // Iterating over the postsList and rendering a PostCard component for each post
        return (
          <PostCard
            title={post.title} // Passing the post title as a prop
            details={post.details} // Passing the post details as a prop
            author={post.author} // Passing the post author as a prop
            id={post.id} // Passing the post id as a prop
            price={post.price} // Passing the post price as a prop
            address1={post.address1} // Passing the post address line 1 as a prop
            address2={post.address2} // Passing the post address line 2 as a prop
            city={post.city} // Passing the post city as a prop
            state={post.state} // Passing the post state as a prop
            zip={post.zip} // Passing the post zip code as a prop
          />
        );
      })}
    </div>
  );
};

export default Home; // Exporting the Home component for use in other files
