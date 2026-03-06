const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.get("/", auth, ctrl.getUsers);

module.exports = router;