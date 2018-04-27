var con = require("../db_connect");

module.exports.getPublicProfile = function (req, res) {
  con.query("SELECT userName, creationDate FROM users WHERE userId =?", req.params.userId, function (error, results, fields) {
    if(error){
      console.log(error);
    } else {
      console.log(results[0]);
      res.json({
        user: results[0],
      })
    }
  })
};
module.exports.getUserPosts = function (req,res){
  con.query('SELECT * FROM articles WHERE user_id =? ORDER BY post_date DESC LIMIT 10',req.params.userId ,function (error,results,fields){
    if(error){
      console.log(error);
      res.json({
        status: false,
        message: "There are some errors with the query"
        })
    } else {
      console.log(results);
      res.json({
        posts: results
        })
      } 
 });
};