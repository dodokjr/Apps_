import express from "express";
import usersRoute from "./usersRouter.js";


const route = express.Router()

route.use("/v1/f", usersRoute)


route.use("*", (req, res, next) =>
{
    res.status(404).json({
        errors: ["Page Not found"],
        message: "Internal server error",
        data: null,
    });
});

export default route;