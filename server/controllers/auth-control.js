var jwt = require("jsonwebtoken");

module.exports.auth = function (req, res, next) {
  var token = req.body.token;
  jwt.verify(token, 'secretkey', function(err, decoded) {
    if(err){
      res.json({ 
        status: false,
        message: "You need to login to perform this action",
        error: err 
      })
    }else {
      req.body.user_id = decoded.user.userId;
      req.body.user_name = decoded.user.userName;
      next();
    }
 });
};

module.exports.authTest = function (req, res, next) {
  var token = req.body.token;
  jwt.verify(token, 'secretkey', function(err, decoded) {
    if(err){
      res.json({ 
        status: false,
        error: err 
      })
    }else {
      res.json({
        result: false
      })
    }
 });
};
