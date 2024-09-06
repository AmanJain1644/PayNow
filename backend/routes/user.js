
const { JWT_SECRET } = require("../config");
const jwt = require('jsonwebtoken');

const zod  = require('zod');
const express = require('express');
const { User, Account } = require("../db");
const authMiddleware = require("../middleware");
const userRouter = express.Router();
const signupSchema = zod.object({
    username:zod.string().email(),
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string().min(3).max(30)
});

userRouter.get('/',(req,res)=>{
    res.json({
        msg:"yes correct call"
    });
});

userRouter.post('/signup',async(req,res)=>{
    const body = req.body;
    const {success,error} = signupSchema.safeParse(body);
    if(!success){
        return res.json({
            msg:"Email is already taken or Invalid inputs",
            err:error.errors
        })
    }

    const user =await User.findOne({
        username:body.username        
    });

    if(user){
        return res.json({
            msg:"Email is already taken or Invalid inputs"
        })
    }

    const dbUser = await User.create(body);
    const userId = dbUser._id;

    await Account.create({
        userId,
        balance: 1+Math.random()*10000
    })

    const token = jwt.sign({
        userId
    },JWT_SECRET);

    return res.json({
        msg:"user was successfully created",
        token
    })

});

const signinSchema = zod.object({
    username:zod.string().email(),
    password:zod.string().min(3).max(30)
});

userRouter.post('/signin',async(req,res)=>{
    const body = req.body;
    const {success} = signinSchema.safeParse(body);
    if(!success){
        return res.status(411).json({msg:"Incorrect Email or Password"});
    }
    const user = await User.findOne({
        username:body.username,
        password:body.password
    })

    if(user){

        const token =  jwt.sign({
            userId:user._id
        },JWT_SECRET);

        res.json({
            token
        });
        return;
    }

    res.status(411).json({
        msg:"Error while Login"
    });

});

const updateSchema = zod.object({
    password:zod.string().optional(),
    firstname:zod.string().optional(),
    lastname:zod.string().optional()
});

userRouter.post("/",authMiddleware, async(req,res)=>{
    const body = req.body;
    const {success}= updateSchema.safeParse(body);
    if(!success){
        return res.status(411).json({
            msg:"error while updating the user info"
        });
    }

    await User.updateOne({
        _id:req.userId
    },body)
    res.json({
        msg:"Updated Successfully"
    })
}) 

userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})

module.exports = userRouter;