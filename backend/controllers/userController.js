const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password, mobile } = req.body;
        // Check if email already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email already exists"})
        }
        // Hash password 
        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            mobile
        });

        // Jwt token create
        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );

        res.status(201).json({
            message:"User registered successfully",
            token,
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            }
        });
    }catch(error){
        res.status(500).json({message:"error.message",error})
    }
};

// user login 
exports.loginUser = async(req,res)=>{
    try{
        const{email, password}= req.body;

        // check user
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }

        // token ko generate
        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );
        res.json({
            message:"Login successful",
            token
        })
    }catch(error){
        res.status(500).json({message:"error.message",error})
    }
}
// get all users
exports.getAllUsers = async (req,res)=>{
    try{
        const users = await User.find()
        .select("-password")
        .sort({createdAt:-1});
    res.json(users)
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

// update user
exports.updateProfile = async (req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        ).select("-password");
        
        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        res.json({
            message:"User updated",
            user
        })
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

// delte user 
exports.deleteUser = async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.json({message:"user deleted"})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

// logout user 

exports.logoutUser = async (req,res)=>{
    try{
        await User.findByIdAndUpdate(req.user.id,{
            isOnline:false,
            lastSeen:new Date()
        });
        res.json({message:"logged out successfully"})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}