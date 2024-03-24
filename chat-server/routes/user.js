const router  = require("express").Router();
const authController  =require("../controllers/auth");
const userController = require("../controllers/user");

router.patch("/update-me", authController.protect ,userController.updateMe);
router.post("/get-users", authController.protect, userController.getUsers);
module.exports = router;

