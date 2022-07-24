const mongoose = require('mongoose');



const connectDB = ()=>
{
    return mongoose.connect(process.env.URLDB)
    .then(console.log(`Connected.. on ${process.env.URLDB}`))
    .catch(result => console.log("fail to connect"))
}

module.exports = connectDB