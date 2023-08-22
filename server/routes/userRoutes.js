const express= require("express");
const { registerController, loginController, setAvatarController, getAllUsersController,  } = require("../controllers/userController");
const router = express.Router();

router.post("/register",registerController)
router.post("/login",loginController)
router.post("/setAvatar/:id",setAvatarController)
router.get("/allUsers/:id",getAllUsersController)


module.exports=router;