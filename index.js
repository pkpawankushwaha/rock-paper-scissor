const express=require('express')
const app=express()
const router=require('./routes/start')
app.get("/",(req,res)=>{
    res.send("welcome")
})

app.use("/game",router)
app.listen(5000,()=>{
    console.log("listening at 5000");

})