const router=require('express').Router();
const { exist } = require('joi');
const {User,validate}=require("../user_models/user")

router.post('/',async (req,res)=>{
    try{
        const {error}=validate(req.body);
        if(error)
            return res.status(400).send({message:error.detail[0].message})
        const user=await User.findOne({email:req.body.email});
        if(user)
            return res.status(409).send({message:"This mail user is already exist"});
        const salt=await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword=await bcrypt.hash(req.body.password,salt);

        await new User({...req.body,password:hashPassword}).save();
        res.status(201).send({message:"user created successfully"});


    }catch(error){
        res.status(500).send({message:"server error"});
    }
})

module.exports=router;