import express from "express";
import { autenticate } from "../controllers/errorHandling.js";
import { setLike, setLikeUpdate } from "../controllers/users/usersLikePost.js";


const usersLikeRoute = express.Router();
// Post
usersLikeRoute.post("/like/:postId", setLike);

// get
// usersLikeRoute.get("/like/:id", setGetFollowed);

// put


// delete



export default usersLikeRoute;