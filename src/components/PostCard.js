// Importing necessary dependencies and components from libraries and files
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom"; // Importing the routing hook from React Router
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import GetAppIcon from "@mui/icons-material/GetApp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { db, auth } from "../firebase-config"; // Importing the Firebase database and authentication configurations
import DeleteIcon from "@mui/icons-material/Delete";
import { getDocs, deleteDoc, doc } from "firebase/firestore"; // Importing functions from the Firebase Firestore library

// PostCard component
const PostCard = ({
  title,
  details,
  author,
  id,
  price,
  address1,
  address2,
  city,
  state,
  zip,
}) => {
  // Setting up variables and functions
  const documentId = id; // Storing the id prop in a variable

  let navigate = useNavigate(); // Initializing the navigate function from React Router
  let storage = localStorage.getItem("isAuth"); // Retrieving the "isAuth" item from local storage

  // Function to claim a post
  const claimPost = () => {
    localStorage.setItem("docId", documentId); // Storing the documentId in local storage
    navigate("/claim"); // Navigating to the claim page
  };

  // Rendering the post card
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {author.name[0]}{" "}
            {/* Displaying the first letter of the author's name */}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon /> {/* Icon button for additional options */}
          </IconButton>
        }
        title={title}
        subheader={`${author.email} | $${price} | ${state} | ${address1} | ${address2} | ${city} | ${zip}`}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {details} {/* Displaying the post details */}
        </Typography>
      </CardContent>

      {/* Rendering the claim post button if the user is authenticated and not the author of the post */}
      {storage && auth.currentUser.uid != author.id && (
        <IconButton onClick={claimPost} aria-label="add to favorites">
          <GetAppIcon /> {/* Icon button to claim the post */}
        </IconButton>
      )}

      {/* Rendering the delete post button if the user is authenticated and is the author of the post */}
      {storage && auth.currentUser.uid === author.id && (
        <IconButton
          onClick={async () => {
            const postDoc = doc(db, "posts", documentId); // Creating a reference to the post document in Firestore
            await deleteDoc(postDoc); // Deleting the post document from Firestore
            window.location.reload(); // Reloading the page to reflect the changes
          }}
        >
          <DeleteIcon /> {/* Icon button to delete the post */}
        </IconButton>
      )}
    </Card>
  );
};

export default PostCard; // Exporting the PostCard component for use in other files
