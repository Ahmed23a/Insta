
const Joi = require("joi")


const  signUpValidator = {
    body:Joi.object().required().keys({
        userName: Joi.string().required().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{2,20}$/)).messages({

            'string.empty': 'please fill in u name',
            'any.required': 'please send  u name',
            'string.pattern.base': 'please enter valid name char',
        }),
        
        email : Joi.string().required(),
        password : Joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
        cPassword : Joi.string().valid(Joi.ref('password')).required(),
        age:Joi.number().required().min(18),
       


        
    })
}


const loginValidator ={
    body:Joi.object().required().keys({

        email : Joi.string().required(),
        password : Joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
        
    })
}


const forgetPassword = {
    body:Joi.object().required().keys({

        email : Joi.string().required(),
        newPassword : Joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
        cPassword : Joi.string().valid(Joi.ref('newPassword')).required(),
        code:Joi.number().required()

    })
}
module.exports = {
    signUpValidator,
    loginValidator,
  
    forgetPassword
}