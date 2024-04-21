const mongoose = require("mongoose") 

mongoose.connect(process.env.MONGOOSE_URL)
.then(()=>{console.log("mongodb connected")})
.catch((e)=>{console.log('error occured while connecting mongodb')})

const userSchema = mongoose.Schema({
    username :{
        required:true,
        type:String
    },
    fname :{
        required:true,
        type:String
    },lname :{
        required:true,
        type:String
    },
    password :{
        required:true,
        type:String
    }
})

    const balanceSchema = mongoose.Schema({
        userId : {
            type:mongoose.Schema.Types.ObjectId,
            ref:"users",
            required:true
        },
        balance:{
            type:Number
        }
    })

const userModel = mongoose.model('user',userSchema);
const balanceModel = mongoose.model('balance',balanceSchema);
module.exports = {
    userModel,
    balanceModel
}