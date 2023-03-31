
import User from "../models/User.js"



export const updateUser = async(req,res,next)=>{

    try{
        const user = await User.findByIdAndUpdate(req.params.id,
            {$set:req.body}, {new:true})
            res.status(200).json(user)
    }catch(error){
      next( res.status(500).json("user has been updated")) 

    }
}

export const deleteUser=async(req, res,next)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    }catch(error){
        next( res.status(500).json(error)) 

    }
}

export const getUser=async(req, res,next)=>{
    try{
       const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }catch(error){
        next( res.status(500).json(error)) 

    }
}

export const getAllUser=async(req, res,next)=>{
    try{
       const users = await User.find()
       return  res.status(200).json(users)
    }catch(error){
        next( res.status(500).json(error)) 

    }
}