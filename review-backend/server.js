 const express=require("express");
 const app=express();
 const bodyParser=require("body-parser");
 const cors=require("cors");
 import reviews from "./api/reviews.route.js"
 
 app.use(cors())
 app.use(express.json())
 app.use("/api/v1/reviews",reviews)
 app.use("*",(req,res)=>{
res.status(404).json({error:"not found"})
 })
 export default app;
 