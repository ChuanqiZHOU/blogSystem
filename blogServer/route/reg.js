import express from 'express'
import {User, CreateNewUser} from '../model/user.js'
const reg = express.Router()
reg.post('/', async(req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
 
    // console.log(req.body)
    const { email } = req.body;
    const userScan = await User.findOne({ email});
   // console.log(userScan);
    if (!userScan) {
        await CreateNewUser(req.body);
        res.send({status: 200, msg:"reg is sucessful"})
    } else {
        res.send({status: 400, msg: "please use another email adress"})
    }
    
     
})

export { reg }
