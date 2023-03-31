import Course from "../models/Course.js"
import slugify from "slugify"


export const createCourse =async(req,res,next)=>{
// const Course = Course(req.body)

try {
   
    if(req.body.title){
       
        req.body.slug = slugify(req.body.title)
    }
    const newCourse = await Course.create(req.body);
    res.status(200).json("Course has been created")
} catch (error) {
    next( res.status(500).json(error)) 
}
}

export  const updateCourse = async(req,res,next)=>{
    try {

     const updatedCourse = await Course.findByIdAndUpdate(req.params.id,
            {$set:req.body},{new:true})
            res.status(200).json(updatedCourse)

        
    } catch (error) {
        next( res.status(500).json(error)) 
    }

}

export const deleteCourse =async(req,res,next)=>{
    try {
        await Course.findByIdAndDelete(req.params.id)
        res.status(200).json("Course has been deleted")
        
    } catch (error) {
        next( res.status(500).json(error)) 
    }

}

export const getCourse =async(req,res,next)=>{
    try {
       const course = await Course.findById(req.params.id)
        res.status(200).json(course)
        
    } catch (error) {
        next( res.status(500).json(error)) 
    }

}

export const getAllCourse =async(req,res,next)=>{
    
    try {
        const queryObj = {...req.query}
        const excludeFieleds = ["page", "sort","limit", "fields"]
        excludeFieleds.forEach((el)=> delete queryObj[el])
        // console.log(queryObj)

        // let query = Course.find(JSON.parse(queryStr))
        

        let queryStr = JSON.stringify(queryObj);
        queryStr= queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match)=>`$${match}`)
        // console.log(queryStr)

        let query = Course.find(JSON.parse(queryStr))

        //sorting
        if(req.query.sort){
            const sortBy= req.query.sort.split(",").join(" ")
            query= query.sort(sortBy) 


        }else{
            query = query.sort("-createdAt")
        }

        //limiting the fields
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit; 

        query= query.skip(skip).limit(limit);
        if(req.query.page){
            const courseCount = await Course.countDocuments()
            if(skip >= courseCount) return res.status(400).json("this page does not axist") 
        }

        console.log(page, limit, skip);

        if(req.query.fields){
            const fields = req.query.fields.split(",").join(" ")
            query= query.select(fields) 
        }else{ 
            query = query.select("-__v")
        } 

        //pafination

       const courses = await (query)
     return   res.status(200).json(courses)
        
    } catch (error) {
        next( res.status(500).json(error)) 
    }

}