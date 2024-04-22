const express = require("express");
const authMiddleware = require("../middleware");
const { balanceModel } = require("../mongoose");
const mongoose = require('mongoose');
const accountRouter = express.Router();
accountRouter.use(authMiddleware);

accountRouter.get('/getbalance',async (req,res)=>{
    const userId = req.userId;
    const response = await balanceModel.findOne({userId})//we will surely find what if jwt was stored somewhere elese and account was deleted then this will be the response
    res.json({
        balance: response.balance,
    }) 
})

accountRouter.post('/transfer',async(req,res)=>{
    const from = req.userId;
    const to = req.body.to;
    const amount = req.body.amount;
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        const user = await balanceModel.findOne({userId:from});
        if(amount > user.balance){
            res.json({
                mssg:"insufficient balance"
            }) 
            await session.endSession();
        }
        const newBalance = user.balance-amount;
        user.balance = newBalance;
        await user.save();
        const otherUser = await balanceModel.findOne({userId:to});
        otherUser.balance = otherUser.balance +  amount;
        await otherUser.save();
        await session.commitTransaction();
        res.json({
            mssg:"Transfer successful"
        })
    }catch(e){
        console.log(e);
        await session.abortTransaction();
    }
    session.endSession();

})

module.exports=accountRouter;



