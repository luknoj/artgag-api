var con = require('../db_connect');
var axios = require('axios');


module.exports.uploadPost = function (req, res) {
  var file = req.body.content;
  var base64result = file.base64.split(',')[1];
  var data = {
    image: base64result,
    title: req.body.title,
  }
  const options = {
    "baseURL": 'https://api.imgur.com',
    "headers": {
      "Authorization": "Bearer "
    }
  }
  axios.post('/3/image', data, options)
  .then(function (response) {
    var post = {
      "content": response.data.data.link,
      "user_id": req.body.user_id,
      "title": req.body.title,
      "post_date": new Date()
    };
    con.query('INSERT INTO articles SET ?', post, function(error, results, fields){
      if (error){
          res.json({
            status: false,
            message: 'There are some errors with query',
            error: error,
          })
        } else {
          res.json({
            status: true,
            data: results,
            message: 'Post added succesfully'
          })
        }
      }) 
  })
  .catch(function (error) {
    console.log(error.response);
  });
};
module.exports.getPosts = function (req,res){
  con.query('SELECT * FROM articles ORDER BY post_date DESC LIMIT 10', function (error,results,fields){
    if(error){
      res.json({
        status: false,
        message: "There are some errors with the query"
        })
    } else {
      res.json({
        status: true,
        posts: results
        })
      } 
 });
};
module.exports.getRanking = function (req, res) {
  con.query("SELECT articles.*, SUM(rating.rate) AS rating FROM articles LEFT JOIN rating ON rating.postId = articles.post_id GROUP BY rating.postId LIMIT 10", function (error, results, fields) {
    if(error) {
      res.json({
        error
      })
    } else {
      res.json({
        rating: results
      })
    }
  });
};
module.exports.deleteComment = function (req, res) {
  console.log(req.body);
  var comment_id = req.params.commentId;
  con.query('DELETE FROM comments WHERE comment_id=?', [comment_id], function (error, results, fields) {
    if (error) {
      res.json({
        message: 'Cant delete post',
        error,
      })
    } else {
      res.json({
        message: 'Post has been deleted',
        results: results,
      })
    }
  })
};
module.exports.getPostComment = function(req, res){
  var postId = req.params.postId;

  con.query('SELECT * FROM comments WHERE post_id =? ORDER BY date DESC', [postId],function (error, results, fields){
    if(error){
      res.json({
        status: 201,
        message: "There are some errors with the query",
        error: error,
      })
    } else {
      res.json({
        comments: results
      })
    }
  });
};
module.exports.sendPostComment = function (req, res) {
  var date = new Date();
  comment = {
    "user_id": req.body.user_id,
    "user_name": req.body.user_name,
    "post_id": req.params.postId,
    "content": req.body.content,
    "date": date,
  }
  
  
  con.query('INSERT INTO comments SET ?', comment, function (error, results, fields) {
    if (error) {
      res.json({
        status: false,
        message: 'There are some errors with query',
        error,
      })
     } else {
        res.json({
          status: true,
          message: "Your comment has been added"
        })
      }
  });
};
module.exports.ratePost = function (req, res, next) {
  con.query('SELECT * FROM rating WHERE userId = ? AND postId = ?', [req.body.user_id, req.params.postId], function(error, results, fields){
    if(error){
      res.status(201);
    } else {
      if(results.length > 0){
        if(results[0].rate == req.body.rate){
          con.query("UPDATE rating SET rate = ? WHERE rateId = ?", [0, results[0].rateId], function (error, results, fields) {
            if(error){
              res.status(201);
            } else {
              res.json({
                message: "Your vote has been canceld",
              })
            }
          });
          // res.end();
        } else {
          con.query("UPDATE rating SET rate = ? WHERE rateId = ?", [req.body.rate, results[0].rateId], function (error, results, fields) {
            if(error){
              res.status(201);
            } else {
              res.json({
                message: "You have changed your vote",
              })
            }
          });
        }
    } else {
      rate = {
        "postId": req.params.postId,
        "userId": req.body.user_id,
        "rate": req.body.rate,
        "date": new Date(),
      }
      con.query("INSERT INTO rating SET ?", rate, function (error, results, fields) {
        if(error){
          res.status(201);
        } else {
          res.json({
            message: "You vote has been added",
          })
        }
      });
    }
  } 
  })
};
module.exports.getPostRating = function (req, res) {
  con.query("SELECT SUM(rate) AS finalRating FROM rating WHERE postId = ?", [req.params.postId], function (error, results, fields) {
    if (error) {
      res.status(201);    
    } else {
      res.json({
        rating: results[0].finalRating,
      })
    }
  })
};
module.exports.editComment = function (req, res) {
  con.query("UPDATE comments SET content = ? WHERE user_id = ? AND comment_id = ?", [req.body.newContent ,req.body.user_id, req.params.commentId], function (error, results, fields) {
    if(error){
      res.status(201);
    } else {
      res.json({ message: "Your comment has been updated" });
    }
  });
};
module.exports.checkUserVotes = function (req, res) {
  con.query("SELECT * FROM rating WHERE userId=? AND postId=?", [req.params.userId, req.params.postId], function (error, results, fields) {
    if(error){
      res.status(201);
    } else {
      if (results[0] == undefined) {
        res.json({ response: null });
      } else {
        res.json({ response: results[0].rate })
      }
    }
  })
};
