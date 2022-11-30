const router=require('express').Router()
const ApplicationModel = require('../model/applicationModel')
const SlotModel = require('../model/slotModel');
const UserModel = require('../model/user')
router.get('/applications', (req, res, next) => {
    ApplicationModel.find({}).then((data)=>{
      // console.log(data);
      res.json(data);
   }).catch(()=>{
      let err='Something went wrong!'
      res.json({err:err});
   })
   })

   router.get('/slots',async (req, res, next) => {
    SlotModel.find({}).then((response)=>{
     console.log(response);
      res.json(response[0]);
    }).catch((err)=>{
   console.log(err);
      err='Something went wrong!'
     res.json({err:err});
  })
  })

  router.get('/approved',async (req, res, next) => {
    ApplicationModel.find({isApproved:true}).then((data)=>{
      res.json({data});
   }).catch((err)=>{
    console.log(err);
       err='Something went wrong!'
      res.json({err:err});
   })
   })

   router.post('/booking/:id',async (req, res, next) => {
    let appId=req.params.id
    let {val, index}=req.body
    let char=val[index].slot
    ApplicationModel.findOneAndUpdate({_id:appId},{$set:{isBooked:true, slotId:char}}).then((data)=>{
      data.isBooked=true
      data.slotId=char
      res.json({data});
   }).catch((err)=>{
    console.log(err);
       err='Something went wrong!'
      res.json({err:err});
   })
   })

   router.get('/approve/:id',async (req, res, next) => {
    const id=req.params.id
    ApplicationModel.findOneAndUpdate({_id:id},{$set:{isApproved:true}}).then((data)=>{
      res.json({data:data});
   }).catch(()=>{
      let err='Something went wrong!'
      res.json({err:err});
   })
   })
   router.get('/decline/:id',async (req, res, next) => {
      const id=req.params.id
      console.log(id);
      ApplicationModel.findOneAndUpdate({_id:id},{$set:{isDeclined:true}}).then((data)=>{
        res.json({data:data});
     }).catch(()=>{
        let err='Something went wrong!'
        res.json({err:err});
     })
     })
     router.get('/block/:id',async (req, res, next) => {
      let userId=req.params.id
      UserModel.findOneAndUpdate({_id:userId},{$set:{isBlocked:true}}).then((users)=>{
        users.isBlocked=true
        res.json({users:users});
     }).catch((err)=>{
      console.log(err);
         err='Something went wrong!'
        res.json({err:err});
     })
     })
     router.get('/unblock/:id',async (req, res, next) => {
      let userId=req.params.id
      UserModel.findOneAndUpdate({_id:userId},{$set:{isBlocked:false}}).then((users)=>{
        users.isBlocked=false
        res.json({users:users});
     }).catch((err)=>{
        console.log(err);
        err='Something went wrong!'
        res.json({err:err});
     })
     })
module.exports=router