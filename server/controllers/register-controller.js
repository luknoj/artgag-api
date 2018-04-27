var con = require('../db_connect');

module.exports.register = function (req,res) {
    var today = new Date();
    var users = {
        "userName": req.body.login,
        "userEmail": req.body.email,
        "userPass": req.body.password,
        "creationDate": today,
    }
    con.query('INSERT INTO users SET ?', users, function (error, results, fields) {
        if(error) {
            res.json({
                error: error,
                status: false,
                message: 'User or email exists',
            })
        } else {
            res.json({
                status: true,
                message: 'User registered sucessfully'
            })
        }
    });
};