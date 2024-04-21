const express = require('express')
const userRouter = express.Router();
const {userSigninSchema,userSignupSchema} = require('../zod.js')
const {userModel,balanceModel} = require('../mongoose.js')
const jwt = require("jsonwebtoken");
userRouter.post('/save', async(req,res)=>{
    const userData = req.body;
    try{
        const validatedData = userSigninSchema.parse(userData);
        const response = await userModel.collection.insertOne(validatedData);
        await balanceModel.collection.insertOne({userId:response.insertedId, balance:Math.trunc(Math.random()*10000)})
        const token = jwt.sign({userId:response.insertedId},process.env.SECRET_KEY,{expiresIn:'1h'})
        res.json({
            mssg:"user inserted",
            jwt:token
            }
        )
    }catch(e){
        console.log(e);
        res.json({
            mssg:"user not inserted"
        })
    }
})

userRouter.post('/check', async(req,res)=>{
    const userData = req.body;
    try{
        const validatedData = userSignupSchema.parse(userData);
        const response = await userModel.findOne(validatedData);
        if(response){
            const token = jwt.sign({userId:response._id},process.env.SECRET_KEY)
            res.json({
                mssg:"user found",
                jwt:token
                }
            )
        }else{
            res.json({
                mssg:"user not found"
            })
        }
        
    }catch(e){
        console.log(e);
        res.json({
            mssg:"invalid data inserted"
        })
    }
})

module.exports = userRouter;