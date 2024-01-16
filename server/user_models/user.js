const mongoose=require('mongoose')
const {Schema}=mongoose
const jwt=require('jsonwebtoken')
const joi=require('joi')
const passwordComplexity=require('joi-password-complexity')

const userSchema=new Schema({
    firstName:"String",
    lastName:"String",
    email:"String",
    password:"String",
});

userSchema.methods.genearteAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.PRIVATEKEY,{expireIn:"7d"})
    return token
};

const User=mongoose.model("user",userSchema);

const validate=(data)=>{
  const schema=joi.object({
    firstName:joi.String().required().label("First Name"),
    lastName:joi.String().required().label("Last Name"),
    email:joi.String().email().required().label("Email"),
    password:passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);

}

module.exports={User,validate}
