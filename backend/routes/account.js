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
    let amount = req.body.amount;
    amount = parseInt(amount);
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        const user = await balanceModel.findOne({userId:from}).session(session);
        if(amount > user.balance){
            res.json({
                mssg:"insufficient balance"
            }) 
            await session.endSession();
            return;
        }
        const newBalance = user.balance-amount;
        user.balance = newBalance;
        await user.save({ session: session });
        const otherUser = await balanceModel.findOne({userId:to}).session(session);
        otherUser.balance = otherUser.balance + amount;
        await otherUser.save({ session: session });
        await session.commitTransaction();
        res.json({
            mssg:"Transfer successful"
        })
    }catch(e){
        console.log(e);
        await session.abortTransaction();
        res.json({
            mssg:"transfer nonsuccessful"
        })
    }
    session.endSession();

})

module.exports=accountRouter;



