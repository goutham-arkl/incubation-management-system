const User = require('../model/user')
const {verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin}=require('./verifyToken')
const userController=require('../controller/userController')
const router=require('express').Router()
const ApplicationModel=require('../model/applicationModel')
const Cookies = require('universal-cookie')

//update user
router.put("/:id",verifyTokenAndAuthorization,userController.user_Update)

//delete

router.delete('/:id',verifyTokenAndAuthorization,userController.delete_user)

//get user

router.get('/find/:id',verifyTokenAndAdmin,userController.get_user)

//get all users

router.get('/getUsers',userController.all_user)

router.post('/upload/:id',function(req, res, next){
    const userId=req.params.id
    req.body.userId=userId
    // const cookies = new Cookies(req.headers.cookie);
    // console.log(cookies);
    ApplicationModel.create(req.body).then((response)=>{
      User.findOneAndUpdate({_id:userId},{$set:{isRegistered:true}}).then((data)=>{
        data.isRegistered=true
        res.json(data)
      }).catch((err)=>{
        res.json(err)
      })
    }).catch((err)=>{
      res.json(err)
    })
  })
  router.get('/application/:id', (req, res, next) => {
    let userId=req.params.id
    ApplicationModel.findOne({userId:userId}).then((data)=>{
      res.json(data);
   }).catch(()=>{
      let err='Something went wrong!'
      res.json({err:err});
   })
   })
module.exports=router