import express from "express";
import { autenticate } from "../controllers/errorHandling.js";
import { setComment, setGetComment, updateComment } from "../controllers/users/usersComments.js";


const usersCommentRoute = express.Router();
// Post
usersCommentRoute.post("/comment/p/:postId", setComment);
usersCommentRoute.post("/comment/u", updateComment)

// get
usersCommentRoute.get("/comment/:id", setGetComment);

// put


// delete



export default usersCommentRoute;