const mongoose = require("mongoose")
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({

    userName :{type: String,required:true},
    firstName:String,
    lastName:String,
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    age:{type: Number, required:true},
    phone : String,
    gender : {type:String,required:true, enum:['Male','Female'], default:'Male'},
    confirmEmail :{type:Boolean,default:false},
    isBlocked :{type:Boolean,default:false},
    online :{type:Boolean,default:false},
    profilePic : String,
    coverPic : Array,
    gallary : String,
    role: {type:String, default:'User'},
    posts:[{type: mongoose.Schema.Types.ObjectId , ref:"Post"}],
    follower:[{type: mongoose.Schema.Types.ObjectId , ref:"User"}],
    following:[{type: mongoose.Schema.Types.ObjectId , ref:"User"}],
    socialLink: Array,
    pdfLink: String,
    story: Array,
    code:String


},
{
    timestamps:true
})


userSchema.pre("save", async function(next) {
    this.password = await bcrypt.hash(this.password, parseInt(process.env.saltRound))
    next()

})

const userModel = mongoose.model('User',userSchema)

module.exports = userModel

