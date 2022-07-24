const router = require("express").Router()

const { auth } = require("../../middleware/auth")
const validation = require("../../middleware/validation")
const { myMulter, validationMethod } = require("../../service/multer")
const postController = require("./controller/postCRUD")
const endPoint = require("./post.endPoint")
const  postValidator  = require("./post.validation")
const commentController = require("./controller/commentCRUD")




//Post
//Create Post
router.post("/",myMulter("/post",validationMethod.image).array('image',5)
 ,validation(postValidator.createPost),
auth(endPoint.createPost), postController.createPost)

//Like Post 
router.patch("/:id/like",validation(postValidator.likePost),
auth(endPoint.likePost), postController.likePost)

//Unlike Post
router.patch("/:id/unlike",validation(postValidator.likePost),
auth(endPoint.likePost), postController.unlikePost)

//Update Post
router.patch("/:id/update",validation(postValidator.updatePost),
auth(endPoint.updatePost), postController.updatePost)

//Delete Post
router.delete("/:id/delete",validation(postValidator.deletePost),
auth(endPoint.deletePost), postController.deletePost)

//Get all posts
router.get("/", postController.postList)

// Comment
//Create Comment 
router.post("/:id/comment",validation(postValidator.createComment),
auth(endPoint.createComment), commentController.createComment)

//Update Comment
router.patch("/:id/comment/update",validation(postValidator.updateComment),
auth(endPoint.updateComment), commentController.updateComment)


//Delete Comment
router.delete("/:id/comment/delete",validation(postValidator.deletePost),
auth(endPoint.deletePost), commentController.deleteComment)

//Like Comment
router.patch("/:id/comment/like",validation(postValidator.likePost),
auth(endPoint.likePost), commentController.likeComment)

//Unlike Comment
router.patch("/:id/comment/unlike",validation(postValidator.likePost),
auth(endPoint.likePost), commentController.unlikeComment)


//reply
//Create Reply or Reply on reply ..etc
router.post("/:id/comment/:commentId",validation(postValidator.createReply),
auth(endPoint.likePost), commentController.replyComment)
module.exports = router