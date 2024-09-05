import express from "express";
import { getUser, setUsers, setActivateUser, setLogin, setImage, getUserProfile, setForgotpassword, setResetPassword, getUserVeryfy, setRefreshToken, setLogut } from "../controllers/users/usersControl.js";
import { autenticate } from "../controllers/errorHandling.js";

const usersRoute = express.Router()
// Post
usersRoute.post("/users", setUsers);
usersRoute.post("/login", setLogin);
usersRoute.post("/pp/:id", setImage);
usersRoute.post("/forgotpasword", setForgotpassword);
usersRoute.post("/forgotpasword/:email", setResetPassword);
usersRoute.post("/logout", setLogut);


// get
usersRoute.get("/users", autenticate, getUser);
usersRoute.get("/activate/:id", setActivateUser);
usersRoute.get("/users/:name", autenticate, getUserProfile);
usersRoute.get("/email/:email", getUserVeryfy);
usersRoute.get("/token", setRefreshToken);

// put


// delete



export default usersRoute;