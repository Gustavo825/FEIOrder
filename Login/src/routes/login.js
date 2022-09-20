const express = require('express');
const { createServer } = require('telnet');
const router = express.Router();

const User = require('../models/User')
router.get('/',async (req,res) =>{
    const Users = await User.find();
    res.json(Users)
});

router.post('/',async (req,res) =>{
   const user =  new User(req.body)
   await console.log(user);
   res.json({
    status:'User saved'
   });
});

module.exports = router; 