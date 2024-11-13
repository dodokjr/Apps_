import express from "express";
import { createGroups, getGroupAll, getGroupAllMembers, getGroupAndMembersById, joinGroup, outGroupMembers, postGroupImage, postGroupText, roleGroupMembers } from "../../controllers/group/groupCreate.js";

const groups = express.Router();
// Post
groups.post("/creategroup", createGroups);
groups.post("/join", joinGroup);
groups.post("/uploadImage", postGroupImage);
groups.post("/uploadText", postGroupText);
groups.post("/role", roleGroupMembers);

// get
groups.get("/", getGroupAll);
groups.get("/gm", getGroupAllMembers);
groups.get("/gm/:id", getGroupAndMembersById);

// put


// delete
groups.delete("/out/:id", outGroupMembers)



export default groups;