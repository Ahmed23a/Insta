const dataMethod = ['body','params','query']

const validation = (schema)=>
{
    return (req,res,next)=>
    {
        const errorArray = []
        dataMethod.forEach(key=>
            {
                if(schema[key] )
                {
                    const validationResult = schema[key].validate(req[key], { abortEarly: false });
                    if (validationResult.error) {
                        errorArray.push(validationResult.error.details)
                    }
                }
            })
            if (errorArray.length) {
                res.json({ message: "validation error", err: errorArray})
            } else {
                next()
            }
    }
}




module.exports = validation