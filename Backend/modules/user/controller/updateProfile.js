const userModel = require("../../../DB/model/user")
const bcrypt = require("bcrypt")


const updatePassword = async(req,res)=>
{
  try
  {
    const {oldPassword , newPassword} = req.body
  
    const findUser = await userModel.findById(req.user._id)
    if(oldPassword == newPassword)
    {
     res.status(400).json({message:"New password can't be the same as old password"})
    }
    else
    {
         const match = await bcrypt.compare(oldPassword, findUser.password)
         if(!match)
         {
           res.status(401).json({message:"In-valid password"})      
         }
         else
         {
             
             const nePassword = await bcrypt.hash(newPassword, parseInt(process.env.saltRound))
             const user = await userModel.findByIdAndUpdate(req.user._id, {password: nePassword},{new:true})
             res.status(201).json({message:"Updated", user})
            //res.redirect("/home.html")
           
         }
    } 
  }  
   catch(error)
  {
    res.status(500).json({message:"catch error",error})

  }      
}



const getAllUser = async(req,res)=>
{
  try
   {
    const users =  await userModel.find().populate("posts")
    res.status(201).json({message:"Users", users})
  } 
  catch (error) {
    res.status(500).json({message:"catch error",error})
  }
}




module.exports = {
    updatePassword,
    getAllUser

}