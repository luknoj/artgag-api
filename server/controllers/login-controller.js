var con = require('../db_connect');
var jwt = require("jsonwebtoken");

module.exports.login = function (req,res) {
    var login = req.body.login;
    var password = req.body.password;

    con.query('SELECT * FROM users WHERE userName =?', [login], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: "There are some errors with query",
                error,
            })
        }else {
            if(results.length > 0){
                if ( password == results[0].userPass){
                    res.json({
                        status: true,
                        message: '',
                        userId: results[0].userId,
                        token: jwt.sign({ 
                            user: results[0]
                        }, 'secretkey'),
                    })
                } else {
                    res.json({
                        message: "Password and login dose not match",
                        result: results,
                    });
                }
            } else {
                res.json({
                    message: "User does not exist"
                })
            }
        }
    });
};
