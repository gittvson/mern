const express= require("express");
const router =express.Router();
const User=require("../models/User")
const argon2=require("argon2")
const jwt=require("jsonwebtoken")
router.post('/register',async (req,res)=>{
    
    const {username,password,phone}=req.body
    if(!username||!password){
        return res.status(400).json({success:false,message:"miss username or password"})
    }
    try{
        const user=await User.findOne({username})
        if(user){
            return res.status(400).json({success:false,message:"your username had"})
        }
        hashedPassword=await argon2.hash(password);
        const newUser=new User({
            username,
            password:hashedPassword,
            phone
        });
       await newUser.save();

        //reuturn token
       const accessToken=jwt.sign({userId:newUser._id},process.env.ACCESS_TOKEN_SECRET)
       res.json({success:true,message:"created success",accessToken})
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"error"})
    }
    
})

//@POST api/auth/login
//@desc Login user
//@access Public
router.post('/login',async (req,res)=>{
    const {username,password}=req.body;
    if(!username||!password){
        return res.status(400).json({success:false,message:"miss username or password"})
    }
    try{
        //check for existing user
        const user=await User.findOne({username});
        if(!user){
            return res.status(400).json({success:false,message:"Incorrect username or password"})
        }
        const passwordValid=await argon2.verify(user.password,password);
        if(!passwordValid){
            return res.status(400).json({success:false,message:"Incorrect username or password"})
        }
        //return token
        const accessToken=jwt.sign({userId:user._id},process.env.ACCESS_TOKEN_SECRET)
        res.json({success:true,message:"login success",accessToken})
    }catch(error){
        console.log(error,"loi cmnr")
    }
})

router.get('/',async (req,res)=>{
    try{
        const users = await User.find();
        res.json({success :true,message :"lay du lieu thanh cong",users})
    }catch(error){
        console.log(error.message)
    }
})
module.exports=router;