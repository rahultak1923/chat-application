const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/messageController");
const auth = require("../middleware/auth");

router.post("/", auth, ctrl.sendMessage);
router.get("/:userId", auth, ctrl.getMessages);

module.exports = router;