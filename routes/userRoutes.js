const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth.verifyToken, userController.getUsers);
router.post("/", auth.verifyToken, userController.createUser);
router.put("/:id", auth.verifyToken, userController.updateUser);
router.delete("/:id", auth.verifyToken, userController.deleteUser);

module.exports = router;
