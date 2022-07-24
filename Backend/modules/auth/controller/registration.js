const userModel = require("../../../DB/model/user")
const sendEmail = require("../../../service/sendEmail")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const openurl = require('openurl')


const signup = async(req,res)=>
{
 try
 {
    const {userName, password ,email, gender,age} = req.body

    var newUser = new userModel({userName, password ,email, gender,age})
    const savedUser = await newUser.save()
  
    const token = jwt.sign({id: savedUser._id},process.env.emailTokenSecret ,{expiresIn: 300})

    const URL = `${req.protocol}://${req.headers.host}/api/v1/auth/confirmEmail/${token}`
    const message = `<a href=${URL}>Please click here to confirm your email<a>`
    sendEmail (savedUser.email, message)     
    
    res.status(201).json({message:"Done"})
        
    
     
   

 } catch(error)
 {
    if(error.keyValue?.email)
    {
        res.status(409).json({message:"email already exist"})
    }
    else
    {
        res.status(500).json({message:"catch error", error})
    }  
 }    
}

const confirmEmail = async(req,res)=>
{
   try
   {
    const token = req.params.token
    if(!token || token == null || token == undefined)
    {
        res.status(403).json({message:"In-valid email token"})
    }else
    {
        const decoded = jwt.verify(token,process.env.emailTokenSecret)
        if(!decoded)
        {
            res.status(400).json({message:"In-valid email token"})
        }
        else
        {
            const findUser = await userModel.findById({_id :decoded.id})
            if(!findUser)
            {
                res.status(400).json({message:"In-valid account"})
            }
            else
            {
                if(findUser.confirmEmail)
                {
                    res.status(400).json({message:"Account already confirmed"})
                }
                else
                {
                    await userModel.findOneAndUpdate({_id : findUser._id }, {confirmEmail : true},)
                    res.redirect("/signup_success.html")
                    
                }
            }
        }
    }
   }catch(error)
   {
       res.status(500).json({message:"catch error",error})
   }
}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            res.status(404).json({ message: "in-valid user email" })
        } else {
        
            if (!user.confirmEmail ) {
                res.status(400).json({ message: "please confirm your email" })
            } else {
                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    res.status(404).json({ message: "in-valid account details" })
                } else {
                    const token = jwt.sign({ id: user._id, isLoggedIn: true }, process.env.TokenSecret, { expiresIn: '24h' })
                    res.json({message:"success", token:token})
                    console.log(token);
                   // res.redirect("/home.html")
                }
            }

        }
    } catch (error) {
        res.status(500).json({ message: "catch error", error })

    }

}

const sendCode = async(req,res)=>
{   
    try {
        const {email} = req.body
        const user = await userModel.findOne({email})
        if(!user)
        {
            res.status(404).json({message:"in-vaild account"})
        }
        else
        {
            const code = Math.floor(Math.random()* (9999 - 1000 + 1) + 1000)
            message = `<p>With this code you can update your password: ${code} </p>`
            await userModel.findByIdAndUpdate(user._id, {code})
            sendEmail(email,message)
            res.status(200).json({message:"Done"})
        }
    } catch (error) {
    res.status(500).json({message:"catch Error",error})
        
    }

}

const forgetPassword = async(req,res)=>
{
   try {
        const {email , code , newPassword} = req.body
        const user = await userModel.findOne({email})
        if(!user)
        {
            res.status(404).json({message:"in-vaild account"})
        }
        else
        {
            if(user.code.toString() != code.toString())
            {
                res.status(409).json({message:"in-vaild code"})
            }
            else
            {
                const hashPassword = await bcrypt.hash(newPassword, parseInt(process.env.saltRound))
                await userModel.findByIdAndUpdate(user._id,{password: hashPassword ,code:""})
                res.status(200).json({message:"updated, please go and login "})

            }
        
        }
   } catch (error) {
    res.status(500).json({message:"catch Error",error})
   }
}


module.exports = {
    signup,
    confirmEmail,
    signin,
    sendCode,
    forgetPassword
}