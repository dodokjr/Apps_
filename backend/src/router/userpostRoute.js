import express from "express";
import { getUser, setUsers, setActivateUser, setLogin, setImage, getUserProfile, setForgotpassword, setResetPassword, forgotPassword, getUserVeryfy } from "../controllers/users/usersControl.js";
import { autenticate } from "../controllers/errorHandling.js";
import usersPost from "../models/usersPostModels.js";
import { getUsersPost, setUserPost } from "../controllers/users/usersPost.js";

const usersPostRoute = express.Router();
// Post
usersPostRoute.post("/post", setUserPost);

// get
usersPostRoute.get("/post/:name", getUsersPost);

// put


// delete



export default usersPostRoute;