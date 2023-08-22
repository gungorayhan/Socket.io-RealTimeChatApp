const User =require("../models/userModel")
const bcrypt = require("bcrypt")

const registerController=async(req,res,next)=>{
try {
    const {username,email,password}=req.body;

    const usernameCheck = await User.findOne({username});
    if(usernameCheck){
        return res.json({msg:"Username already used", status:false})
    }

    const emailCheck= await User.findOne({email})
    if(emailCheck){
        return res.json({msg:"Email already used",status:false})
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const user=await User.create({
        username,
        email,
        password:hashedPassword
    })
    delete user.password;
    return res.json({status:true,user})
} catch (ex) {
    next(ex)
}
}


const loginController=async(req,res,next)=>{
    const {username,password}=req.body;
    try {
        const user= await User.findOne({username});
        if(!user){
            return res.json({msg:"Incorrect username or password", status:false})
        }

        const isPasswordValid=await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return json({msg:"Incorrent username oor password",status:false})
        }
        delete user.password
        res.json({status:true,user})
    } catch (ex) {
        next(ex)
    }
};

const setAvatarController=async(req,res,next)=>{
    const userId=req.params.id
    const avatarImage=req.body.image;
    try {
        const userData = await User.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            avatarImage,
        },
      { new: true }
      );

        return res.json({
            isSet:userData.isAvatarImageSet,
            image:userData.avatarImage
        })
        
    } catch (ex) {
        next(ex);
    }
}

const getAllUsersController=async(req,res,next)=>{

    try {
        const users = await User.find({_id:{$ne : req.params.id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ])
        return res.json(users);
    } catch (ex) {
        next(ex)
    }
}
 

module.exports={
    registerController,
    loginController,
    setAvatarController,
    getAllUsersController
}