const jwt = require('jsonwebtoken')
const JWT_SECRET = "ThisisaJWTSECRETKey"

const fetchUser= (req,res,next)=>{
// Get the user from the JWT token and add the id to req object
const token=req.header('authToken')
console.log('Token',token)
if(!token)
    res.status(401).json({status:'Failure',mssg:'Please authenticate using valid token'})
try {
    const decoded= jwt.verify(token,JWT_SECRET)
    req.user=decoded.user;
    console.log("before next",req.user)
    next();
    console.log("after next")
} catch (error) {
    console.log("Inside catch", error)
   return  res.status(401).json({status:'Failure',mssg:'Please authenticate using valid token'})
}
}

module.exports=fetchUser;