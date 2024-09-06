import express from "express";
import { autenticate } from "../controllers/errorHandling.js";
import { setComment, setGetComment } from "../controllers/users/usersComments.js";


const usersCommentRoute = express.Router();
// Post
usersCommentRoute.post("/comment/:postId", setComment);

// get
usersCommentRoute.get("/comment/:id", setGetComment);

// put


// delete



export default usersCommentRoute;