import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import FileUpload from "express-fileupload"
import cors from "cors"
import dbApps from "./src/config/db.js"
import Users from "./src/models/usersModel.js"
import appMiddleware from "./src/middleware/index.js"
import usersPost from "./src/models/usersPostModels.js"
import Followed from "./src/models/usersFollowed.js"
import Follower from "./src/models/usersFollowers.js"
import LikePost from "./src/models/usersLikePost.js"



dotenv.config()

const app = express()
const PORT = 3100

app.use(express.json())
app.use(FileUpload());
app.use(express.static("uploads"));
app.use(appMiddleware)




try
{
    await dbApps.authenticate();
    console.log("database Koneksi");
    await dbApps.sync()
} catch (error)
{
    console.error(error)
}

app.listen(PORT, () => console.log(`Server Run in Port ${PORT}`))