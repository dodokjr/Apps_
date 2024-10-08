import express from "express";
import { createGroups, joinGroup } from "../../controllers/group/groupCreate.js";

const groups = express.Router();
// Post
groups.post("/creategroup", createGroups);
groups.post("/join", joinGroup);

// get

// put


// delete



export default groups;