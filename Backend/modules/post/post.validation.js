const Joi = require("joi")






const createPost = {

    body: Joi.object().required().keys({
        text:Joi.string()
    })
}

const likePost = {

    params: Joi.object().required().keys({
        id:Joi.string().required().min(24).max(24)
    })
}


const updatePost = {
    body: Joi.object().required().keys({
        text:Joi.string()
    }),

    params: Joi.object().required().keys({
        id:Joi.string().required().min(24).max(24)
    })
}

const deletePost = {
    body: Joi.object().required().keys({
        text:Joi.string()
    }),

    params: Joi.object().required().keys({
        id:Joi.string().required().min(24).max(24)
    })
}

const createComment = {
    body: Joi.object().required().keys({
        text:Joi.string()
    }),

    params: Joi.object().required().keys({
        id:Joi.string().required().min(24).max(24)
    })
}



const updateComment = {
    body: Joi.object().required().keys({
        text:Joi.string()
    }),

    params: Joi.object().required().keys({
        id:Joi.string().required().min(24).max(24)
    })
}


const createReply = {
    body: Joi.object().required().keys({
        text:Joi.string()
    }),

    params: Joi.object().required().keys({
        id:Joi.string().required().min(24).max(24),
        commentId:Joi.string().required().min(24).max(24)
    })
}
module.exports = {

    createPost,
    likePost,
    updatePost,
    deletePost,
    createComment,
    updateComment,
    createReply
}