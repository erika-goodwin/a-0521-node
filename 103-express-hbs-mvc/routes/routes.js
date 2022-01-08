const express = require("express");
const router = express.Router();

//Controller Import
const membersController = require("../controllers/members.controller");

//For get all members
router.get("/", membersController.getAllMembers);

//For get one member
router.get("/:id", membersController.getOneMember);

//For create a member
router.post("/post", membersController.createMember);

//For Edit one member
router.put("/update/:id", membersController.updateMember);

//For Delete one member
router.delete("/delete/:id", membersController.deleteMember);

module.exports = router;
