const router=require('express').Router();
const User=require('../user_models/user')
const joi=require('joi')
const bcrypt=require('bcrypt')
router.post('/',async(res,req)=>{
    try{
        const {error}=validate(req.body)
        if(error)
            return res.status(400).send({message:error.details[0].message})
        const user=await User.findOne({email:req.body.email})
        if(!user)
            return res.status(401).send({message:"Inavalid user"})
        const validPassword=await bcrypt.compare(
            req.body.password,user.password
        );
        if(!validPassword)
            return res.status(401).send({message:"Invalid password"})

        const token=user.generateAuthToken();
        res.status(200).send({data:token,message:"Logged in successful"})
        
    }
    catch(error){
        res.status(500).send({message:"Server error"})
    }
})

const validate=(data)=>{
    const schema=joi.object({
        email:joi.String().email().required().label("email"),
        password:joi.String().required().label("passowrd"),
    })
    return schema.validate(data);
}


module.exports = router;