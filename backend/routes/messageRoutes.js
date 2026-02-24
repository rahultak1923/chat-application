const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// router.post("/", auth, messageController.sendMessage);
router.post("/",auth,upload.single("image"),messageController.sendMessage);
router.get("/:userId", auth, messageController.getMessages);
router.put("/:id", auth, messageController.editMessage);
router.delete("/:id", auth, messageController.deleteMessage);
router.put("/seen/:id", auth, messageController.markSeen);

module.exports = router;
