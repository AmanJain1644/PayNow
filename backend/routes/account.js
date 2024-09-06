// backend/routes/account.js
const express = require('express');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');
const zod = require('zod');
const authMiddleware = require('../middleware');

const accountRouter = express.Router();


accountRouter.get("/balance",authMiddleware, async (req, res) => {
   const account = await Account.findOne({
        userId:req.userId
   });

   res.json({
    balance:account.balance
   });
});


const transferSchema = zod.object({
    amount:zod.number().positive("Amount must be a positive number"),
    to:zod.string().min(5,"not a valid account")
})

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    try{
        
        const { amount, to } = req.body;
        
        // Fetch the accounts within the transaction
        const account = await Account.findOne({userId:req.userId});
        console.log(account);

    
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }
        
        const toAccount = await Account.findOne({ userId: to });
    
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

    
        // Perform the transfer
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } });
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } });
    
        // Commit the transaction
        await session.commitTransaction();
        res.json({
            message: "Transfer successful"
        });
    
    }catch(err){
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({
                msg:"transaction Failed",
                error:err.message
        });
    }finally{
        session.endSession();
    }
});

module.exports = accountRouter;