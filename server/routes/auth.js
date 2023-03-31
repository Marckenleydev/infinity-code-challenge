import express from "express"
import {createUser,login} from "../controllers/auth.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"

const router = express.Router()

// router.get("/checkedauthentication",verifyToken, (req,res,next) =>{
//   next(res.status(200).json("hello user, you are logged in"))

  
// })
// router.get("/checkeduser/:id",verifyUser, (req,res,next) =>{
//   next(res.status(200).json("hello user, you are logged in you can deleted your acount"))
// })


// router.get("/checkedAdmin",verifyAdmin, (req,res,next) =>{
//   next(res.status(200).json("hello user, you are logged in you can do what ever you want"))
// })

router.post("/register", createUser)
router.post("/login", login)




export default router