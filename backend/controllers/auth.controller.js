import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body
    const invalidUser = await User.findOne({email})
    if(invalidUser)return next(errorHandler(400,"*Email already exists"))

    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save()
        res.status(201).json({ "mssg": "User creeated successfully" })

    } catch (err) {
        next(err)
    }

}

export const login = async (req,res,next)=>{

    const {email,password} = req.body
    try{

        const validUser = await User.findOne({email})
        if(!validUser)return next(errorHandler(400,'*User Not Found'))
            const match = bcryptjs.compareSync(password,validUser.password);
        if(!match){
            return next(errorHandler(401,'*Wrong Credentials'))
        }
        
        const token = jwt.sign({id:validUser._id},process.env.SECRET)
        const {password:pass,...rest} = validUser._doc
        res.cookie('access_token',token,{httpOnly:true})
        .status(200)
        .json(rest)
    }catch(err){
        next(err)
    }
    
}

export const google = async(req,res,next)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(user){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            const {password:pass,...rest} = user._doc
        
            res.cookie('access_token',token,{httpOnly:true})
            .status(200)
            .json(rest)
            
            
        }
        else{
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword,10)
            const newUser = new User({username:req.body.name.split(' ').join("").toLowerCase()+Math.random().toString(36).slice(-4),email:req.body.email,password:hashedPassword})
            await newUser.save()
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            const {password:pass,...rest} = user._doc
        
            res.cookie('access_token',token,{httpOnly:true})
            .status(200)
            .json(rest)
            
        }

    }catch(err){
        next(err)
    }
}

export const logout = (req,res,next)=>{
    try{
        res.clearCookie('access_token')
        res.status(200).json('User logged out successfully')
    }catch(err){
        next(err)
    }
}