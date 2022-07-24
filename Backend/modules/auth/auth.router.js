const { auth, Roles } = require("../../middleware/auth")
const validation = require("../../middleware/validation")
const  authValidator = require("./auth.validation")
const authController = require("./controller/registration")



const router = require("express").Router()





//SignUp 
router.post('/signup', validation(authValidator.signUpValidator), authController.signup)

//Confirm Email
router.get('/confirmEmail/:token', authController.confirmEmail)

//SignIn 
router.post('/signin', validation(authValidator.loginValidator) ,authController.signin)

//SendCode 
router.post("/sendCode", authController.sendCode)

//Forget Password
router.patch("/forgetPassword",validation(authValidator.forgetPassword), authController.forgetPassword)






module.exports = router