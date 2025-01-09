const jwt=require('jsonwebtoken')

const authenticate=async(req,res,next)=>{
 const {token}=req.headers
 console.log("user",token);
 
 if(!token){
        res.json('not authorized')
 }
 try {
    const decode=jwt.verify(token,process.env.jwt_secret)
    req.body.userid=decode.id
    next()
 } catch (error) {
    res.status(401).json(error)
 }
}





module.exports = { authenticate };