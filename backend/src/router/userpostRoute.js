import express from "express";
import { autenticate } from "../controllers/errorHandling.js";
import usersPost from "../models/usersPostModels.js";
import { getPostById, getUsersPost, setUserPost } from "../controllers/users/usersPost.js";

const usersPostRoute = express.Router();
// Post
usersPostRoute.post("/post", setUserPost);
usersPostRoute.post("/post/p/", getPostById);

// get
usersPostRoute.get("/post/:name", getUsersPost);

// put


// delete



export default usersPostRoute;