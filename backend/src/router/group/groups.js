import express from "express";
import { createGroups, getGroupAll, joinGroup, postGroupImage, postGroupText } from "../../controllers/group/groupCreate.js";

const groups = express.Router();
// Post
groups.post("/creategroup", createGroups);
groups.post("/join", joinGroup);
groups.post("/uploadImage", postGroupImage);
groups.post("/uploadText", postGroupText);

// get
groups.get("/", getGroupAll);

// put


// delete



export default groups;