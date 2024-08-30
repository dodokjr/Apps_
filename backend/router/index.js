import express from "express";
import { EditProfile, ForgotPassword, getDashbordUsers, getSearchUsers, getUsers, LoginUsers, LogoutUsers, registerUsers, SaveImage, verifyUser } from "../controllers/usersControllers.js";
import { AuthToken, localVariabel } from "../middleware/Auth.js";
import { refreshToken } from "../controllers/refreshToken.js";
import { generateOTP, verifyOtp } from "../middleware/Otp.js"
import multer from "multer";
import { registerMail } from "../controllers/mailer.js";
import { GetPost, UploadOne } from "../controllers/post/usersPostControllers.js";


const route = express.Router()
const upload = multer({ dest: './uploads/' })


// Register Post
route.post("/users", registerUsers)
route.post("/login", LoginUsers)
route.post("/registerMail", registerMail);
route.post("/follow", SaveImage);

// Post 

route.post("/upload", UploadOne);
route.get("/post", GetPost);


route.get("/users", getUsers)
route.get("/users/s", getSearchUsers)
route.get("/users/profile", AuthToken, getDashbordUsers);
route.get("/token", refreshToken)
route.get("/otp/g", verifyUser, localVariabel, generateOTP);
route.get("/otp/v", verifyUser, verifyOtp);


// route.put("/users/update/:id", verifyToken, UsersUpdate);
route.put("/users/update/edit", EditProfile);
route.put("/forgotpassword", ForgotPassword)


route.delete("/logout", LogoutUsers)


export default route;