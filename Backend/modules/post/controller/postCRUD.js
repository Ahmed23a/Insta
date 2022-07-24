const postModel = require("../../../DB/model/post");
const userModel = require("../../../DB/model/user");


const createPost = async(req,res)=>
{
  try {
    const {text} = req.body
    if(req.fileFormat)
    {
        //422 Unprocessable Entity
        res.status(422).json({message:"In-valid Format"})
    }
    else
    {
        const imageURLs= []
        req.files.forEach(file => {
            imageURLs.push(`${req.destinationFile}/${file.filename}`)            
        });
        const newPost = new postModel({text, image:imageURLs , createdBy: req.user._id})
        const savedPost = await newPost.save();
        await userModel.findByIdAndUpdate(req.user._id, {$push: {posts : savedPost._id}})
        res.status(201).json({message:"Done",savedPost})
    }
  } catch (error) {
    res.status(500).json({message:"catch Error", error})
  }


}

const likePost = async(req,res)=>
{
    try 
    {
        const {id} = req.params
        
        const post = await postModel.findById(id)
        if(!post)
        {
            res.status(404).json({message:"In-valid Post"})

        }
        else
        {
            if(post.createdBy.toString() == req.user._id.toString())
            {
                res.status(401).json({message:"You can't like yourself "})
            }
            else
            { 
                if(post.likes.includes(req.user._id))
                {
                    res.json({message:"You are already liked the post"})
                }
                else
                {
                    await postModel.findByIdAndUpdate(post._id, {$push:{likes:req.user._id}})
                    res.status(200).json({message:"Done"})
                }                  
            }       
    }
    } catch (error) 
    {
        res.status(500).json({message:"catch Error", error})
    }             
}

const unlikePost = async(req,res)=>
{
   try
   {
    const {id} = req.params
    
    const post = await postModel.findById(id)
    if(!post)
    {
        res.status(404).json({message:"In-valid Post"})

    }
    else
    {
        if(post.createdBy.toString() == req.user._id.toString())
        {
            res.status(401).json({message:"You can't like yourself "})
        }
        else
        { 
          if(post.likes.includes(req.user._id))
          { 
            await postModel.findByIdAndUpdate(post._id, {$pull:{likes:req.user._id}})
            res.status(200).json({message:"Done"})

            
          }
          else
          {
            res.json({message:"You are already unliked the post"})
          }                    
        }       
    }
   } 
   catch (error)
    {
     res.status(500).json({message:"catch Error", error})    
    }            
}

const  updatePost = async(req,res)=>
{
   try 
   {
    const {text } = req.body
    const {id} = req.params

    const findPost = await postModel.findById(id)
    
    if(!findPost || findPost.createdBy.toString() != req.user._id.toString())
    {
        res.status(404).json({message:"In-valid id post"})
    }
    else
    {
        await postModel.findByIdAndUpdate(id,{text},{new :true})
        res.status(200).json({message:"Updated"})
    }
   } 
   catch (error) 
   {
     res.status(500).json({message:"catch Error", error})    
   }
}

const deletePost = async(req,res)=>
{

   try
    {
        const {id} = req.params
        const findPost = await postModel.findById(id)

        if(!findPost)
        {
            res.status(404).json({message:"In-valid id Post"})
        }
        else
        {   
           
        if(findPost.createdBy.toString() != req.user._id.toString())
        {
                res.status(401).json({message:"not auth user"})
        }
        else
        {
                await postModel.findByIdAndUpdate(id, {isDeleted: true, deletedBy: req.user._id})
                await userModel.findByIdAndUpdate(req.user._id, {$pull :{ posts : findPost._id}})
                res.status(200).json({message:"Deleted"})
        }
        }
   }
    catch (error) 
    {
      res.status(500).json({message:"catch Error", error})    
    }
}

const postList = async(req,res)=>
{
 try 
 {
    const post = await postModel.find({}).populate([    
        {
            path:"createdBy",
            select: 'userName email' 
        },
        {
            path:"likes",
            select: 'userName email' 
        },
        {
            path:"commentsId",
            populate:[
                {
                    path:"createdBy",
                    select: 'userName email' 
                },
                {
                    path: "replys",
                    populate:[
                        {
                            path:"createdBy",
                            select: 'userName email'
                        }
                    ]                              
                }
            ]
        },    
       
    ])
     res.status(200).json({message:"Done", post})
 } catch (error)
  {
    res.status(500).json({message:"catch Error", error})    
  }
}


module.exports = {
    createPost,
    likePost,
    updatePost,
    deletePost,
    unlikePost,
    postList
    
}