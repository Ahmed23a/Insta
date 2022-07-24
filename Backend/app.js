
require('dotenv').config({path: "./config/.env"})
const express = require("express")
const connectDB = require("./DB/connection")
const app = express()
const allRouter = require("./Routing/allRouter")
const bodyParser = require("body-parser")
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
   extended:true //==>
 }))
app.use("/api/v1/auth", allRouter.authRouter )
app.use("/api/v1/user", allRouter.userRouter )
app.use("/api/v1/post", allRouter.postRouter )

app.get('/' ,(req,res)=>
{
 res.set({"Allow-access-Allow-Origin": '*'})
 res.redirect("index.html")
})

connectDB()
const port = process.env.port




app.listen(port,()=>
{
    console.log(`Running..... on port ${port}`);
})