const commentModel = require("../../../DB/model/comment")
const postModel = require("../../../DB/model/post")

const createComment = async(req,res)=>
{
   try
    {   
        const {id} = req.params
        const {text} = req.body

        const post = await postModel.findById(id)
        if(!post)
        {
            res.status(404).json({message:"in valid post id"})
        }
        else
        {
            const newComment = new commentModel({text , createdBy: req.user._id, postId: post._id})
            const savedComment =  await newComment.save()
            await postModel.findByIdAndUpdate(id, {$push :{commentsId : savedComment._id}})
            res.status(201).json({message:"Done", savedComment})

        }
   }
   catch (error) 
   {
    res.status(500).json({message:"Catch Error", error})
   }

}


const updateComment = async(req,res)=>
{
    try 
    {
        const {id} = req.params
        const {text} = req.body

        const comment = await commentModel.findById(id)

        if(!comment || comment.createdBy.toString() != req.user._id.toString())
        {
            res.status(401).json({message:"invalid id comment"})
        }
        else
        {
            const newComment = await commentModel.findByIdAndUpdate(id, {text},{new:true})
            res.status(201).json({message:"Updated" , newComment})
        }
    } 
    catch (error) 
    {
      res.status(500).json({message:"Catch Error", error})        
    }
}

const deleteComment = async(req,res)=>
{
    try 
    {
        const {id} = req.params
        const comment = await commentModel.findById(id)

        if(!comment)
        {
            res.status(404).json({message:"In-valid id comment"})
        }
        else
        {   
              
            if(comment.createdBy.toString() != req.user._id.toString())
            {
                    res.status(401).json({message:"not auth user"})
            }
            else
            {
                await commentModel.findByIdAndUpdate(id, {isDeleted: true, deletedBy: req.user._id})
                await postModel.findByIdAndUpdate({_id : comment.postId}, {$pull :{ commentsId : comment._id}})
                res.status(200).json({message:"Deleted"})
            }
        }
    }
    catch (error) 
    {
      res.status(500).json({message:"Catch Error", error})             
    }
}


const likeComment = async (req,res)=>
{
    try 
    {
        const {id} = req.params
        
        const comment = await commentModel.findById(id)
        if(!comment)
        {
            res.status(404).json({message:"In-valid comment"})

        }
        else
        {
            if(comment.createdBy.toString() == req.user._id.toString())
            {
                res.status(401).json({message:"You can't like yourself "})
            }
            else
            { 
            if(comment.likes.includes(req.user._id))
            {
                res.json({message:"You are already liked the comment"})
            }
            else
            {
                await commentModel.findByIdAndUpdate(comment._id, {$push:{likes:req.user._id}})
                res.status(200).json({message:"Done"})
            }         

            
            }
    
        }
    } 
    catch (error) 
    {
      res.status(500).json({message:"Catch Error", error})             
        
    }
}
const unlikeComment = async(req,res)=>
{

    try 
    {
        const {id} = req.params
        
        const comment = await commentModel.findById(id)
        if(!comment)
        {
            res.status(404).json({message:"In-valid comment"})

        }
        else
        {
            if(comment.createdBy.toString() == req.user._id.toString())
            {
                res.status(401).json({message:"You can't unlike yourself"})
            }
            else
            { 
            if(comment.likes.includes(req.user._id))
            { 
                await commentModel.findByIdAndUpdate(comment._id, {$pull:{likes:req.user._id}})
                res.status(200).json({message:"Done"})

                
            }
            else
            {
                res.json({message:"You are already unliked the comment"})
            }                    
            }        
        }          
    } 
    catch (error) 
    { 
        res.status(500).json({message:"Catch Error", error})            
    }
}


const replyComment = async(req,res)=>
{
    try 
    {
        const {id , commentId}= req.params
        const {text} = req.body
        const post = await postModel.findById(id).populate({
            path:"commentsId"
        })
        if(!post)
        {
            res.status(404).json({message:"in valid post "})

        }
        else
        {
            const comment = await commentModel.findOne({postId : post._id , _id: commentId})
            if(!comment)
            {
            res.status(404).json({message:"in valid comment id "})

            }
            else
            {
                const newComment =new commentModel({text,createdBy:req.user._id, postId :post._id})
                const savedComment = await newComment.save()

                await commentModel.findByIdAndUpdate(comment._id,{$push : {replys: savedComment._id}})

            }
                
        
        }

        const savedPost =await postModel.findByIdAndUpdate(post._id,{ commentsId:post.commentsId},{new :true})
        res.status(201).json({message:"Done",savedPost})
    } 
    catch (error) 
    {
        res.status(500).json({message:"Catch Error", error})            
        
    }

}










module.exports = {

    createComment,
    updateComment,
    deleteComment,
    likeComment,
    unlikeComment,
    replyComment
}