import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import FileUpload from "express-fileupload"
import db from "./config/db.js"
import route from "./router/index.js"
import cors from "cors"
import Users from "./models/UsersModel.js"
import { UsersPost } from "./models/Models.js"

dotenv.config()

const app = express()
const PORT = 3100

app.use(express.json())
app.use(cors({ credentials: true, origin: true, withCredentials: true }))
app.use(cookieParser())
app.use(FileUpload());
app.use(express.static("uploads"));
app.use(route)



try
{
    await db.authenticate();
    console.log("database Koneksi");
} catch (error)
{
    console.error(error)
}

app.listen(PORT, () => console.log(`Server Run in Port ${PORT}`))