import express from "express";
import { createGroups } from "../../controllers/group/groupCreate.js";

const groups = express.Router();
// Post
groups.post("/creategroup", createGroups);

// get

// put


// delete



export default groups;