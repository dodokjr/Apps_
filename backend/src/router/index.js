import express from "express";
import usersRoute from "./usersRouter.js";
import usersPostRoute from "./userpostRoute.js";
import usersCommentRoute from "./userComment.js";
import usersFollowRoute from "./follow.js";
import usersLikeRoute from "./likePost.js";
import groups from "./group/groups.js";


const route = express.Router()

route.use("/v1/f", usersRoute)
route.use("/v1/p", usersPostRoute)
route.use("/v1/p", usersCommentRoute)
route.use("/v1/fo", usersFollowRoute);
route.use("/v1/fo", usersLikeRoute);

// Groups
route.use("/v1/group", groups)


route.use("*", (req, res, next) =>
{
    res.status(404).json({
        errors: ["Page Not found"],
        message: "Internal server error",
        data: null,
    });
});

export default route;