import express from "express";
import { createGroups, getGroupAll, getGroupAllMembers, getGroupAndMembersById, joinGroup, postGroupImage, postGroupText } from "../../controllers/group/groupCreate.js";

const groups = express.Router();
// Post
groups.post("/creategroup", createGroups);
groups.post("/join", joinGroup);
groups.post("/uploadImage", postGroupImage);
groups.post("/uploadText", postGroupText);

// get
groups.get("/", getGroupAll);
groups.get("/gm", getGroupAllMembers);
groups.get("/gm/:id", getGroupAndMembersById);

// put


// delete



export default groups;