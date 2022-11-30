const User = require('../model/user')

const  Cryptojs=require('crypto-js');
const { json } = require('express');
const jwt=require('jsonwebtoken')


//register

const User_register=async(req,res)=>{

  try{  const newUser=new User({
        name:req.body.username,
        password:Cryptojs.AES.encrypt(req.body.password, process.env.PASS_KEY).toString(),
        email:req.body.email
    })
       const savedUser   = await newUser.save()
       res.status(201).json(savedUser)
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }

}


//Login

const user_Login=async(req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email})
   
        !user&& res.status(401).json("wrong credentials")
        const hashedPassword=Cryptojs.AES.decrypt(

            user.password,process.env.PASS_KEY 
            );
      const  OriginalPassword=hashedPassword.toString(Cryptojs.enc.Utf8)
        OriginalPassword != req.body.password && 
        res.status(401).json("wrong credentials!")
            //setting jwt token
            // console.log(user);
        const accessToken=jwt.sign({
            id:user._id,
           
        },process.env.JWT_SECRET,{expiresIn:"3d"}
        );

        const {password,...others}=user._doc//mongo db stores it file in _doc so we use ._doc
         
        res.status(202).json({...others,accessToken});
    }catch(err){
        res.status(500),json(err)
    }

}


module.exports={User_register,user_Login}
