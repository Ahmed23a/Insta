const { Roles } = require("../../middleware/auth")

const endPoint = {
 createPost :[Roles.User],
 likePost :[Roles.User],
 updatePost :[Roles.User],
 deletePost :[Roles.User,Roles.Admin],
 createComment :[Roles.User],
 updateComment :[Roles.User]
 
}

module.exports = endPoint
