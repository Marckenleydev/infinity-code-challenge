import bcrypt from "bcryptjs"
import User from "../models/User.js"
import jwt from "jsonwebtoken";




export const createUser = async(req,res)=>{
    const email = ({email:req.body.email})
    const findUser = await User.findOne(email)
    
    try{
       const salt = bcrypt.genSaltSync(10);
       const hash = bcrypt.hashSync(req.body.password, salt)

       const newUser = new User({
        ...req.body,
        password:hash
       })

        if(!findUser){
           
            const user = await newUser.save()
          return  res.status(200).json(user)
        }
        res.status(501).json("this email already exist")

    }catch(error){
        res.status(500).json(error)

    }
}

export const login =async(req,res,next)=>{

    try{

        const user =await  User.findOne({email:req.body.email})
        if(!user) return res.status(501).json("User not found")

        const isPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if(!isPassword) return res.status(501).json("Wrong password")
  const JWT ="petitphat1"
        const token = jwt.sign(
            {id:user._id, isAdmin: user.isAdmin}, JWT
        )
 
        const { password, isAdmin, ...otherDetails } = user._doc;
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json({ details: { ...otherDetails }, isAdmin });
      } catch (err) {
        next(err);
      }
    };