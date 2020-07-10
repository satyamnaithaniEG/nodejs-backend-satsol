const jwt = require('jsonwebtoken') 
const BlacklistedTokens = require('../models/blacklistedTokens')
 
 module.exports = (req, res, next) => {
     try{ 
         
        const token = req.headers.authorization.split(" ")[1];
      BlacklistedTokens.find({token: token}).count().then(
          res=> {
              if(res === 0)
              {
                const decoded = jwt.verify(token, process.env.JWT_KEY);
                req.userData = decoded;
                next();
              }
          }
          )
      .catch(err=> {  
        console.log({
          message: 'blacklistedtoken database error',
          error: err})
        });

     
        
     } catch (error) {
         return res.status(401).json({
             message: 'Auth failed',
             suggestion:'Login/SignUp First or enter a valid token in the header',
             error: error

         })
     }  
 }

   
