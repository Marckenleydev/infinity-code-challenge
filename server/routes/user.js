import {updateUser,deleteUser,getUser,getAllUser} from "../controllers/user.js"
import express from "express"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"


const router = express.Router()
// router.get("/checkedauthentication",verifyToken, (req,res,next) =>{
//     res.send("hello user, you are logged in")
// })
router.put("/:id",verifyUser, updateUser)
router.delete("/:id",verifyUser, deleteUser)
router.get("/:id",verifyUser, getUser)
router.get("/found/users",verifyAdmin, getAllUser)


export default router