import express from "express";
import { autenticate } from "../controllers/errorHandling.js";
import { setFollowed, setGetFollowed } from "../controllers/users/usersFollow.js";


const usersFollowRoute = express.Router();
// Post
usersFollowRoute.post("/followed", setFollowed);

// get
usersFollowRoute.get("/followed/:id", setGetFollowed);

// put


// delete



export default usersFollowRoute;