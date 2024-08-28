import express from "express";
import { ForgotPassword, getDashbordUsers, getUsers, LoginUsers, LogoutUsers, registerUsers, UsersUpdate } from "../controllers/usersControllers.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";


const route = express.Router()

route.get("/users", verifyToken, getUsers)
route.get("/users/profile", verifyToken, getDashbordUsers);
route.put("/users/update/:id", verifyToken, UsersUpdate);
route.post("/users", registerUsers)
route.post("/login", LoginUsers)
route.put("/forgotpassword", ForgotPassword)
route.get("/token", refreshToken)
route.delete("/logout", LogoutUsers)


export default route;