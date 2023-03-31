import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  instructor: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  slug:{
    type:String,
     required:true,
  
    lowercase:true
    
  
},
  duration: {
    type: Number,
    min: 0
  },
  enrolledStudents: {
    type: Number,
    default: 0,
    min: 0
  },
  published: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Course = mongoose.model('Course', courseSchema);
export default Course
