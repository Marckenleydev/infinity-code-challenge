import express from "express"
import { createCourse, deleteCourse, getAllCourse, getCourse, updateCourse} from "../controllers/course.js"
import { verifyAdmin,verifyUser  } from "../utils/verifyToken.js"

const router = express.Router()

router.post("/",       createCourse)
router.put("/:id", updateCourse )
router.delete("/:id",deleteCourse )
router.get("/find/:id",verifyUser, getCourse)
router.get("/allcourses", getAllCourse)


export default router