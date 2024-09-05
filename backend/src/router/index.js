import express from "express";
import usersRoute from "./usersRouter.js";
import usersPostRoute from "./userpostRoute.js";
import usersCommentRoute from "./userComment.js";


const route = express.Router()

route.use("/v1/f", usersRoute)
route.use("/v1/p", usersPostRoute)
route.use("/v1/p", usersCommentRoute)



route.use("*", (req, res, next) =>
{
    res.status(404).json({
        errors: ["Page Not found"],
        message: "Internal server error",
        data: null,
    });
});

export default route;