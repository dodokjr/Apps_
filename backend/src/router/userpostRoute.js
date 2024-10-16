import express from "express";
import { autenticate } from "../controllers/errorHandling.js";
import usersPost from "../models/usersPostModels.js";
import { deletePost, getPostById, getUsersPost, setUserPost, updatePost } from "../controllers/users/usersPost.js";

const usersPostRoute = express.Router();
// Post
usersPostRoute.post("/post/u", setUserPost);
usersPostRoute.post("/post/up", updatePost)

// get
usersPostRoute.get("/post/p/:id", getPostById);
usersPostRoute.get("/post/:name", getUsersPost);

// put


// delete
usersPostRoute.delete("/post/d/:postId", deletePost);



export default usersPostRoute;