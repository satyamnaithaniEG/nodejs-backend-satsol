const BlacklistedTokens = require('../models/blacklistedTokens')


exports.logout_auth = (req, res, next) => {
   
    const token = req.body.token;
    const value = new BlacklistedTokens({
        token: token,
        time: new Date()  
    });
    value.save().then(result=> res.status(200).json(result)).catch(err=> res.status(404).json(err))
 }

exports.delete_blacklisted_tokens = (req, res, next) => {
    var date = new Date();
    var d = date.toISOString().split('T')[1].split(':')[0] - 1
    var e = date.toISOString().split('T')
    var f = date.toISOString().split('T')[1].split(':')
    const newDate = e[0]+'T'+d+':'+f[1]+':'+f[2]; // Calculates date and time which is exactly 1 hour before the time
    BlacklistedTokens.deleteMany({ 
        "time" : { 
          $lt: newDate
        }   
      }).then(result=> res.status(200).json(result))
      .catch(err => res.status(404).json(err))
  
} 





















// export function logout_auth(req, res, next) {
//     verify(req.body.token, process.env.JWT_KEY)
//     .then(decoded =>
//       decoded.exp - parseInt(new Date().getTime() / 1000))
//     //.then(expiration => redis.set(req.body.token, true, 'EX', expiration))
//     .catch(err=>console.log(err))
//  }



