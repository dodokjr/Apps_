import express from "express";
import { createGroups, joinGroup, postGroupImage, postGroupText } from "../../controllers/group/groupCreate.js";

const groups = express.Router();
// Post
groups.post("/creategroup", createGroups);
groups.post("/join", joinGroup);
groups.post("/uploadImage", postGroupImage);
groups.post("/uploadText", postGroupText);

// get

// put


// delete



export default groups;