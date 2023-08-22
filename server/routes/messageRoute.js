const express= require("express");
const { addMessageController, getAllMessageController } = require("../controllers/messagesController");
const router =express.Router();

router.post("/addmsg",addMessageController);
router.post("/getmsg",getAllMessageController)


module.exports=router;