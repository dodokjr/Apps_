import express from "express";
import { createGroups, getGroupAll, getGroupAllMembers, joinGroup, postGroupImage, postGroupText } from "../../controllers/group/groupCreate.js";

const groups = express.Router();
// Post
groups.post("/creategroup", createGroups);
groups.post("/join", joinGroup);
groups.post("/uploadImage", postGroupImage);
groups.post("/uploadText", postGroupText);

// get
groups.get("/", getGroupAll);
groups.get("/gm", getGroupAllMembers);

// put


// delete



export default groups;