const { auth, Roles } = require("../../middleware/auth")
const validation = require("../../middleware/validation")
const  userProfile  = require("./controller/updateProfile")
const endPoint = require("./user.Endpoints")
const userValidation = require("./user.Validator")


const router = require("express").Router()




// Update Passowrd
router.patch('/updatePassword' ,auth(endPoint.updatePassword) , validation(userValidation.updatePasswordValidator),userProfile.updatePassword )

//Get all Users
router.get("/" ,userProfile.getAllUser)










module.exports = router