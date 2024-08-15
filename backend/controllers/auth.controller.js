import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body
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
        if(!validUser)return res.status(401).json({"mssg":"User not found"})
            const match = bcryptjs.compareSync(password,validUser.password);
        if(!match){
            return res.status(401).json({"mssg":"Wrong password"})
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