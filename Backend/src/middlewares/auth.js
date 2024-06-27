const User = require('../models/user');

const auth = async (req,res,next)=>{
    try{
        const userId = await req.session.userId;
        if(!userId){
            return res.send(false)
        }
        const user = await User.findById(userId);
        user.Password = undefined;
        user.ForgetPasswordToken = undefined;
        user.FPTokenExpires = undefined;
        req.user = user;
        next();
    }catch(e){
        console.log(e)
    }
}

module.exports = auth;