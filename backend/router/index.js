import express from "express";
import { EditProfile, ForgotPassword, getDashbordUsers, getUsers, LoginUsers, LogoutUsers, registerUsers, UpdateImg, UsersUpdate, verifyUser } from "../controllers/usersControllers.js";
import { AuthToken, localVariabel } from "../middleware/Auth.js";
import { refreshToken } from "../controllers/refreshToken.js";
import { generateOTP, verifyOtp } from "../middleware/Otp.js"
import multer from "multer";
import { registerMail } from "../controllers/mailer.js";


const route = express.Router()
const upload = multer({ dest: './uploads/' })


// Register Post
route.post("/users", registerUsers)
route.post("/login", LoginUsers)
route.post("/registerMail", registerMail)
route.post("/update", UpdateImg)


route.get("/users", AuthToken, getUsers)
route.get("/users/profile", AuthToken, getDashbordUsers);
route.get("/token", refreshToken)
route.get("/otp/g", verifyUser, localVariabel, generateOTP);
route.get("/otp/v", verifyUser, verifyOtp)


// route.put("/users/update/:id", verifyToken, UsersUpdate);
route.put("/users/update/edit", EditProfile);
route.put("/upload/img", upload.single('image'), UpdateImg)
route.put("/forgotpassword", ForgotPassword)


route.delete("/logout", LogoutUsers)


export default route;