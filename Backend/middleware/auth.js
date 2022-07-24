const jwt = require("jsonwebtoken")
const userModel = require("../DB/model/user")

const Roles ={
  Admin : "Admin",
  User : "User",
 
}


 const auth = (accessRoles)=>
 {

  return async (req ,res ,next)=>
  {
    const headerToken = req.headers['authorization']
    if(!headerToken || headerToken == null || headerToken == undefined || !headerToken.startsWith(`${process.env.BearerKey} `))
    {
     
      res.status(404).json({message:"In-valid Token"})
    }
    else
    {
      const token = headerToken.split(" ")[1]
      if(!token || token == null || token == undefined || token.length < 1)
      {
        res.status(401).json({message:"In-valid Token"})       
      }
      else
      {
        const decoded = jwt.verify(token,process.env.TokenSecret)
        const findUser = await userModel.findById(decoded.id).select("email userName role")
        if(!findUser)
        {
          
          res.status(404).json({message:"In-valid User"})
        }
        else
        {
  
         if(accessRoles.includes(findUser.role))
         {
          req.user = findUser
          next()
         }
         else
         {
          res.status(401).json({message:"not auth user"})
         }                           
        }
      }
     
    }
  }
 }

 module.exports = {

  auth,
  Roles
 }