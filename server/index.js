import express from "express";
const app= express();
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import userRoute from "./routes/user.js"
import authRoute from "./routes/auth.js"
import courseRoute from "./routes/course.js"
import cookieParser from "cookie-parser";
dotenv.config()



mongoose.set('strictQuery', true);

// Database link connection


const PORT =process.env.PORT || 8001

app.use(cookieParser())
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// routes 
app.use("/api/user",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/course",courseRoute)

// connect to mongoDB Database

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("mongoDb is successfull connected");

    app.listen(PORT ,console.log(`server is running at port ${PORT}`))
})