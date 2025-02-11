const express = require('express')
const mongoose = require('mongoose');
const {Account} = require('../db');
const authMiddleware = require('../middleware');

const router = express.Router();

// authentication through authMiddleware and fetch balance from the account db 
router.get('/balance', authMiddleware , async (req,res) => {
    const userId = req.userId;

    const account = await Account.findOne({
        userId: userId
    })
    
    res.json({
        balance: account.balance
    })
})

router.post('/transfer', authMiddleware, async (req,res) => {
    const userId = req.userId;
    const session = await mongoose.startSession();
    
    session.startTransaction();
    const {amount, to} = req.body;
    
    // find user account and check the balance is available for transaction amount or not
    const account = await Account.findOne({userId}).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: 'Insufficient balance'
        })
    }

    // find account for whom need to transfer money if not then show invalid account
    const toAccount = await Account.findOne({userId: to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: 'Invalid Account'
        })
    }

    //perform transaction
    await Account.updateOne({userId: userId}, {$inc: {balance: -amount}}).session(session);
    await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session);

    //commit the transaction
    await session.commitTransaction();

    res.json({
        message: 'Transaction successful!'
    })

})

module.exports = router;